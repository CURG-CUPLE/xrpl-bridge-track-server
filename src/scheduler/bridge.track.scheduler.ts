import { Injectable } from '@nestjs/common';
import { BridgeTrackSchedulerService } from './service/bridge.track.scheduler.service';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class BridgeTrackScheduler {
  constructor(
    private readonly bridgeTrackSchedulerService: BridgeTrackSchedulerService,
  ) {}
  @Timeout(1_000)
  async bridgeTransactionTrackScheduler() {
    while (true) {
      try {
        await this.bridgeTrackSchedulerService.getXrplBridgeTransaction();
      } catch (e) {
      } finally {
        await new Promise((resolve) => {
          setTimeout(resolve, 30_000);
        });
      }
    }
  }
}
