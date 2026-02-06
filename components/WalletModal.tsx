import React, { useState } from 'react';
import { X, ChevronRight, Terminal } from 'lucide-react';
import { WalletOption } from '../types';
import { FoxIcon, CircleIcon, ShieldIcon, BrowserIcon } from './Icons';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => void;
  wallets: WalletOption[];
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect, wallets }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customRpc, setCustomRpc] = useState('');

  if (!isOpen) return null;

  const renderIcon = (type: string) => {
    switch (type) {
      case 'fox': return <FoxIcon className="w-8 h-8 text-orange-500" />;
      case 'circle': return <CircleIcon className="w-8 h-8 text-blue-500" />;
      case 'shield': return <ShieldIcon className="w-8 h-8 text-cyan-400" />;
      default: return <BrowserIcon className="w-8 h-8 text-slate-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className="
          relative w-full max-w-lg 
          bg-slate-900/80 backdrop-blur-2xl 
          border border-white/10 rounded-2xl 
          shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]
          flex flex-col overflow-hidden
          animate-[fadeInScale_0.3s_ease-out_forwards]
        "
        style={{ animationName: 'fadeInScale' }} // Custom animation defined in style tag in App/Index
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-semibold text-white tracking-tight">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wallet Grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => onConnect(wallet.id)}
              className="
                group relative flex flex-col items-center justify-center gap-3 p-6 
                rounded-xl bg-slate-800/40 border border-white/5 
                hover:border-cyan-500/50 hover:bg-slate-800/80
                transition-all duration-300 
                hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(6,182,212,0.15)]
              "
            >
              <div className={`
                p-3 rounded-full bg-slate-900/50 ring-1 ring-white/5 
                group-hover:ring-cyan-500/30 transition-all duration-300
                shadow-inner
              `}>
                {renderIcon(wallet.iconType)}
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                {wallet.name}
              </span>
              
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>

        {/* Footer / Advanced */}
        <div className="bg-slate-950/30 p-6 border-t border-white/5">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors mb-2"
          >
            <Terminal size={12} />
            <span>Advanced: Custom RPC Endpoint</span>
            <ChevronRight 
              size={12} 
              className={`transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''}`}
            />
          </button>

          <div 
            className={`
              grid transition-[grid-template-rows] duration-300 ease-in-out
              ${showAdvanced ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}
            `}
          >
            <div className="overflow-hidden">
               <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-cyan-500 font-mono text-sm">{'>'}</span>
                </div>
                <input
                  type="text"
                  value={customRpc}
                  onChange={(e) => setCustomRpc(e.target.value)}
                  placeholder="https://mainnet.infura.io/v3/..."
                  className="
                    w-full bg-slate-950 border border-slate-800 rounded-lg 
                    pl-8 pr-4 py-3 text-sm font-mono text-slate-300
                    focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50
                    placeholder:text-slate-700
                    transition-all duration-200
                  "
                />
                {/* Glow effect on container */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition duration-300 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
