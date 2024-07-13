import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BridgeTrackSchedulerService } from './service/bridge.track.scheduler.service';
import { BridgeTrackScheduler } from './bridge.track.scheduler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainBridgeTokenEntity } from '../config/database/mysql/entity/blockchain.bridge.token.entity';
import { BlockchainNetworkEntity } from '../config/database/mysql/entity/blockchain.network.entity';
import { BlockchainBridgeTransactionEntity } from '../config/database/mysql/entity/blockchain.bridge.transaction.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([BlockchainBridgeTokenEntity, BlockchainNetworkEntity, BlockchainBridgeTransactionEntity]),
  ],
  providers: [BridgeTrackScheduler, BridgeTrackSchedulerService],
})
export class BridgeTrackSchedulerModule {}
