import { Injectable } from '@nestjs/common';

@Injectable()
export class BridgeTrackSchedulerService {
  constructor() {}

  async getEvmSidechainBridgeTransaction() {
    // todo: xrp > evm sidechain 브릿지 트랜잭션을 수집합니다.
    console.log('xrp >>>> evm sidechain 브릿지 트랜잭션을 수집합니다.');
  }

  async getXrplBridgeTransaction() {
    // todo: evm sidechain > xrp 브릿지 트랜잭션을 수집합니다.
    console.log('evm-sidechain >>>> xrp 브릿지 트랜잭션을 수집합니다.');
  }
}
