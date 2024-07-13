import { Injectable } from '@nestjs/common';
import { BlockchainBridgeTransactionEntity } from '../../config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockchainNetworkEntity } from '../../config/database/mysql/entity/blockchain.network.entity';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { ABI_ITEM, BRIDGE_CONTRACT_ADDRESS, EVM_SIDECHAIN } from '../../constants';
import _ from 'lodash';
import { from } from "rxjs";

@Injectable()
export class BridgeTrackSchedulerService {
  clientProvider;
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

  async getXRPbridgeTransaction() {
    const blockchainNetworkEntity = await this.blockchainNetworkRepository.findOne({
      where: { network: 'EVM Sidechain' },
    });
    const fromBlock = BigInt(blockchainNetworkEntity.blockNumber) + 1n;
    const toBlock = fromBlock + 5n;

    try {
      // https://viem.sh/docs/actions/public/getLogs.html
      const logs = await this.clientProvider.getLogs({
        address: '0xc2a29b0cD12d146cEb42C3DABF6E4a2a39a07b86',
        event: parseAbiItem(
          'event Credit(bytes32 indexed bridgeKey, uint256 indexed claimId, address indexed receiver, uint256 value)',
        ),
        fromBlock,
        toBlock: fromBlock + 5n,
      });

      const promise = _.map(logs, async (v: any) => {
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

          const result: Partial<BlockchainBridgeTransactionEntity> = {
            to: v.args.receiver as string,
            tokenId: 2 as number,
            amount: (v.args.value as bigint) / BigInt(10 ** 9),
            txid: v.transactionHash as string,
            blockNumber: v.blockNumber as bigint,
            fee: ((gasPrice * gasUsed) as bigint) / BigInt(10 ** 9),
            blockTime: block.timestamp as bigint,
            status: receipt.status as string,
          };
          return result;
        } catch (e) {
          console.error(`error, ${v}`);
          return null;
        }
      });
      const results: Awaited<Partial<BlockchainBridgeTransactionEntity>>[] = await Promise.all(promise);
      const bridgeTransactions = _.filter(results, _.identity);
      await this.blockchainBridgeTransactionRepository.insert(bridgeTransactions);
      await this.blockchainNetworkRepository.update({ network: 'EVM Sidechain' }, { blockNumber: toBlock });
    } catch (e) {
      console.error(e);
    }
  }
}
