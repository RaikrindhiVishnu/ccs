import React from 'react';
import { ChevronDownIcon } from './Icons';

// ─── Dropdown Field (single value with chevron) ──────────────────────────────

export const DropdownField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <>
    <h3 className="text-[22px] font-bold text-gray-900 mb-6">{label}</h3>
    <div className="relative">
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-gray-300 transition-colors">
        <span className="text-[15px] text-gray-800 font-medium">{value}</span>
        <ChevronDownIcon />
      </div>
    </div>
  </>
);

// ─── Text Field (read-only display) ──────────────────────────────────────────

export const TextField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <>
    <h3 className="text-[22px] font-bold text-gray-900 mb-6">{label}</h3>
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
      <span className="text-[15px] text-gray-800 font-medium">{value}</span>
    </div>
  </>
);

// ─── Multi-Tag Field (tags with chevron) ─────────────────────────────────────

export const MultiTagField: React.FC<{ label: string; tags: string[] }> = ({ label, tags }) => (
  <>
    <h3 className="text-[22px] font-bold text-gray-900 mb-6">{label}</h3>
    <div className="relative">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3.5 cursor-pointer hover:border-gray-300 transition-colors">
        {tags.map((tag) => (
          <span key={tag} className="bg-[#A3C33D] text-white text-[13px] font-semibold px-3 py-1 rounded-lg">{tag}</span>
        ))}
        <div className="flex-1" />
        <ChevronDownIcon />
      </div>
    </div>
  </>
);

// ─── Dual Text Field (two labeled values stacked) ────────────────────────────

export const DualTextField: React.FC<{ label1: string; value1: string; label2: string; value2: string }> = ({ label1, value1, label2, value2 }) => (
  <>
    <h3 className="text-[22px] font-bold text-gray-900 mb-6">{label1}</h3>
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 mb-6">
      <span className="text-[15px] text-gray-800 font-medium">{value1}</span>
    </div>
    <h3 className="text-[22px] font-bold text-gray-900 mb-6">{label2}</h3>
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
      <span className="text-[15px] text-gray-800 font-medium">{value2}</span>
    </div>
  </>
);
