import { Injectable, Logger } from '@nestjs/common';
import { BlockchainBridgeTransactionEntity } from '../../config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockchainNetworkEntity } from '../../config/database/mysql/entity/blockchain.network.entity';
import { createPublicClient, http, parseAbiItem } from 'viem';
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

  async getExrpBridgeTransaction() {
    const blockchainNetworkEntity = await this.blockchainNetworkRepository.findOne({
      where: { network: 'EVM Sidechain' },
    });
    const fromBlock = BigInt(blockchainNetworkEntity.blockNumber) + 1n;
    const toBlock = fromBlock + 5n;

    try {
      // https://viem.sh/docs/actions/public/getLogs.html
      const creditEventLogs = await this.clientProvider.getLogs({
        address: BRIDGE_CONTRACT_ADDRESS,
        event: parseAbiItem(
          'event Credit(bytes32 indexed bridgeKey, uint256 indexed claimId, address indexed receiver, uint256 value)',
        ),
        fromBlock,
        toBlock,
      });
      this.logger.log(`creditEventLogs size: ${creditEventLogs}[${fromBlock}-${toBlock}] `);

      const eventParseResults = _.map(creditEventLogs, async (v: any) => {
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
            tokenId: 2 as number,
            amount: (v.args.value as bigint) / BigInt(10 ** 9),
            txid: v.transactionHash as string,
            blockNumber: v.blockNumber as bigint,
            fee: ((gasPrice * gasUsed) as bigint) / BigInt(10 ** 9),
            blockTime: block.timestamp as bigint,
            status: receipt.status as string,
          };
        } catch (e) {
          this.logger.error('exrp bridge transaction parse error', this.getExrpBridgeTransaction.name, e);
          return null;
        }
      });
      const bridgeTransactions = _.filter(await Promise.all(eventParseResults), _.identity);
      await this.blockchainBridgeTransactionRepository.insert(bridgeTransactions);
      await this.blockchainNetworkRepository.update({ network: 'EVM Sidechain' }, { blockNumber: toBlock });
    } catch (e) {
      this.logger.error('getExrpBridgeTransaction execution error', this.getExrpBridgeTransaction.name, e);
    }
  }
}
