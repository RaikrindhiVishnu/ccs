import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminHeader from "@/features/super-admin/components/SuperAdminHeader";
import VisitorSalesCard from "@/features/super-admin/components/VisitorSalesCard";
import FarmlandStatsCard from "@/features/super-admin/components/FarmlandStatsCard";
import UploadFarmlandCard, { type UploadFarmlandData } from "@/features/super-admin/components/UploadFarmlandCard";
import UploadFarmlandDetails from "@/features/super-admin/components/UploadFarmlandDetails";
import { mockDashboardData } from "@/features/super-admin/data/mockDashboardData";
import { 
  CloudUpload, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Play, 
  Clock, 
  Database,
  Layers,
  ChevronDown,
  Search as SearchIcon,
  ArrowUpRight,
  X as XIcon,
  SlidersHorizontal
} from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface UploadFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
  type: string;
}

const UploadSuperAdmin: React.FC = () => {
  const navigate = useNavigate();
  const data = mockDashboardData;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedFarmland, setSelectedFarmland] = useState<UploadFarmlandData | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");

  // Listed Farmlands State
  const [farmlands, setFarmlands] = useState<UploadFarmlandData[]>([
    {
      id: "1",
      title: "GLC SOS 01",
      acres: "10 Acres",
      uploadedAt: "23/04/26",
      image: "/super-admin/images/farmland1.png",
      status: "draft",
      uploader: {
        name: "Ram Varma",
        avatar: "",
      },
    },
    {
      id: "2",
      title: "GLC SOS 02",
      acres: "5 Acres",
      uploadedAt: "22/04/26",
      image: "/super-admin/images/farmland2.png",
      status: "completed",
      uploader: {
        name: "Ajesh Sharma",
        avatar: "",
      },
    },
    {
      id: "3",
      title: "GLC SOS 03",
      acres: "8 Acres",
      uploadedAt: "21/04/26",
      image: "/super-admin/images/farmland3.png",
      status: "completed",
      uploader: {
        name: "Rajiv Kapoor",
        avatar: "",
      },
    },
    {
      id: "4",
      title: "GLC SOS 04",
      acres: "1.2 Acres",
      soilType: "Sandy Loam",
      image: "/super-admin/images/farmland4.png",
      status: "completed",
      uploader: {
        name: "Vikram Gowda",
        avatar: "",
      },
    },
  ]);

  // Upload Monitor State
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("farmlands");
  const [files, setFiles] = useState<UploadFileItem[]>([
    {
      id: "1",
      name: "mandal_boundaries_june.geojson",
      size: "4.2 MB",
      progress: 100,
      status: "completed",
      type: "GIS Mappings",
    },
    {
      id: "2",
      name: "regional_officers_audit_logs.csv",
      size: "820 KB",
      progress: 100,
      status: "completed",
      type: "User Logs",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: "farmlands", label: "Farmlands Data", desc: "Upload farm documents, plots & details", icon: Database },
    { id: "gis", label: "GIS Mappings", desc: "Upload GeoJSON boundaries & mandals", icon: Layers },
    { id: "users", label: "User Directory", desc: "Upload officers, agents & user accounts", icon: FileText },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(e.target.files);
    }
  };

  const addFiles = (fileList: FileList) => {
    const newFiles: UploadFileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const sizeStr = 
        file.size > 1024 * 1024 
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
          : `${(file.size / 1024).toFixed(0)} KB`;
          
      const categoryLabel = categories.find(c => c.id === selectedCategory)?.label || "Other Data";

      newFiles.push({
        id: Date.now().toString() + i,
        name: file.name,
        size: sizeStr,
        progress: 0,
        status: "pending",
        type: categoryLabel,
      });
    }
    setFiles((prev) => [...newFiles, ...prev]);

    // Start simulation for the newly added files
    newFiles.forEach((file) => {
      simulateUpload(file.id, file.name);
    });
  };

  const simulateUpload = (id: string, name: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 5 } : f))
    );

    let progressVal = 5;
    const interval = setInterval(() => {
      progressVal += Math.floor(Math.random() * 20) + 15;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "completed" } : f
          )
        );

        // Prepend a new Farmland card when a farmland file upload is finished!
        if (selectedCategory === "farmlands") {
          const cleanName = name.replace(/\.[^/.]+$/, "").substring(0, 12).toUpperCase();
          const randomAcres = Math.floor(Math.random() * 15) + 2;
          const today = new Date().toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          });

          const newCard: UploadFarmlandData = {
            id: Date.now().toString(),
            title: cleanName.startsWith("GLC") ? cleanName : `GLC ${cleanName}`,
            acres: `${randomAcres} Acres`,
            uploadedAt: today,
            image: `/super-admin/images/farmland${Math.floor(Math.random() * 4) + 1}.png`,
            status: "draft",
            uploader: {
              name: "Super Admin",
              avatar: "",
            },
          };
          setFarmlands((prev) => [newCard, ...prev]);
        }
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: progressVal } : f))
        );
      }
    }, 450);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Filter Logic
  const filteredFarmlands = farmlands.filter((farm) => {
    const matchesSearch = farm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.uploader.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "" || farm.status === statusFilter;
    // Mock other filters since we're using static mock data
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">
      {viewMode === "details" && selectedFarmland ? (
        <UploadFarmlandDetails
          farmland={selectedFarmland}
          onBack={() => {
            setViewMode("list");
            setSelectedFarmland(null);
          }}
          onActionComplete={(id, action) => {
            if (action === "resume") {
              setFarmlands((prev) =>
                prev.map((f) => (f.id === id ? { ...f, status: "completed" } : f))
              );
            }
            setViewMode("list");
            setSelectedFarmland(null);
          }}
        />
      ) : (
        <>
          {/* Header Section */}
          <div className="shrink-0">
            <SuperAdminHeader
              title="SUPER ADMIN"
              breadcrumb="Upload Center"
              subtitle="Direct secure portal to load structured datasets, Geospatial GeoJSON mappings, and admin registers."
            >
              {/* Visitor + Sales cards overlaid inside the header area */}
              <div className="flex items-start justify-between gap-4 mt-4 w-full h-full relative z-10">
                <div className="mt-4">
                  <VisitorSalesCard
                    visitors={data.visitors}
                    totalSales={data.totalSales}
                    bgClass="bg-[#FFFFFF] border-none shadow-sm"
                  />
                </div>
                <div className="mt-auto mb-6">
                  <FarmlandStatsCard 
                    stats={data.farmlandStats} 
                    bgClass="bg-[#FFFFFF] border-none shadow-sm"
                  />
                </div>
              </div>
            </SuperAdminHeader>
          </div>

          {/* ── Uploaded Farmlands Main Section ── */}
          <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)] mt-[clamp(1rem,2vw,1.5rem)] px-[clamp(0.25rem,1.5vw,0.75rem)]">
            {/* Title row and Upload button */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-[clamp(0.125rem,0.25vw,0.25rem)]">
                <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[clamp(1.5rem,2.2vw,3rem)] leading-tight text-[#131600]">
                  Uploaded Farmlands
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.875rem,1.2vw,1.6rem)] leading-normal text-[#45474C]">
                  Upload documents to list a farmland
                </p>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center justify-center gap-[clamp(0.25rem,0.5vw,0.375rem)] h-[clamp(2.25rem,2.5vw,2.75rem)] px-[clamp(0.75rem,1.5vw,1.25rem)] rounded-[clamp(1.5rem,2.5vw,2.18rem)] text-white transition-transform hover:scale-[1.02] shadow-sm shrink-0"
                style={{
                  background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                }}
              >
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.75rem,1vw,1.35rem)] leading-none text-center">
                  Upload a farmland
                </span>
                <ArrowUpRight size={14} className="text-white" />
              </button>
            </div>

            {/* Filter / Search Bar */}
            <div className="flex flex-row flex-wrap gap-[clamp(0.75rem,1.5vw,1.25rem)] items-center justify-between w-full">
              {/* Search Box */}
              <div className="relative w-[clamp(14rem,18vw,22rem)] max-w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[clamp(2.25rem,2.5vw,2.6rem)] pl-[clamp(2rem,2.5rem,2.75rem)] pr-[1rem] bg-white border border-[#EBEBEB] rounded-[clamp(2rem,4rem,4.04rem)] font-['Outfit'] font-normal text-[clamp(0.7rem,0.9vw,1.25rem)] text-[#767676] placeholder:text-[#767676] shadow-[0px_2.3rem_0.95rem_rgba(0,0,0,0.01)] focus:outline-none focus:border-gray-400"
                />
                <SearchIcon size={16} className="absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-[#767676]" />
              </div>

              {/* Dropdowns */}
              <div className="flex items-center justify-end flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)] flex-1 min-w-0 pb-[clamp(0.25rem,0.5vw,0.375rem)]">
                {/* Area Filter */}
                <div className="relative shrink-0">
                  <select
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="appearance-none h-[clamp(2.1rem,2.3vw,2.4rem)] pl-[clamp(1rem,1.5rem,1.75rem)] pr-[clamp(2rem,2.5rem,2.75rem)] bg-white border border-[#EBEBEB] rounded-[clamp(2rem,4rem,4.04rem)] font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.7rem,0.9vw,1.25rem)] text-[#5A5C5E] cursor-pointer focus:outline-none hover:bg-gray-50 shadow-[0px_2.3rem_0.95rem_rgba(0,0,0,0.01)]"
                  >
                    <option value="">Area</option>
                    <option value="10">10 Acres</option>
                    <option value="5">5 Acres</option>
                    <option value="8">8 Acres</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-[#5A5C5E] pointer-events-none" />
                </div>

                {/* Region Filter */}
                <div className="relative shrink-0">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="appearance-none h-[clamp(2.1rem,2.3vw,2.4rem)] pl-[clamp(1rem,1.5rem,1.75rem)] pr-[clamp(2rem,2.5rem,2.75rem)] bg-white border border-[#EBEBEB] rounded-[clamp(2rem,4rem,4.04rem)] font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.7rem,0.9vw,1.25rem)] text-[#5A5C5E] cursor-pointer focus:outline-none hover:bg-gray-50 shadow-[0px_2.3rem_0.95rem_rgba(0,0,0,0.01)]"
                  >
                    <option value="">Region</option>
                    <option value="south">South</option>
                    <option value="north">North</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-[#5A5C5E] pointer-events-none" />
                </div>

                {/* State Filter */}
                <div className="relative shrink-0">
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="appearance-none h-[clamp(2.1rem,2.3vw,2.4rem)] pl-[clamp(1rem,1.5rem,1.75rem)] pr-[clamp(2rem,2.5rem,2.75rem)] bg-white border border-[#EBEBEB] rounded-[clamp(2rem,4rem,4.04rem)] font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.7rem,0.9vw,1.25rem)] text-[#5A5C5E] cursor-pointer focus:outline-none hover:bg-gray-50 shadow-[0px_2.3rem_0.95rem_rgba(0,0,0,0.01)]"
                  >
                    <option value="">State</option>
                    <option value="ap">Andhra Pradesh</option>
                    <option value="ts">Telangana</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-[#5A5C5E] pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative shrink-0">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none h-[clamp(2.1rem,2.3vw,2.4rem)] pl-[clamp(1rem,1.5rem,1.75rem)] pr-[clamp(2rem,2.5rem,2.75rem)] bg-white border border-[#EBEBEB] rounded-[clamp(2rem,4rem,4.04rem)] font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.7rem,0.9vw,1.25rem)] text-[#5A5C5E] cursor-pointer focus:outline-none hover:bg-gray-50 shadow-[0px_2.3rem_0.95rem_rgba(0,0,0,0.01)]"
                  >
                    <option value="">Status</option>
                    <option value="draft">Draft (Resume)</option>
                    <option value="completed">Completed</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-[#5A5C5E] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Horizontal Scroll Cards List */}
            <div className="w-full overflow-x-auto pb-[clamp(0.75rem,1.5vw,1rem)] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <div className="flex gap-[clamp(1rem,2vw,1.5rem)] min-w-max px-[clamp(0.25rem,0.5vw,0.375rem)]">
                {filteredFarmlands.length === 0 ? (
                  <div className="w-full py-[clamp(3rem,6vw,4rem)] flex flex-col items-center justify-center text-center bg-white border border-dashed border-gray-200 rounded-[clamp(1rem,2vw,1.5rem)] min-w-[clamp(18rem,80vw,100%)] lg:min-w-full">
                    <Typography variant="p" className="text-sm text-[#64748B]">
                      No matching farmlands found.
                    </Typography>
                  </div>
                ) : (
                  filteredFarmlands.map((farm) => (
                    <UploadFarmlandCard
                      key={farm.id}
                      data={farm}
                      onResume={(id) => {
                        const farmObj = farmlands.find((f) => f.id === id);
                        if (farmObj) {
                          setSelectedFarmland(farmObj);
                          setViewMode("details");
                        }
                      }}
                      onViewDetails={(id) => {
                        const farmObj = farmlands.find((f) => f.id === id);
                        if (farmObj) {
                          setSelectedFarmland(farmObj);
                          setViewMode("details");
                        }
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Onboarding Pipeline Upload Modal ── */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[1rem]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0F1011]/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsUploadModalOpen(false)}
          />

          {/* Modal Container */}
          <div 
            className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[42rem] h-[41rem] max-w-[95vw] max-h-[95vh] overflow-hidden z-10 flex flex-col md:flex-row animate-in fade-in zoom-in duration-200"
            style={{
              width: "clamp(32rem, 46.67vw, 48rem)",
              height: "clamp(30rem, 45.56vw, 46rem)",
              borderRadius: "clamp(1.5rem, 2.22vw, 2.5rem)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute right-[clamp(1rem,1.67vw,2rem)] top-[clamp(1rem,1.5vw,1.8rem)] text-[#000000] opacity-60 hover:opacity-100 p-1 hover:bg-black/5 rounded-full transition-all z-20 cursor-pointer"
            >
              <XIcon size={20} />
            </button>

            {/* Left Side: Header & Info */}
            <div className="flex-1 flex flex-col justify-between p-[clamp(1.5rem,2.78vw,3rem)] border-r border-[#C6C8BA]/30 h-full relative">
              <div className="flex flex-col gap-[clamp(0.5rem,0.83vw,1rem)]">
                {/* Heading 2 */}
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(1.5rem,2.22vw,2.5rem)] leading-[clamp(2rem,2.78vw,3rem)] tracking-[-0.01em] text-[#191C1B]">
                  Upload a new farmland
                </h2>
                {/* Description */}
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.75rem,0.97vw,1.1rem)] leading-[clamp(1.05rem,1.25vw,1.4rem)] text-[#45483E]">
                  Complete the following onboarding pipeline to successfully list a farmland.
                </p>
              </div>

              {/* Steps timeline container */}
              <div className="flex-1 flex flex-col justify-center relative pl-[clamp(1rem,2.2vw,2.5rem)] my-[clamp(1rem,2vw,2.5rem)]">
                {/* Vertical Timeline line - placed perfectly centered behind the 9px dots */}
                <div 
                  className="absolute w-[1px] bg-[#2C2C2C]/25"
                  style={{
                    left: "calc(clamp(1rem, 2.2vw, 2.5rem) + 4px)",
                    top: "clamp(0.5rem, 1vw, 1.25rem)",
                    bottom: "clamp(0.5rem, 1vw, 1.25rem)"
                  }}
                />

                <div className="flex flex-col gap-[clamp(1.5rem,2.8vw,3.5rem)]">
                  {[
                    { name: "Customer Information", active: true },
                    { name: "Legal Documents", active: false },
                    { name: "Agriculture Report", active: false },
                    { name: "Land & Boundaries", active: false },
                    { name: "Valuation", active: false },
                    { name: "Local Intelligence", active: false },
                  ].map((step, idx) => (
                    <div key={idx} className="relative flex items-center gap-[clamp(0.75rem,1.25vw,1.5rem)] z-10">
                      {/* Step Dot Container to keep it perfectly centered with the line */}
                      <div className="w-[9px] h-[9px] shrink-0 flex items-center justify-center">
                        <div 
                          className={`w-[9px] h-[9px] rounded-full transition-all ${
                            step.active 
                              ? "bg-[#CED2B4] border-[1.5px] border-[#CCDB99]/80 shadow-[0_0_0_3px_rgba(189,211,39,0.38)]" 
                              : "bg-[#C0C2B7] border-[1.5px] border-[#CCDB99]/80"
                          }`}
                        />
                      </div>
                      {/* Step Text */}
                      <span 
                        className={`font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.65rem,0.83vw,0.75rem)] uppercase tracking-[0.6px] leading-none transition-colors ${
                          step.active ? "text-[#2A3008] font-bold" : "text-[#808277]"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Content Area / Preview */}
            <div className="w-full md:w-[clamp(15rem,22.22vw,22rem)] bg-[#F3F4F1] h-full flex flex-col justify-between items-center p-[clamp(1.5rem,2.78vw,3rem)] pt-[clamp(2.5rem,4vw,5rem)] pb-[clamp(1.5rem,2.78vw,3rem)] shrink-0">
              
              {/* Floating Rotated Card Illustration */}
              <div 
                className="bg-white border border-[#C6C8BA]/20 shadow-[0px_4px_16px_rgba(0,0,0,0.06)] rounded-[clamp(1rem,1.67vw,1.8rem)] p-[clamp(1rem,1.3vw,1.5rem)] flex flex-col gap-[clamp(0.5rem,0.6vw,0.8rem)] w-[clamp(11rem,16.67vw,17rem)] h-[clamp(10rem,15.59vw,16rem)] transition-transform duration-300 hover:scale-[1.03] select-none"
                style={{ transform: "rotate(2deg)" }}
              >
                {/* Document Preview Image */}
                <div className="w-full aspect-[4/3] rounded-[clamp(0.5rem,0.83vw,1rem)] overflow-hidden shrink-0">
                  <img 
                    src="/super-admin/images/document_preview_mockup.png" 
                    alt="Document Mockup Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Skeleton Lines */}
                <div className="w-[60%] h-[clamp(0.35rem,0.5vw,0.6rem)] bg-[#EDEEEB] rounded-full mt-1" />
                <div className="w-[40%] h-[clamp(0.35rem,0.5vw,0.6rem)] bg-[#EDEEEB] rounded-full" />
              </div>

              {/* Text description */}
              <p 
                className="font-['Plus_Jakarta_Sans'] font-semibold text-[12px] leading-[16px] text-[#45483E] text-center tracking-[0.6px] my-[clamp(0.75rem,1vw,1.5rem)]"
                style={{ width: "212px" }}
              >
                Upload high-resolution scans of your land titles and documents in PDF format.
              </p>

              {/* Button */}
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  navigate("/super-admin/upload/land-details/GLCSOS-05");
                }}
                className="hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0px_4px_12px_rgba(42,48,8,0.2)] text-white font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.75rem,0.9vw,1.1rem)] w-[clamp(12rem,15.95vw,17rem)] h-[clamp(2.25rem,2.76vw,3.25rem)] rounded-[35px]"
                style={{
                  background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                }}
              >
                <span>Start Uploading Documents</span>
                <ArrowUpRight size={14} className="text-white shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSuperAdmin;
