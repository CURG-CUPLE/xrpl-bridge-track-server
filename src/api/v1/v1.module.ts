import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BridgeService } from './service/bridge/bridge.service';
import { BridgeController } from './controller/bridge/bridge.controller';
import { entities } from '../../config/database/mysql/entity';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [BridgeController],
  providers: [BridgeService],
})
export class V1Module {}
