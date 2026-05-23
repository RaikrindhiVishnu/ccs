import React from 'react';
import { 
  Search, 
  Plus, 
  ArrowUpRight, 
  MapPin, 
  FileText, 
  Clock, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Bell,
  Users,
  AlertCircle
} from 'lucide-react';
import DailyClearanceChart from '../components/DailyClearanceChart';

// Mock Data
const FARMLANDS = [
  { id: 'SOS 01', code: '#FL-8402', officer: 'Kishore Moore', area: '450 acres', total: '₹2.4 Cr', cost: '₹5.3k', status: 'Approved', priority: 'HIGH VALUE', statusColor: '#10B981', priorityBg: 'rgba(39, 128, 196, 0.1)', priorityText: '#2563EB' },
  { id: 'SOS 02', code: '#FL-8411', officer: 'Ram Varma', area: '1.20 acres', total: '₹4.8 Cr', cost: '₹4.0k', status: 'Pending', priority: 'LARGE ACREAGE', statusColor: '#FBBF24', priorityBg: '#F1F5F9', priorityText: '#0F1724' },
  { id: 'SOS 03', code: '#FL-8415', officer: 'Arjun Vardhan', area: '210 acres', total: '₹8.5 Cr', cost: '₹4.0k', status: 'In Review', priority: 'URGENT', statusColor: '#6B7280', priorityBg: '#FEE2E2', priorityText: '#EF4444' },
  { id: 'SOS 04', code: '#FL-8415', officer: 'Raju Oberoi', area: '210 acres', total: '₹5.5 Cr', cost: '₹4.0k', status: 'In Review', priority: 'URGENT', statusColor: '#6B7280', priorityBg: '#FEE2E2', priorityText: '#EF4444' },
];

const RECENT_ACTIVITY = {
  today: [
    { title: 'Ground Report Submitted (GLC SOS 01)', officer: 'By Field Officer Arjun', status: 'Completed' },
  ],
  yesterday: [
    { title: 'On-site Inspection (GLC SOS 02)', officer: 'By Field Officer Ramesh', status: 'Completed' },
    { title: 'Crop Health Scan Drone Report (GLC SOS 03)', officer: 'By Field Officer Karthik', status: 'In Progress' },
    { title: 'GPS Boundary Mapped (GLC SOS 04)', officer: 'By Field Officer Raju', status: 'Review Required' },
    { title: 'New Document Submission (GLC SOS 04)', officer: 'By Field Officer Raju', status: 'Initiated' },
  ]
};

const RegionalOfficerDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex flex-col mb-1">
            <span className="text-[27px] font-semibold font-plus-jakarta text-black uppercase leading-[34px]">Welcome,</span>
            <span className="text-[27px] font-semibold font-plus-jakarta text-black uppercase leading-[34px]">Edward Janowski</span>
          </div>
          <h1 className="text-xl font-semibold font-plus-jakarta text-[#2780C4] mt-2">
            REGIONAL OFFICER DASHBOARD
          </h1>
          <p className="text-sm text-[#5C5C5C] font-plus-jakarta mt-1">
            Next-generation platform infrastructure for scaling sustainable estates.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex items-center gap-2 px-5 py-3 bg-[#2780C4] text-white rounded-[73px] hover:bg-[#1f66a3] transition-all whitespace-nowrap shadow-sm">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center -ml-1">
              <Plus className="w-6 h-6 text-[#2780C4]" />
            </div>
            <span className="font-plus-jakarta font-medium text-lg">Add a farm land</span>
          </button>
          
          <div className="relative flex-1 lg:w-[312px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#5C5C5C]" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full h-[52px] pl-[54px] pr-5 bg-white rounded-[60px] border-none font-plus-jakarta text-base focus:ring-2 focus:ring-[#2780C4] transition-all shadow-sm"
            />
          </div>

          <button className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm relative">
            <Bell className="w-6 h-6 text-[#2C2C2C]" />
            <div className="absolute top-[14px] right-[14px] w-[5px] h-[5px] bg-[#EF4646] rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Top row cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Clearance Rate */}
        <div className="bg-black rounded-[22.5px] p-8 text-white relative min-h-[160px] flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-plus-jakarta text-[#8A8A8F]">Clearance Rate</span>
            <button className="w-9 h-9 rounded-full border border-[#8A8A8F] flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="text-[56px] font-plus-jakarta leading-none mb-2">84%</div>
        </div>

        {/* Verification Queue */}
        <div className="bg-white rounded-[22.5px] p-6 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[12.75px] font-plus-jakarta font-normal text-black">Verification Queue</h3>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>
          <div className="space-y-6">
            {[
              { id: 'GLC-MED-782', label: 'Dossier review', value: 85 },
              { id: 'GLC-HYD-109', label: 'Title search', value: 40 },
              { id: 'GLC-MED-815', label: 'Boundary map', value: 15 },
            ].map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm font-semibold text-[#0B1430]">{item.id}</div>
                    <div className="text-[12px] text-[#98A0B2]">{item.label}</div>
                  </div>
                  <div className="text-[13px] font-semibold text-[#0B1430]">{item.value}%</div>
                </div>
                <div className="h-[6px] w-full bg-[#F1F4F8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2780C4] rounded-full" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Field Deployments */}
        <div className="bg-white rounded-[22.5px] p-6 shadow-sm border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-[12.75px] font-plus-jakarta font-normal text-black">Active Field Deployments</h3>
              <p className="text-[10px] text-[#8A8A8F]">Live tracking of Field Officers (FO)</p>
            </div>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>
          
          <div className="flex-1 bg-[#F1F5F9] rounded-2xl relative overflow-hidden mb-6 min-h-[100px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Map Pin Mockups */}
            <div className="absolute top-4 left-10 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></div>
            <div className="absolute bottom-6 right-12 w-2 h-2 bg-yellow-500 rounded-full border-2 border-white"></div>
            <div className="absolute top-10 right-6 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0">
                <Users className="w-[18px] h-[18px] text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B1430]">18 Scheduled Site Visits</div>
                <div className="text-[10px] text-[#98A0B2]">Across all active regions</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-[18px] h-[18px] text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B1430]">12.3 Acres (HYD Site #1)</div>
                <div className="text-[10px] text-[#98A0B2]">Largest pending inspection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Stats */}
        <div className="flex flex-col gap-4">
          {[
            { label: 'Regional Audits', value: '42 Docs', icon: <FileText className="w-5 h-5 text-white" /> },
            { label: 'Acreage Cleared', value: '350 Acres', icon: <MapPin className="w-5 h-5 text-white" /> },
            { label: 'Pending Checks', value: '18 Sites', icon: <Clock className="w-5 h-5 text-white" /> },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#2780C4] rounded-[22.5px] p-6 text-white flex flex-col justify-between h-full group hover:bg-[#1f66a3] transition-all cursor-pointer">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <div>
                <div className="text-[11px] opacity-80 font-plus-jakarta mb-1">{item.label}</div>
                <div className="text-xl font-semibold font-plus-jakarta">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle row cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Integrity */}
        <div className="lg:col-span-3 bg-black rounded-[22.5px] p-8 text-white flex flex-col">
          <h3 className="text-[12.75px] font-plus-jakarta mb-1">Pipeline Integrity</h3>
          <p className="text-[10px] text-[#8A8A8F] mb-8">Real time status across all regional zones</p>

          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <div className="h-[23.32px] w-full bg-white/20 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#2780C4]" style={{ width: '40%' }}></div>
                <div className="h-full bg-[#333333]" style={{ width: '35%' }}></div>
                <div className="h-full bg-[#EF4444]" style={{ width: '25%' }}></div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#2780C4] rounded-full"></div>
                  <span className="text-[12px] text-[#8A8A8F]">Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#333333] rounded-full"></div>
                  <span className="text-[12px] text-[#8A8A8F]">Pending</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                  <span className="text-[12px] text-[#8A8A8F]">Returned</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Initial Documents</span>
                </div>
                <div className="text-[10px] text-[#8A8A8F] flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> 3.1%
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Escalated Documents</span>
                </div>
                <div className="text-[10px] text-[#EF4444] flex items-center">
                  <div className="w-3 h-3 mr-1 rotate-180"><ArrowUpRight className="w-full h-full" /></div> 1.2%
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Field Officer Deployment</span>
                </div>
                <MoreHorizontal className="w-4 h-4 text-[#8A8A8F]" />
              </div>
            </div>
          </div>
        </div>

        {/* Daily Clearance Pace */}
        <div className="lg:col-span-5 bg-white rounded-[22.5px] p-8 shadow-sm border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[12.75px] font-poppins text-black">Daily Clearance Pace</h3>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>
          
          <div className="flex-1 min-h-[220px]">
            <DailyClearanceChart />
          </div>

          <div className="mt-4">
            <div className="text-[15px] text-black">350 Acres Cleared (MTD)</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white rounded-[22.5px] p-8 shadow-sm border border-gray-50 overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[12.75px] font-plus-jakarta text-black">Recent Activity</h3>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[11.25px] text-[#8A8A8F] font-poppins mb-4 uppercase tracking-wider">Today</div>
              {RECENT_ACTIVITY.today.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-full overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/150?u=${idx}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11.25px] font-plus-jakarta text-black truncate">{item.title}</div>
                    <div className="text-[10.5px] text-[#8A8A8F]">{item.officer}</div>
                  </div>
                  <div className="text-[11.25px] text-black shrink-0">{item.status}</div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="text-[11.25px] text-[#8A8A8F] font-poppins mb-4 uppercase tracking-wider">Yesterday</div>
              <div className="space-y-4">
                {RECENT_ACTIVITY.yesterday.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full overflow-hidden shrink-0">
                      <img src={`https://i.pravatar.cc/150?u=${idx+10}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11.25px] font-plus-jakarta text-black truncate">{item.title}</div>
                      <div className="text-[10.5px] text-[#8A8A8F] font-plus-jakarta">{item.officer}</div>
                    </div>
                    <div className={`text-[11.25px] font-plus-jakarta shrink-0 ${
                      item.status === 'In Progress' ? 'text-[#2780C4]' : 
                      item.status === 'Review Required' ? 'text-[#FBBF24]' : 
                      item.status === 'Completed' ? 'text-[#10B981]' : 'text-[#8A8A8F]'
                    }`}>{item.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farmland List Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-[163px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#767676]" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full h-[38.8px] pl-10 pr-4 bg-white rounded-[64.6px] border border-[#EBEBEB] text-xs font-plus-jakarta focus:ring-1 focus:ring-[#2780C4] shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {[
              { label: 'Area', icon: true },
              { label: 'Location', icon: true },
              { label: 'Amount', icon: true },
              { label: 'Status', icon: true },
            ].map((filter, idx) => (
              <button key={idx} className="flex items-center gap-3 h-[35.69px] px-4 bg-white rounded-[64.6px] border border-[#EBEBEB] text-xs text-[#5A5C5E] whitespace-nowrap hover:bg-gray-50 transition-all shadow-sm shrink-0">
                {filter.label}
                {filter.icon && <ChevronDown className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Farmland Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARMLANDS.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.statusColor }}></div>
                  <span className="text-[13px] font-semibold" style={{ color: item.statusColor }}>{item.status}</span>
                </div>
                <div className="px-2.5 py-1 rounded-xl text-[11px] font-semibold tracking-wider" style={{ backgroundColor: item.priorityBg, color: item.priorityText }}>
                  {item.priority}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[#0F1724]">GLC {item.id}</h4>
                <div className="flex items-center gap-2 mt-1 text-[13px] text-[#6B7280]">
                  <span>{item.code}</span>
                  <span className="opacity-10">•</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 bg-[#6B7280]/10 rounded-full flex items-center justify-center">
                      <Users className="w-2 h-2 text-[#6B7280]" />
                    </div>
                    {item.officer}
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F9FC] rounded-xl p-4 grid grid-cols-3 gap-2">
                <div>
                  <div className="text-[12px] text-[#6B7280] mb-1">Area</div>
                  <div className="text-sm font-semibold text-[#0F1724]">{item.area}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6B7280] mb-1">Total Amt</div>
                  <div className="text-sm font-semibold text-[#0F1724]">{item.total}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6B7280] mb-1">Cost/Acre</div>
                  <div className="text-sm font-semibold text-[#0F1724]">{item.cost}</div>
                </div>
              </div>

              <button className="w-full h-10 border border-[#2780C4]/50 rounded-xl text-[#2780C4] text-sm font-semibold hover:bg-[#2780C4] hover:text-white transition-all mt-auto">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionalOfficerDashboard;
