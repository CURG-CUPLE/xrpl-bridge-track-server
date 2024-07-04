import { TestBed } from '@automock/jest';
import { Web3 } from 'web3';

describe('Web3js', () => {
  it('web3.eth.getTransaction', async () => {
    const web3 = new Web3('https://rpc-evm-sidechain.xrpl.org');
    const result = await web3.eth.getTransaction(
      '0x80e30b33c730c2b0ecaefaff19d5d054e968fca7614bac00d7d71fe6d169a94f',
    );

    console.log(`methodId: ${result.input.slice(0, 10)}`);
    console.log(`to: ${result.input.substring(98, 138)}`);
    console.log(`amount: ${result.input.substring(138, 202)}`);
  });
});
