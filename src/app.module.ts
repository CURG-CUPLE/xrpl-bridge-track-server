import { Module } from '@nestjs/common';
import { BridgeTrackSchedulerModule } from './scheduler/bridge.track.scheduler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainBridgeTokenEntity } from './config/database/mysql/entity/blockchain.bridge.token.entity';
import { BlockchainNetworkEntity } from './config/database/mysql/entity/blockchain.network.entity';
import { MysqlConfigService } from './config/database/mysql/mysql.config.service';
import { BlockchainBridgeTransactionEntity } from './config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { V1Module } from './api/v1/v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    BridgeTrackSchedulerModule,
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useClass: MysqlConfigService,
    }),
    TypeOrmModule.forFeature([BlockchainBridgeTokenEntity, BlockchainNetworkEntity, BlockchainBridgeTransactionEntity]),
    V1Module,
    RouterModule.register([
      {
        path: 'api/v1',
        module: V1Module,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
