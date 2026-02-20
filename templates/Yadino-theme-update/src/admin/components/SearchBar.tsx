// src/admin/components/SearchBar.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rightSlot?: React.ReactNode;
}

export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder, rightSlot }) => {
  return (
    <div className="flex items-center space-x-4 space-x-reverse mb-6">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
        <Filter className="h-4 w-4" />
      </button>
      {rightSlot}
    </div>
  );
};
