import {
  createPublicClient,
  defineChain,
  fromHex,
  http,
  parseAbiItem,
} from 'viem';
import _ from 'lodash';
import { TransactionBase } from 'viem/types/transaction';

describe('viem', () => {
  let client;
  const evmSidechain = defineChain({
    id: 1440001,
    name: 'EVM Sidechain Devnet',
    nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://rpc-evm-sidechain.xrpl.org/'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Explorer',
        url: 'https://evm-sidechain.xrpl.org/',
      },
    },
  });

  beforeAll(() => {
    client = createPublicClient({
      chain: evmSidechain,
      transport: http(),
    });
  });

  it('getBlockNumber', async () => {
    const blockNumber = await client.getBlockNumber();
    console.log(blockNumber);
  });

  it('getTransaction', async () => {
    const transaction = await client.getTransaction({
      hash: '0x39bd4cff94c958211e7b4005be02d359019bd037f31599ffb834e1a4bd51b760',
    });
    console.log(transaction);
    console.log(typeof transaction);
  });

  it('getBridgeContractTransactionByBlock', async () => {
    const bridgeContract = '0xc2a29b0cD12d146cEb42C3DABF6E4a2a39a07b86';
    const block = await client.getBlock({
      blockNumber: 9611204n,
      includeTransactions: true,
    });
    const transactions = block.transactions as TransactionBase[];

    const bridgeTransaction = _.filter(
      _.map(transactions, (v) => {
        // 0xcb1d18ed00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000013600000000000000000000000000000000000000000000000029a2241af62c0000000000000000000000000000635739a28eadb0b4ec6034bec42892c270e05978000000000000000000000000c1ccdcde7c0feaa69b44f727d4a5718e0746c2a100000000000000000000000038721526b5ab1d5c7a46f85ee106d8539871a9bc0000000000000000000000002f1b11609cfa65b5f4316e02445c438e116ddc770000000000000000000000000000000000000000000000000000000000000080000000000000000000000000b5f762798a53d543a014caf8b297cff8f2f937e8000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000358525000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000035852500000000000000000000000000000000000000000000000000000000000
        // Method id: cb1d18ed(addClaimAttestation)
        if (
          v.to.toLowerCase() === bridgeContract.toLowerCase() &&
          v.input.length > 202 &&
          v.input.slice(0, 10) === '0xcb1d18ed'
        ) {
          return {
            ...v,
            bridgeAmount: fromHex(`0x${v.input.substring(138, 202)}`, 'bigint'),
            bridgeTo: '0x'.concat(v.input.substring(290, 330)),
          };
        }
        return null;
      }),
      _.identity,
    );
    console.log(bridgeTransaction);
  });

  it('getLog', async () => {
    const logs = await client.getLogs({
      address: '0xc2a29b0cD12d146cEb42C3DABF6E4a2a39a07b86',
      event: parseAbiItem(
        'event Credit(bytes32 indexed bridgeKey, uint256 indexed claimId, address indexed receiver, uint256 value)',
      ),
      fromBlock: 9710179n,
      toBlock: 9710179n,
    });
    console.log(logs);
  });
});
