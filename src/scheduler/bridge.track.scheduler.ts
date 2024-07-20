import { Injectable, Logger } from '@nestjs/common';
import { BridgeTrackSchedulerService } from './service/bridge.track.scheduler.service';
import { Timeout } from '@nestjs/schedule';
import { BRIDGE_CONTRACT_COMMIT_ABI, BRIDGE_CONTRACT_CREDIT_ABI } from '../constants';

@Injectable()
export class BridgeTrackScheduler {
  private readonly logger = new Logger(BridgeTrackScheduler.name);
  constructor(private readonly bridgeTrackSchedulerService: BridgeTrackSchedulerService) {}
  @Timeout(1_000)
  async bridgeTransactionTrackScheduler() {
    while (true) {
      try {
        await Promise.allSettled([
          this.bridgeTrackSchedulerService.getBridgeTransaction('EVM Sidechain', BRIDGE_CONTRACT_CREDIT_ABI),
          this.bridgeTrackSchedulerService.getBridgeTransaction('XRP', BRIDGE_CONTRACT_COMMIT_ABI),
        ]);
      } catch (e) {
        this.logger.error('scheduler error', this.bridgeTransactionTrackScheduler.name, e);
      } finally {
        await new Promise((resolve) => {
          setTimeout(resolve, 1_000);
        });
      }
    }
  }
}
