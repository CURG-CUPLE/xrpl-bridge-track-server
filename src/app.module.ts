import { Module } from '@nestjs/common';
import { AppController } from './api/controller/app.controller';
import { AppService } from './api/service/app.service';
import { BridgeTrackSchedulerModule } from './scheduler/bridge.track.scheduler.module';

@Module({
  imports: [BridgeTrackSchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
