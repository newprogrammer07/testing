import React, { useState, useEffect } from 'react';
import { Wallet, LogOut, LayoutGrid, Zap, ShieldCheck } from 'lucide-react';
import { NetworkSelector } from './components/NetworkSelector';
import { WalletModal } from './components/WalletModal';
import { Button } from './components/Button';
import { NETWORKS, WALLETS } from './constants';
import { ConnectionStatus, Network, ConnectState } from './types';
//  hello my name is ashutosh nayak
export default function App() {
  // Application State
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectState, setConnectState] = useState<ConnectState>({
    
  });

  // Mock Connect Handler
  const handleConnectWallet = (walletId: string) => {
    setIsModalOpen(false);
    setConnectState(prev => ({ ...prev, status: ConnectionStatus.CONNECTING }));

    // Simulate async connection delay
    setTimeout(() => {
      setConnectState({
        status: ConnectionStatus.CONNECTED,
        walletId,
        address: '0x71C...9A', // Mock address
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectState({
      status: ConnectionStatus.DISCONNECTED,
      walletId: null,
      address: null,
    });
  };

  // Add custom animation styles for the modal entrance
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.95) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 bg-glow-gradient font-sans text-slate-200 selection:bg-cyan-500/30">
      
      {/* --- Global Header --- */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
              <Zap className="text-white h-6 w-6" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight text-white">Unstoppable</span>
              <span className="text-xs text-slate-400 font-mono">Protocol v2</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <NetworkSelector 
              selectedNetwork={selectedNetwork} 
              onSelect={setSelectedNetwork} 
              networks={NETWORKS}
            />

            {connectState.status === ConnectionStatus.DISCONNECTED && (
              <Button onClick={() => setIsModalOpen(true)}>
                Connect Wallet
              </Button>
            )}

            {connectState.status === ConnectionStatus.CONNECTING && (
              <Button isLoading disabled>
                Connecting...
              </Button>
            )}

            {connectState.status === ConnectionStatus.CONNECTED && (
              <div className="flex items-center gap-2">
                <div className="
                  hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg
                  bg-slate-900 border border-slate-700
                  text-sm font-mono text-cyan-400
                  shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
                ">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {connectState.address}
                </div>
                
                <Button variant="glass" onClick={handleDisconnect} className="!px-3" title="Disconnect">
                   <LogOut size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- Main Hero Content (To give context to the shell) --- */}
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-cyan-400 mb-8 animate-bounce">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Hackathon Build 0.1.0
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
            DeFi Reimagined.
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Totally Unstoppable.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
          Experience the next generation of decentralized finance. Zero downtime, 
          instant settlement, and a wallet connection experience that feels like the future.
        </p>

        {/* Decorative Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { title: "Glassmorphic UI", icon: LayoutGrid, desc: "Depth via layered blur and shadows." },
            { title: "Secure Connect", icon: ShieldCheck, desc: "End-to-end encrypted signals." },
            { title: "Multi-Chain", icon: Wallet, desc: "Seamless switching between L1 & L2." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-800/60 transition-colors text-left group">
              <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                <item.icon size={20} />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* --- Wallet Modal Component --- */}
      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnectWallet}
        wallets={WALLETS}
      />
      
    </div>
  );
}
