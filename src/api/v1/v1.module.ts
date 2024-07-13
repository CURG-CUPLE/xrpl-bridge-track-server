import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BridgeService } from './service/bridge/bridge.service';
import { BridgeController } from './controller/bridge/bridge.controller';
import { BlockchainBridgeTransactionEntity } from '../../config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { BlockchainNetworkEntity } from '../../config/database/mysql/entity/blockchain.network.entity';
import { BlockchainBridgeTokenEntity } from '../../config/database/mysql/entity/blockchain.bridge.token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockchainBridgeTransactionEntity, BlockchainNetworkEntity, BlockchainBridgeTokenEntity]),
  ],
  controllers: [BridgeController],
  providers: [BridgeService],
})
export class V1Module {}
