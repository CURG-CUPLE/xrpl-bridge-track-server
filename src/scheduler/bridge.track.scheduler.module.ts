import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BridgeTrackSchedulerService } from './service/bridge.track.scheduler.service';
import { BridgeTrackScheduler } from './bridge.track.scheduler';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BridgeTrackScheduler, BridgeTrackSchedulerService],
})
export class BridgeTrackSchedulerModule {}
