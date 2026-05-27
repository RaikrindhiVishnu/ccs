import React, { useState } from 'react';
import { Search, X, Edit3, Check, Save, ArrowRight } from 'lucide-react';

interface DraftItem {
  uid: string;
  agentName: string;
  agentId: string;
  agentAvatar: string;
  draftId: string;
  district: string;
  areaValue: string;
  areaUnit: string;
  amountValue: string;
  amountUnit: string;
  costPerAcre: string;
  lastUpdate: string;
  hasLeftStripe: boolean;
}

const Drafts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailDraft, setSelectedDetailDraft] = useState<DraftItem | null>(null);
  const [editingDraft, setEditingDraft] = useState<DraftItem | null>(null);

  // Initial State Data mapping both upper and lower filmstrip rows precisely per user screenshots
  const [draftsList, setDraftsList] = useState<DraftItem[]>([
    // Row 1
    {
      uid: 'row1-1',
      agentName: 'Ram Varma',
      agentId: 'Agent ID: RV-882',
      agentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      draftId: 'GLCSOS 01',
      district: 'WEST GODAVARI',
      areaValue: '100',
      areaUnit: 'Acres',
      amountValue: '25',
      amountUnit: 'Lakhs',
      costPerAcre: '10,000',
      lastUpdate: '6th Oct • 12:53 PM',
      hasLeftStripe: true,
    },
    {
      uid: 'row1-2',
      agentName: 'Kalyan Deep',
      agentId: 'Agent ID: KD-102',
      agentAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      draftId: 'GLCSOS 02',
      district: 'KRISHNA DISTRICT',
      areaValue: '250',
      areaUnit: 'Acres',
      amountValue: '45',
      amountUnit: 'Lakhs',
      costPerAcre: '10,000',
      lastUpdate: '6th Oct • 12:53 PM',
      hasLeftStripe: false,
    },
    {
      uid: 'row1-3',
      agentName: 'Deep S.',
      agentId: 'Agent ID: KD-102',
      agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      draftId: 'GLCSOS 03',
      district: 'KRISHNA DISTRICT',
      areaValue: '250',
      areaUnit: 'Acres',
      amountValue: '45',
      amountUnit: 'Lakhs',
      costPerAcre: '10,000',
      lastUpdate: '6th Oct • 12:53 PM',
      hasLeftStripe: false,
    },
    // Row 2
    {
      uid: 'row2-1',
      agentName: 'Ram Varma',
      agentId: 'Agent ID: RV-882',
      agentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      draftId: 'GLCSOS 01',
      district: 'WEST GODAVARI',
      areaValue: '100',
      areaUnit: 'Acres',
      amountValue: '25',
      amountUnit: 'Lakhs',
      costPerAcre: '10,000',
      lastUpdate: '6th Oct • 12:53 PM',
      hasLeftStripe: true,
    },
    {
      uid: 'row2-2',
      agentName: 'Kalyan Deep',
      agentId: 'Agent ID: KD-102',
      agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      draftId: 'GLCSOS 02',
      district: 'KRISHNA DISTRICT',
      areaValue: '250',
      areaUnit: 'Acres',
      amountValue: '45',
      amountUnit: 'Lakhs',
      costPerAcre: '10,000',
      lastUpdate: '6th Oct • 12:53 PM',
      hasLeftStripe: false,
    },
    {
      uid: 'row2-3',
      agentName: 'Deep S.',
      agentId: 'Agent ID: KD-102',
      agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      draftId: 'GLCSOS 03',
      district: 'KRISHNA DISTRICT',
      areaValue: '250',
      areaUnit: 'Acres',
      amountValue: '45',
      amountUnit: 'Lakhs',
      costPerAcre: '10,000',
      lastUpdate: '6th Oct • 12:53 PM',
      hasLeftStripe: false,
    },
  ]);

  const filteredDrafts = draftsList.filter(item =>
    item.draftId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDraft) return;
    
    setDraftsList(prev => prev.map(d => d.uid === editingDraft.uid ? editingDraft : d));
    setEditingDraft(null);
  };

  return (
    <div className="pt-2 pb-16 font-plus-jakarta max-w-[1407px] mx-auto">
      {/* Header Banner Section */}
      <div className="mb-6">
        <h1 className="text-[27px] font-semibold text-black uppercase tracking-wide leading-tight">
          Regional Officer Dashboard
        </h1>
        <p className="text-[14px] text-[#5C5C5C] mt-1">
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>

      {/* Standalone Left-Aligned Search Pill */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[#EBEBEB] w-[163.09px] h-[38.8px] shadow-2xs">
          <Search className="w-4 h-4 text-[#767676] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[12px] text-[#767676] placeholder-[#767676]"
          />
        </div>
      </div>

      {/* Grid filmstrip display mirroring the multi-row Figma card stack perfectly */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDrafts.map((item) => (
          <div
            key={item.uid}
            className={`relative w-full bg-white rounded-[40px] p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
              item.hasLeftStripe 
                ? 'border border-gray-100 shadow-sm overflow-hidden' 
                : 'bg-white/90 border-[1.1px] border-white/60 shadow-xs backdrop-blur-xs'
            }`}
          >
            {/* Pristine Left Accent Stripe on Active Card 1 per CSS spec */}
            {item.hasLeftStripe && (
              <div className="absolute left-0 top-0 bottom-0 w-[8.43px] bg-black rounded-l-[40px] z-10" />
            )}

            {/* Top Identity Block */}
            <div className="flex justify-between items-start w-full mb-6">
              {/* Agent info block */}
              <div className="flex items-center gap-3">
                <img
                  src={item.agentAvatar}
                  alt={item.agentName}
                  className="w-[50.57px] h-[50.57px] rounded-full object-cover border border-gray-100 shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-[16.85px] font-bold text-[#131600] leading-tight">
                    {item.agentName}
                  </span>
                  <span className="text-[12.64px] text-[#45474C] mt-0.5 block">
                    {item.agentId}
                  </span>
                </div>
              </div>

              {/* Draft identifier block */}
              <div className="flex flex-col items-end">
                <span className="text-[18.96px] font-extrabold text-black leading-tight block">
                  {item.draftId}
                </span>
                <span className="text-[12.64px] font-medium text-[#45474C] tracking-[0.63px] uppercase mt-0.5 block">
                  {item.district}
                </span>
              </div>
            </div>

            {/* Middle Grid of 4 Pristine Rounded Metric Capsules */}
            <div className="grid grid-cols-2 gap-4 w-full my-2">
              
              {/* Capsule 1: Total Area */}
              <div className="bg-[#F3F4F5] rounded-[28px] p-4 flex flex-col justify-between min-h-[84px]">
                <span className="text-[12px] font-bold text-[#75777D] uppercase tracking-wider block">
                  TOTAL AREA
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[21.07px] font-extrabold text-[#131600] leading-none">
                    {item.areaValue}
                  </span>
                  <span className="text-[14px] text-[#131600] font-medium">
                    {item.areaUnit}
                  </span>
                </div>
              </div>

              {/* Capsule 2: Total Amount */}
              <div className="bg-[#F3F4F5] rounded-[28px] p-4 flex flex-col justify-between min-h-[84px]">
                <span className="text-[12px] font-bold text-[#75777D] uppercase tracking-wider block">
                  TOTAL AMOUNT
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[21.07px] font-extrabold text-[#131600] leading-none">
                    {item.amountValue}
                  </span>
                  <span className="text-[14px] text-[#131600] font-medium">
                    {item.amountUnit}
                  </span>
                </div>
              </div>

              {/* Capsule 3: Cost per Acre */}
              <div className="bg-[#F3F4F5] rounded-[28px] p-4 flex flex-col justify-between min-h-[84px]">
                <span className="text-[12px] font-bold text-[#75777D] uppercase tracking-wider block">
                  COST PER ACRE
                </span>
                <span className="text-[21.07px] font-extrabold text-[#131600] leading-none mt-1 block">
                  {item.costPerAcre}
                </span>
              </div>

              {/* Capsule 4: Last Update */}
              <div className="bg-[#F3F4F5] rounded-[28px] p-4 flex flex-col justify-between min-h-[84px]">
                <span className="text-[12px] font-bold text-[#75777D] uppercase tracking-wider block">
                  LAST UPDATE
                </span>
                <span className="text-[13px] font-bold text-[#131600] leading-tight mt-1 block">
                  {item.lastUpdate}
                </span>
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="flex justify-between items-center gap-4 pt-4 mt-2 w-full border-t border-gray-50">
              {/* Details Action Button */}
              <button
                onClick={() => setSelectedDetailDraft(item)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2780C4] hover:bg-[#1f66a3] text-white font-bold text-[12.64px] rounded-full transition-all cursor-pointer shadow-xs flex-1"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {/* Edit Outline Button */}
              <button
                onClick={() => setEditingDraft({ ...item })}
                className="flex items-center justify-center px-8 py-3 border border-black hover:bg-gray-50 text-black font-bold text-[12.64px] rounded-full transition-colors cursor-pointer shrink-0"
              >
                Edit
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Spectacular Dynamic Live Editor Drawer/Modal upon clicking Edit Button */}
      {editingDraft && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] overflow-hidden max-w-lg w-full shadow-2xl border border-white/20 flex flex-col animate-in zoom-in-95 duration-300">
            {/* Editor Header */}
            <div className="p-6 bg-[#091426] text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-[#2780C4]" />
                <div>
                  <h3 className="text-lg font-bold">Edit Live Parameters</h3>
                  <p className="text-xs text-white/60">Local Uncommitted State Buffer</p>
                </div>
              </div>
              <button
                onClick={() => setEditingDraft(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Editor Form Body */}
            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Draft File Identifier</label>
                <input
                  type="text"
                  value={editingDraft.draftId}
                  onChange={(e) => setEditingDraft({ ...editingDraft, draftId: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-sm outline-none focus:border-[#2780C4]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Acreage Magnitude</label>
                  <input
                    type="text"
                    value={editingDraft.areaValue}
                    onChange={(e) => setEditingDraft({ ...editingDraft, areaValue: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-sm outline-none focus:border-[#2780C4]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Valuation (Lakhs)</label>
                  <input
                    type="text"
                    value={editingDraft.amountValue}
                    onChange={(e) => setEditingDraft({ ...editingDraft, amountValue: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-sm outline-none focus:border-[#2780C4]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Assigned Region District</label>
                <input
                  type="text"
                  value={editingDraft.district}
                  onChange={(e) => setEditingDraft({ ...editingDraft, district: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-sm outline-none focus:border-[#2780C4]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDraft(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2780C4] hover:bg-[#1f66a3] text-white font-bold rounded-full text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Premium Draft Info Overview Dialog when clicking Details Button */}
      {selectedDetailDraft && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] overflow-hidden max-w-md w-full shadow-2xl border border-white/20 flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-[#2780C4] uppercase block tracking-wider">Uncommitted Document</span>
                <h3 className="text-xl font-extrabold text-gray-900">{selectedDetailDraft.draftId} Details</h3>
              </div>
              <button
                onClick={() => setSelectedDetailDraft(null)}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                <img src={selectedDetailDraft.agentAvatar} alt="Agent" className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div>
                  <span className="text-xs text-gray-500 block">Assigned Custodian</span>
                  <span className="text-sm font-bold text-gray-900 block">{selectedDetailDraft.agentName}</span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-2 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Region Jurisdiction</span>
                  <span className="text-xs font-bold text-gray-900">{selectedDetailDraft.district}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Local Integrity Seal</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> Unlocked
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Acreage Base Rate</span>
                  <span className="text-xs font-bold text-gray-900">₹{selectedDetailDraft.costPerAcre} / Acre</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedDetailDraft(null)}
                className="px-6 py-2 bg-[#2780C4] text-white font-bold rounded-full text-xs cursor-pointer hover:bg-[#1f66a3]"
              >
                Acknowledge Buffer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drafts;
