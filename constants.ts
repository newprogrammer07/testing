import { Network, WalletOption } from './types';

export const NETWORKS: Network[] = [
  { id: 'eth', name: 'Ethereum', color: 'indigo' },
  { id: 'bsc', name: 'BSC', color: 'yellow' },
  { id: 'base', name: 'Base', color: 'blue' },
  { id: 'citrea', name: 'Citrea Testnet', color: 'orange' },
];

export const WALLETS: WalletOption[] = [
  { id: 'metamask', name: 'MetaMask', iconType: 'fox', gradient: 'from-orange-500 to-red-500' },
  { id: 'coinbase', name: 'Coinbase', iconType: 'circle', gradient: 'from-blue-500 to-indigo-500' },
  { id: 'trust', name: 'Trust Wallet', iconType: 'shield', gradient: 'from-cyan-400 to-blue-500' },
  { id: 'browser', name: 'Browser Wallet', iconType: 'browser', gradient: 'from-slate-400 to-slate-600' },
];
