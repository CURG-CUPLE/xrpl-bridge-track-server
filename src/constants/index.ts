import { defineChain } from 'viem';

export const BRIDGE_CONTRACT_ADDRESS = '0xc2a29b0cD12d146cEb42C3DABF6E4a2a39a07b86';
export const ABI_ITEM =
  'event Credit(bytes32 indexed bridgeKey, uint256 indexed claimId, address indexed receiver, uint256 value)';

export const EVM_SIDECHAIN = defineChain({
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
