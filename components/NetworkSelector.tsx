import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { Network } from '../types';

interface NetworkSelectorProps {
  selectedNetwork: Network;
  onSelect: (network: Network) => void;
  networks: Network[];
}

export const NetworkSelector: React.FC<NetworkSelectorProps> = ({ selectedNetwork, onSelect, networks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-xl
          bg-slate-900/50 backdrop-blur-md 
          border border-slate-700/50 hover:border-cyan-500/30
          transition-all duration-300
          text-sm font-medium text-slate-200
          group
        `}
      >
        <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${selectedNetwork.color}-400 opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 bg-${selectedNetwork.color}-500`}></span>
        </div>
        
        <span className="hidden sm:inline">{selectedNetwork.name}</span>
        
        <ChevronDown 
          size={16} 
          className={`text-slate-500 transition-transform duration-300 group-hover:text-cyan-400 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`
          absolute top-full right-0 mt-2 w-56 
          bg-slate-900/95 backdrop-blur-xl
          border border-slate-700/50 rounded-xl
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          overflow-hidden z-50
          transition-all duration-200 origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="p-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select Network
          </div>
          {networks.map((network) => (
            <button
              key={network.id}
              onClick={() => {
                onSelect(network);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-3 py-3 rounded-lg
                transition-all duration-200
                ${selectedNetwork.id === network.id 
                  ? 'bg-cyan-500/10 text-cyan-400' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full bg-${network.color}-500 shadow-[0_0_10px_rgba(var(--tw-colors-${network.color}-500),0.5)]`}></span>
                {network.name}
              </div>
              {selectedNetwork.id === network.id && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
