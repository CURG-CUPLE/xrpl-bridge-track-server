import { Injectable, Logger } from '@nestjs/common';
import { BlockchainBridgeTransactionEntity } from '../../config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockchainNetworkEntity } from '../../config/database/mysql/entity/blockchain.network.entity';
import { createPublicClient, formatUnits, http, parseAbiItem } from 'viem';
import { BRIDGE_CONTRACT_ADDRESS, EVM_SIDECHAIN } from '../../constants';
import _ from 'lodash';

@Injectable()
export class BridgeTrackSchedulerService {
  private readonly logger = new Logger(BridgeTrackSchedulerService.name);
  private clientProvider;

  constructor(
    @InjectRepository(BlockchainNetworkEntity)
    private blockchainNetworkRepository: Repository<BlockchainNetworkEntity>,
    @InjectRepository(BlockchainBridgeTransactionEntity)
    private blockchainBridgeTransactionRepository: Repository<BlockchainBridgeTransactionEntity>,
  ) {
    this.clientProvider = createPublicClient({
      chain: EVM_SIDECHAIN,
      transport: http(),
    });
  }

  async getBridgeTransaction(network: string, abi: string) {
    const blockchainNetworkEntity = await this.blockchainNetworkRepository.findOne({
      where: { network },
    });
    if (!blockchainNetworkEntity) {
      this.logger.error(`${network}} network is undefined`);
      return null;
    }
    const fromBlock = BigInt(blockchainNetworkEntity.blockNumber) + 1n;
    const toBlock = fromBlock + 100n;

    try {
      // https://viem.sh/docs/actions/public/getLogs.html
      const eventLogs = await this.clientProvider.getLogs({
        address: BRIDGE_CONTRACT_ADDRESS,
        event: parseAbiItem(abi),
        fromBlock,
        toBlock,
      });
      this.logger.log(`${network} Bridge Event size: ${eventLogs.length} [${fromBlock}-${toBlock}] `);

      const eventParseResults = _.map(eventLogs, async (v: any) => {
        try {
          const transaction = await this.clientProvider.getTransaction({
            hash: v.transactionHash,
          });
          const receipt = await this.clientProvider.getTransactionReceipt({
            hash: v.transactionHash,
          });
          const block = await this.clientProvider.getBlock({
            blockNumber: v.blockNumber,
          });

          const gasPrice: bigint = transaction.gasPrice;
          const gasUsed: bigint = receipt.gasUsed;

          return <Partial<BlockchainBridgeTransactionEntity>>{
            to: v.args.receiver as string,
            networkId: blockchainNetworkEntity.id as number,
            amount: formatUnits(v.args.value, 18),
            txid: v.transactionHash as string,
            blockNumber: v.blockNumber as bigint,
            fee: formatUnits(gasPrice * gasUsed, 18),
            blockTime: block.timestamp as bigint,
            status: receipt.status as string,
          };
        } catch (e) {
          this.logger.error(`${network} bridge transaction parse error`, this.getBridgeTransaction.name, e);
          return null;
        }
      });
      const bridgeTransactions = _.filter(await Promise.all(eventParseResults), _.identity);
      await this.blockchainBridgeTransactionRepository.insert(bridgeTransactions);
      await this.blockchainNetworkRepository.update({ network }, { blockNumber: toBlock });
    } catch (e) {
      this.logger.error(`${network} getBridgeTransaction execution error`, this.getBridgeTransaction.name, e);
    }
  }
}
