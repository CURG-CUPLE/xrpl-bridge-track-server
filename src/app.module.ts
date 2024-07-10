import { Module } from '@nestjs/common';
import { AppController } from './api/controller/app.controller';
import { AppService } from './api/service/app.service';
import { BridgeTrackSchedulerModule } from './scheduler/bridge.track.scheduler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainBridgeTokenEntity } from './config/database/mysql/entity/blockchain.bridge.token.entity';
import { BlockchainNetworkEntity } from './config/database/mysql/entity/blockchain.network.entity';
import { MysqlConfigService } from './config/database/mysql/mysql.config.service';

@Module({
  imports: [
    BridgeTrackSchedulerModule,
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useClass: MysqlConfigService,
    }),
    TypeOrmModule.forFeature([
      BlockchainBridgeTokenEntity,
      BlockchainNetworkEntity,
      BlockchainNetworkEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
