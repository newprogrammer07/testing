import { LucideIcon } from 'lucide-react';

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
}

export interface Network {
  id: string;
  name: string;
  color: string; // Tailwind color class part (e.g., 'blue-500')
}

export interface WalletOption {
  id: string;
  name: string;
  iconType: 'fox' | 'circle' | 'shield' | 'browser';
  gradient: string;
}

export interface ConnectState {
  status: ConnectionStatus;
  walletId: string | null;
  address: string | null;
}
