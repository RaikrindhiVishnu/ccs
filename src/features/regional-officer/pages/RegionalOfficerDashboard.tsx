import React from 'react';
import { 
  Search, 
  Plus, 
  ArrowUpRight, 
  MapPin, 
  FileText, 
  Clock, 
  ChevronDown, 
  MoreHorizontal,
  Bell,
  Users,
  AlertCircle,
  Map,
  Maximize
} from 'lucide-react';
import DailyClearanceChart from '../components/DailyClearanceChart';
import roDashboardMap from '../../../assets/regionalofficer/ro dasboard.svg';

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
    <div className="pt-2 pb-12">
      {/* 3-Column Main Layout */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* ================= LEFT COLUMN (w: ~340px) ================= */}
        <div className="flex flex-col gap-6 w-full xl:w-[340px] shrink-0">
          {/* Clearance Rate */}
          <div className="bg-[#000000] rounded-[23px] px-6 py-5 text-white relative w-full h-[107px] flex flex-col justify-between overflow-hidden shrink-0">
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-plus-jakarta text-[#8A8A8F] leading-none">Clearance Rate</span>
              <button className="w-8 h-8 rounded-full border border-[#8A8A8F] flex items-center justify-center -mt-1 -mr-1">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="text-[48px] font-plus-jakarta leading-none tracking-tight">84%</div>
          </div>

          {/* Pipeline Integrity / Total Balance */}
          <div className="bg-[#000000] rounded-[22.5px] p-5 text-white flex flex-col w-full h-[482.5px] shrink-0">
            {/* Header section */}
            <div>
              <h3 className="text-[14px] font-plus-jakarta font-semibold mb-1">Pipeline Integrity</h3>
              <p className="text-[10px] text-[#8A8A8F] mb-4">Real time status across all regional zones</p>

              {/* Progress Bar & Legend */}
              <div className="space-y-3">
                <div className="h-[20px] w-full bg-white/20 rounded-[9px] overflow-hidden flex shrink-0">
                  <div className="h-full bg-[#2780C4]" style={{ width: '40%' }}></div>
                  <div className="h-full bg-[#333333]" style={{ width: '35%' }}></div>
                  <div className="h-full bg-[#EF4444]" style={{ width: '25%' }}></div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#2780C4] rounded-full"></div>
                    <span className="text-[11px] text-[#8A8A8F] font-plus-jakarta">Approved</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#333333] rounded-full"></div>
                    <span className="text-[11px] text-[#8A8A8F] font-plus-jakarta">Pending</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                    <span className="text-[11px] text-[#8A8A8F] font-plus-jakarta">Returned</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-cards Container elegantly connected without middle void */}
            <div className="flex flex-col gap-3 mt-6 flex-1 justify-between">
              <div>
                {/* 01 Initial Documents */}
                <div className="bg-white/20 rounded-[15px] h-[50px] px-4 flex justify-between items-center shrink-0 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[26px] h-[26px] bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <FileText className="w-[13px] h-[13px] text-white" />
                    </div>
                    <span className="text-[12px] font-plus-jakarta text-white">Initial Documents</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <ArrowUpRight className="w-3 h-3 text-[#4CD964]" />
                    <span className="text-[9px] font-poppins text-[#8A8A8F]">3.1%</span>
                  </div>
                </div>

                {/* 02 Escalated Documents */}
                <div className="bg-white/20 rounded-[15px] h-[50px] px-4 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-[26px] h-[26px] bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <AlertCircle className="w-[13px] h-[13px] text-white" />
                    </div>
                    <span className="text-[12px] font-plus-jakarta text-white">Escalated Documents</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="rotate-90"><ArrowUpRight className="w-3 h-3 text-[#FF0004]" /></div>
                    <span className="text-[9px] font-poppins text-[#8A8A8F]">-1.2%</span>
                  </div>
                </div>
              </div>

              {/* 03 Field Officer Deployment */}
              <div className="bg-white/20 rounded-[15px] flex-1 mt-3 p-5 flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-[26px] h-[26px] bg-black rounded-full flex items-center justify-center shrink-0">
                      <Users className="w-[13px] h-[13px] text-white" />
                    </div>
                    <span className="text-[13px] font-plus-jakarta font-semibold text-white">Field Officer Deployment</span>
                  </div>

                  <div className="text-[14px] text-white font-plus-jakarta">
                    Total Active FO's : 18
                  </div>
                </div>

                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <div className="text-[9px] text-[#8A8A8F] font-plus-jakarta mb-1">Team Leader</div>
                    <div className="text-[11.25px] text-white font-plus-jakarta">Vikram Reddy</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#8A8A8F] font-plus-jakarta mb-1">Active Status</div>
                    <div className="text-[11.25px] text-white font-plus-jakarta">25</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE COLUMN (w: ~555px) ================= */}
        <div className="flex flex-col gap-6 w-full xl:w-[555px] shrink-0">
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            {/* Verification Queue */}
            <div className="bg-white rounded-[22.5px] p-6 shadow-sm border border-gray-50 flex-1 w-full sm:w-[270px] h-[324px] flex flex-col justify-between shrink-0">
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
            <div className="bg-white rounded-[22.5px] p-6 shadow-sm border border-gray-50 flex-1 w-full sm:w-[270px] h-[324px] flex flex-col justify-between shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[12.75px] font-plus-jakarta font-normal text-black">Active Field Deployments</h3>
                  <p className="text-[10px] text-[#8A8A8F] mt-0.5">Live tracking of Field Officers (FO)</p>
                </div>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </button>
              </div>

              {/* Map Container */}
              <div className="w-full h-[133px] bg-[#F1F5F9] rounded-[5.3px] relative overflow-hidden mb-6 flex items-center justify-center shrink-0">
                <img src={roDashboardMap} alt="Map View" className="w-full h-full object-cover scale-105" />
              </div>

              {/* List Details */}
              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black rounded-[20px] flex items-center justify-center shrink-0">
                    <Map className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div>
                    <div className="text-[12px] font-plus-jakarta font-semibold text-[#0B1430]">18 Scheduled Site Visits</div>
                    <div className="text-[10px] font-plus-jakarta font-medium text-[#98A0B2]">Across all active regions</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black rounded-[20px] flex items-center justify-center shrink-0">
                    <Maximize className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div>
                    <div className="text-[12px] font-plus-jakarta font-semibold text-[#0B1430]">12.3 Acres (HYD Site #1)</div>
                    <div className="text-[10px] font-plus-jakarta font-medium text-[#98A0B2]">Largest pending inspection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Clearance Pace */}
          <div className="bg-white rounded-[22.5px] p-8 shadow-sm border border-gray-50 flex flex-col w-full h-[265.5px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[12.75px] font-poppins text-black">Daily Clearance Pace</h3>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>

            <div className="flex-1 relative">
              <DailyClearanceChart />
            </div>

            <div className="mt-2">
              <div className="text-[15px] font-plus-jakarta text-black font-semibold">350 Acres Cleared (MTD)</div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (w: ~481.5px) ================= */}
        <div className="flex flex-col gap-6 w-full xl:w-[481.5px] shrink-0">
          {/* Action Stats (Banners wrapped in premium round white container per Figma) */}
          <div className="bg-white rounded-[22.5px] p-[18px] shadow-sm border border-gray-50 w-full h-[154.5px] flex items-center shrink-0">
            <div className="flex flex-row justify-between gap-3 w-full h-full">
              {[
                { label: 'Regional Audits', value: '42 Docs', icon: <FileText className="w-4 h-4 text-white" /> },
                { label: 'Acreage Cleared', value: '350 Acres', icon: <MapPin className="w-4 h-4 text-white" /> },
                { label: 'Pending Checks', value: '18 Sites', icon: <Clock className="w-4 h-4 text-white" /> },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#2780C4] rounded-[22.5px] p-4 text-white flex flex-col justify-between h-[118.5px] flex-1 group hover:bg-[#1f66a3] transition-all cursor-pointer">
                  <div className="w-[37.5px] h-[37.5px] bg-black rounded-full flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[11px] opacity-80 font-plus-jakarta mb-0.5 whitespace-nowrap">{item.label}</div>
                    <div className="text-[14px] font-semibold font-plus-jakarta whitespace-nowrap">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity / Transaction History */}
          <div className="bg-white rounded-[22.5px] p-6 shadow-sm border border-gray-50 h-[435px] overflow-y-auto w-full shrink-0 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[12.75px] font-plus-jakarta text-black">Recent Activity</h3>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[11.25px] text-[#8A8A8F] font-poppins mb-3 uppercase tracking-wider">Today</div>
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
                <div className="text-[11.25px] text-[#8A8A8F] font-poppins mb-3 uppercase tracking-wider">Yesterday</div>
                <div className="space-y-3">
                  {RECENT_ACTIVITY.yesterday.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full overflow-hidden shrink-0">
                        <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11.25px] font-plus-jakarta text-black truncate">{item.title}</div>
                        <div className="text-[10.5px] text-[#8A8A8F] font-plus-jakarta">{item.officer}</div>
                      </div>
                      <div className={`text-[11.25px] font-plus-jakarta shrink-0 ${item.status === 'In Progress' ? 'text-[#2780C4]' :
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
      </div>

      {/* Farmland List Section */}
      <div className="space-y-6 mt-10">
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
