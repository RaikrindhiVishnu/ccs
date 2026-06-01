import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MapPin, FileText, CheckCircle } from 'lucide-react';
import { MOCK_FARMLANDS } from '../data/farmlandsMockData';

export const CompletedFarmlandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const selectedFarmland = MOCK_FARMLANDS.find(
    (item) => item.id === id || item.id.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase()
  ) || MOCK_FARMLANDS[0];

  const handleBack = () => {
    navigate('/verification-officer-1/completed-farmland');
  };

  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col font-plus-jakarta pb-12">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D9DFE0] rounded-full hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
          <span className="font-plus-jakarta font-semibold text-sm text-[#353535]">
            Go Back to Dashboard
          </span>
        </button>

        {/* Notifications and Profile */}
        <div className="flex items-center gap-3">
          <button className="w-[52px] h-[52px] rounded-full bg-white border border-[#D9DFE0] flex items-center justify-center relative hover:bg-gray-50 transition-colors cursor-pointer p-0">
            <Bell className="w-5 h-5 text-[#2C2C2C]" />
          </button>
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden border border-[#D9DFE0]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="font-plus-jakarta font-extrabold text-2xl text-[#1E1E1E]">
          Completed Farmland History
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        
        {/* Core details hero card */}
        <div className="lg:col-span-12 bg-white border border-[#E5EAEB] rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="font-plus-jakarta text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {selectedFarmland.status}
              </span>
              <h2 className="font-plus-jakarta font-extrabold text-2xl text-[#1A1C1D] mt-2">
                {selectedFarmland.id}
              </h2>
              <div className="flex items-center gap-1.5 text-[#5D6B6B] mt-1 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{selectedFarmland.location}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 border-l border-gray-100 pl-0 md:pl-8 mt-4 md:mt-0">
            <div className="flex flex-col">
              <span className="text-[#737686] text-[10px] uppercase font-bold tracking-wider">Land Extend</span>
              <span className="text-[#1A1C1D] font-extrabold text-xl mt-1">{selectedFarmland.totalArea}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737686] text-[10px] uppercase font-bold tracking-wider">Total Value</span>
              <span className="text-[#2780C4] font-extrabold text-xl mt-1">{selectedFarmland.amount}</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Info Blocks */}
        <div className="lg:col-span-8 bg-white border border-[#EBEBEB] rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col gap-6">
          <h3 className="font-plus-jakarta font-bold text-lg text-[#1E1E1E]">Asset Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="font-plus-jakarta text-[11px] text-[#A0AEC0] uppercase tracking-wider font-bold">Owner Name</span>
              <span className="text-sm font-semibold text-[#1A1C1D]">{selectedFarmland.ownerName}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-plus-jakarta text-[11px] text-[#A0AEC0] uppercase tracking-wider font-bold">Submission Date</span>
              <span className="text-sm font-semibold text-[#1A1C1D]">{selectedFarmland.submissionDate}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-plus-jakarta text-[11px] text-[#A0AEC0] uppercase tracking-wider font-bold">Assigned Agent</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-semibold text-[#1A1C1D]">{selectedFarmland.agentName}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-plus-jakarta text-[11px] text-[#A0AEC0] uppercase tracking-wider font-bold">Cost per Acre</span>
              <span className="text-sm font-semibold text-[#1A1C1D]">{selectedFarmland.costPerAcre}</span>
            </div>
          </div>

          <div className="border-t border-[#F1F3F4] pt-6 flex flex-col gap-4 mt-2">
            <h4 className="font-plus-jakarta font-bold text-sm text-[#1E1E1E]">Verified Land Documents</h4>
            <div className="flex flex-col gap-2">
              {selectedFarmland.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between bg-[#F8F9FA] p-3.5 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#2780C4]" />
                    <span className="text-xs font-semibold text-[#1A1C1D]">{doc.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase border border-emerald-100">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit trail sidebar */}
        <div className="lg:col-span-4 bg-white border border-[#EBEBEB] rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
          <span className="font-plus-jakarta font-bold text-lg text-[#1E1E1E]">Verification Audit Log</span>
          
          <div className="flex flex-col gap-4 mt-2 relative border-l border-gray-200 pl-4 ml-2">
            {selectedFarmland.comments.map((comment, index) => (
              <div key={index} className="flex flex-col gap-1 relative">
                {/* Timeline circle */}
                <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#BDD327] border-2 border-white" />
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#1A1C1D]">{comment.author} ({comment.role})</span>
                  <span className="text-[#A0AEC0]">{comment.date}</span>
                </div>
                <p className="text-xs text-[#5D6B6B] mt-0.5 leading-relaxed bg-[#F8F9FA] p-2.5 rounded-lg border border-gray-50">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default CompletedFarmlandDetails;
