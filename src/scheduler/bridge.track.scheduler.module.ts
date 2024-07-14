import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BridgeTrackSchedulerService } from './service/bridge.track.scheduler.service';
import { BridgeTrackScheduler } from './bridge.track.scheduler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../config/database/mysql/entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature(entities)],
  providers: [BridgeTrackScheduler, BridgeTrackSchedulerService],
})
export class BridgeTrackSchedulerModule {}
