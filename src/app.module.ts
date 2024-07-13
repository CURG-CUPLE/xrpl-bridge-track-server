import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BridgeTrackSchedulerModule } from './scheduler/bridge.track.scheduler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainBridgeTokenEntity } from './config/database/mysql/entity/blockchain.bridge.token.entity';
import { BlockchainNetworkEntity } from './config/database/mysql/entity/blockchain.network.entity';
import { MysqlConfigService } from './config/database/mysql/mysql.config.service';
import { BlockchainBridgeTransactionEntity } from './config/database/mysql/entity/blockchain.bridge.transaction.entity';
import { V1Module } from './api/v1/v1.module';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { LoggerMiddleware } from './api/middleware/logger.middleware';
import { LoggerModule } from './config/logger/logger.module';
import { AllExceptionFilter } from './api/filter/all.exception.filter';

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
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
