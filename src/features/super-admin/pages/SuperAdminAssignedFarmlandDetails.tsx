import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { mockDashboardData } from '@/features/super-admin/data/mockDashboardData';

const SuperAdminAssignedFarmlandDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const farmlandId = id || "GLCSOS 01";
  
  // Use mock data
  const data = mockDashboardData.assignedFarmlandDetails;

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-8 box-border flex flex-col font-sans">
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-700" />
          <span className="font-medium text-gray-700 text-sm">Go Back</span>
        </button>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-200 shadow-sm">
            <img
              src="https://i.pravatar.cc/150?u=superadmin"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="mt-8 flex flex-col w-full max-w-7xl mx-auto flex-1">
        <Typography variant="h2" className="font-bold text-[1.75rem] text-gray-900 mb-8">
          Assigned Farmland
        </Typography>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch flex-1">
          {/* Left Column: Image Card */}
          <div className="flex-1 rounded-[2rem] overflow-hidden relative shadow-md min-h-[400px]">
            <img
              src={data.heroData.image}
              alt="Farmland"
              className="w-full h-full object-cover"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 lg:p-10">
              <span className="inline-flex items-center justify-center px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider uppercase mb-4 w-max border border-white/30">
                {data.heroData.badge}
              </span>
              <h1 className="text-white text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
                {farmlandId}
              </h1>
              <div className="flex items-center text-white/90 gap-1.5">
                <MapPin size={18} />
                <span className="font-medium text-sm lg:text-base">{data.heroData.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="w-full lg:w-[28rem] flex flex-col gap-6">
            {/* Current Status Card */}
            <Card className="p-8 rounded-[2rem] bg-white border-0 shadow-sm flex flex-col gap-6">
              <Typography variant="h4" className="font-bold text-lg text-gray-900">
                Current Status
              </Typography>
              <div className="h-px w-full bg-gray-100" />
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 p-5 rounded-2xl border border-gray-100 bg-[#FAFAFA]">
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-gray-400">
                    SYSTEM STATUS
                  </span>
                  <span className="font-semibold text-gray-900 text-base">
                    {data.status.systemStatus}
                  </span>
                </div>

                <div className="flex flex-col gap-2 p-5 rounded-2xl border border-gray-100 bg-[#FAFAFA]">
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-gray-400">
                    LIVE STATUS
                  </span>
                  <span className="font-semibold text-gray-900 text-base">
                    {data.status.liveStatus}
                  </span>
                </div>
              </div>
            </Card>

            {/* Asset Details Card */}
            <Card className="p-8 rounded-[2rem] bg-white border-0 shadow-sm flex flex-col gap-6 flex-1">
              <Typography variant="h4" className="font-bold text-lg text-gray-900">
                Asset Details
              </Typography>
              <div className="h-px w-full bg-gray-100" />

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-gray-400">
                    FARMLAND ID
                  </span>
                  <span className="font-medium text-gray-900 text-sm">
                    {farmlandId}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 font-medium text-gray-900 text-sm mt-auto">
                    <MapPin size={16} className="text-gray-500" />
                    {data.assetDetails.location}
                  </span>
                </div>

                <div className="flex flex-col gap-2 col-span-2 mt-2">
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-gray-400">
                    ASSIGNED AGENT
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={data.assetDetails.agentAvatar}
                      alt="Agent"
                      className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    />
                    <span className="font-semibold text-gray-900 text-sm">
                      {data.assetDetails.agentName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-gray-400">
                    CREATION TIME
                  </span>
                  <span className="font-medium text-gray-600 text-xs">
                    {data.assetDetails.creationTime}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-gray-400">
                    LAST UPDATED
                  </span>
                  <span className="font-medium text-gray-600 text-xs">
                    {data.assetDetails.lastUpdated}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Footer Actions ── */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate(`/super-admin/assigned-farmlands/${farmlandId}/customer-information`)}
            className="px-8 py-3.5 bg-[#2A3125] text-white rounded-full font-semibold text-sm hover:bg-black transition-colors"
          >
            View Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAssignedFarmlandDetails;
