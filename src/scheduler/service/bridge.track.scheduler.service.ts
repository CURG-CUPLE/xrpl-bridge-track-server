import { Injectable } from '@nestjs/common';
import { BlockchainBridgeTransactionEntity } from '../../config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockchainNetworkEntity } from '../../config/database/mysql/entity/blockchain.network.entity';
import { createPublicClient, http, parseAbiItem } from 'viem';
import {
  ABI_ITEM,
  BRIDGE_CONTRACT_ADDRESS,
  EVM_SIDECHAIN,
} from '../../constants';
import _ from 'lodash';

@Injectable()
export class BridgeTrackSchedulerService {
  clientProvider;
  constructor(
    @InjectRepository(BlockchainNetworkEntity)
    private blockchainNetworkEntityRepository: Repository<BlockchainNetworkEntity>,
    @InjectRepository(BlockchainBridgeTransactionEntity)
    private blockchainBridgeTransactionEntityRepository: Repository<BlockchainBridgeTransactionEntity>,
  ) {
    this.clientProvider = createPublicClient({
      chain: EVM_SIDECHAIN,
      transport: http(),
    });
  }

  async getEvmSidechainBridgeTransaction() {
    // todo: xrp > evm sidechain 브릿지 트랜잭션을 수집합니다.
    /*const blockchainNetworkEntity =
      await this.blockchainNetworkEntityRepository.findOne({
        where: { network: 'EVM Sidechain' },
      });
    const fromBlock = blockchainNetworkEntity.blockNumber + 1n;

    try {
      const logs = await this.clientProvider.getLogs({
        address: BRIDGE_CONTRACT_ADDRESS,
        event: parseAbiItem(ABI_ITEM),
        fromBlock,
        toBlock: fromBlock + 5n,
      });

      const promises = _.map(logs, async (v: any) => {
        try {
          const transaction = this.clientProvider.getTransaction({
            hash: v.transactionHash,
          });
          const receipt = await this.clientProvider.getTransactionReceipt({
            hash: v.transactionHash,
          });
          const block = await this.clientProvider.getBlock({
            blockNumber: v.blockNumber,
          });

          return {
            to: v.args.receiver,
            amount: v.args.value,
            transactionHash: v.transactionHash,
            blockNumber: v.blockNumber,
            fee: transaction.gasPrice * receipt.gasUsed,
            blockTime: block.blockTime,
            status: receipt.status,
          };
        } catch (e) {
          console.error(`error, ${v}`);
          return null;
        }
      });
      const results = await Promise.all(promises);
      const bridgeTransactions = _.filter(results, _.identity);
      console.log(bridgeTransactions);
    } catch (e) {}*/
  }

  async getXrplBridgeTransaction() {
    // todo: evm sidechain > xrp 브릿지 트랜잭션을 수집합니다.
    console.log('evm-sidechain >>>> xrp 브릿지 트랜잭션을 수집합니다.');
  }
}
