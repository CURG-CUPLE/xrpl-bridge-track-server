import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { BlockchainBridgeTransaction } from "../../../../entities/blockchain-bridge-transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class BridgeService {
  constructor(
    @InjectRepository(BlockchainBridgeTransaction)
    private readonly blockchainBridgeTransactionRepository: Repository<BlockchainBridgeTransaction>,
  ) {}

  async getLiquidity(): Promise<string> {
    const transaction = await this.blockchainBridgeTransactionRepository.findOne({
    })
    return "0"
  }
}