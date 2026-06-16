import React, { useState, useRef, useEffect } from "react";
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

      {/* ── Reused Drag & Drop File Upload Modal ── */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[1rem]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0F1011]/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsUploadModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-[#191B1C] border border-[#2D3032] rounded-[clamp(1.25rem,2.5vw,2rem)] w-full max-w-[clamp(45rem,75vw,68rem)] max-h-[90vh] overflow-y-auto z-10 shadow-2xl p-[clamp(1.25rem,2.5vw,2rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)] text-white animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-[1rem]">
              <div className="flex items-center gap-[0.625rem]">
                <CloudUpload className="text-[var(--brand-500)]" size={24} />
                <div>
                  <h3 className="font-bold text-[clamp(1rem,1.8vw,2.25rem)] text-white">Upload Documents & Mappings</h3>
                  <p className="text-[clamp(0.65rem,1.1vw,1.35rem)] text-gray-400">Import structured farm data into the secure server.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-400 hover:text-white p-[0.375rem] rounded-lg hover:bg-white/10 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-row flex-wrap gap-[clamp(1rem,2vw,1.5rem)] w-full">
              {/* Left Column - Configuration & Drag/Drop */}
              <div className="bg-[#212325] rounded-[clamp(1rem,2vw,1.5rem)] border border-white/5 p-[clamp(1rem,2vw,1.5rem)] flex-1 min-w-[clamp(18rem,45%,32rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
                <div>
                  <Typography variant="h3" className="text-[clamp(0.875rem,1.4vw,1.75rem)] font-bold text-white mb-[0.25rem]">
                    File Configuration
                  </Typography>
                  <Typography variant="p" className="text-[clamp(0.65rem,1.1vw,1.35rem)] text-gray-400">
                    Select dataset classification category before uploading.
                  </Typography>
                </div>

                {/* Categories Selector */}
                <div className="flex flex-col gap-[0.75rem]">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-start gap-[1rem] p-[1rem] rounded-[1rem] border text-left transition-all ${
                          isSelected
                            ? "border-[var(--brand-500)] bg-[var(--brand-500)]/10"
                            : "border-white/5 bg-transparent hover:bg-white/5"
                        }`}
                      >
                        <div className={`p-[0.5rem] rounded-[0.75rem] shrink-0 ${isSelected ? "bg-[var(--brand-500)] text-white" : "bg-white/5 text-gray-400"}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <span className="block font-semibold text-[clamp(0.75rem,1.1vw,1.35rem)] text-white">{cat.label}</span>
                          <span className="block text-[clamp(0.625rem,0.9vw,1.15rem)] text-gray-400 mt-0.5">{cat.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Drag & Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={onButtonClick}
                  className={`border-2 border-dashed rounded-[1.25rem] p-[1.5rem] flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-[var(--brand-500)] bg-[var(--brand-500)]/10 scale-[0.99]"
                      : "border-white/10 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="w-[3rem] h-[3rem] bg-white/5 rounded-full flex items-center justify-center text-[var(--brand-500)] mb-[0.75rem]">
                    <CloudUpload size={24} className="animate-bounce" />
                  </div>
                  <Typography variant="h4" className="text-[clamp(0.875rem,1.3vw,1.6rem)] font-semibold text-white mb-[0.25rem]">
                    Drag & Drop your file here
                  </Typography>
                  <Typography variant="p" className="text-[clamp(0.625rem,0.9vw,1.15rem)] text-gray-400 mb-[0.75rem]">
                    Supports CSV, JSON, GeoJSON, XLSX up to 50MB
                  </Typography>
                  <button
                    type="button"
                    className="px-[1rem] h-[2.25rem] rounded-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white font-medium text-[clamp(0.75rem,1.1vw,1.35rem)] transition-colors shadow-sm"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Right Column - Live Monitor / Upload Status */}
              <div className="bg-[#212325] rounded-[clamp(1rem,2vw,1.5rem)] border border-white/5 p-[clamp(1rem,2vw,1.5rem)] flex-1 min-w-[clamp(18rem,45%,32rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h3" className="text-[clamp(0.875rem,1.4vw,1.75rem)] font-bold text-white mb-[0.25rem]">
                      Active Upload Monitor
                    </Typography>
                    <Typography variant="p" className="text-[clamp(0.65rem,1.1vw,1.35rem)] text-gray-400">
                      Track live integration progress and validation results.
                    </Typography>
                  </div>
                  <span className="px-[0.625rem] py-[0.125rem] rounded-full bg-white/5 text-[clamp(0.625rem,0.9vw,1.15rem)] font-semibold text-gray-300 flex items-center gap-[0.375rem]">
                    <Clock size={10} />
                    {files.filter(f => f.status === "uploading").length} active
                  </span>
                </div>

                {/* Files List */}
                <div className="flex flex-col gap-[0.75rem] overflow-y-auto max-h-[23.75rem] pr-[0.25rem]">
                  {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-[4rem] text-center">
                      <FileSpreadsheet size={40} className="text-white/20 mb-[0.5rem]" />
                      <Typography variant="p" className="text-[clamp(0.75rem,1.1vw,1.35rem)] text-gray-400">
                        No uploads tracked in this session yet.
                      </Typography>
                    </div>
                  ) : (
                    files.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-col gap-[0.5rem] p-[0.75rem] rounded-[0.75rem] border border-white/5 bg-[#191B1C] hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-[0.75rem]">
                          <div className="flex items-center gap-[0.5rem] min-w-0">
                            <div className="p-[0.5rem] rounded-lg bg-white/5 text-gray-400 shrink-0">
                              {file.name.endsWith(".geojson") ? <Layers size={16} /> : <FileSpreadsheet size={16} />}
                            </div>
                            <div className="min-w-0">
                              <span className="block font-semibold text-[clamp(0.75rem,1.1vw,1.35rem)] text-white truncate">
                                {file.name}
                              </span>
                              <div className="flex items-center gap-[0.375rem] mt-0.5">
                                <span className="text-[clamp(0.625rem,0.9vw,1.15rem)] text-gray-400">{file.size}</span>
                                <span className="text-[clamp(0.5rem,0.7vw,0.95rem)] px-[0.375rem] py-[0.125rem] rounded-full bg-white/5 text-gray-300">
                                  {file.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons & status indicator */}
                          <div className="flex items-center gap-[0.5rem] shrink-0">
                            {file.status === "completed" && (
                              <span className="flex items-center gap-[0.25rem] text-[clamp(0.625rem,0.9vw,1.15rem)] font-semibold text-[#8B9A46]">
                                <CheckCircle size={12} />
                                Ready
                              </span>
                            )}
                            {file.status === "failed" && (
                              <span className="flex items-center gap-[0.25rem] text-[clamp(0.625rem,0.9vw,1.15rem)] font-semibold text-red-400">
                                <XCircle size={12} />
                                Failed
                              </span>
                            )}
                            {file.status === "uploading" && (
                              <span className="flex items-center gap-[0.25rem] text-[clamp(0.625rem,0.9vw,1.15rem)] font-semibold text-[var(--brand-500)] animate-pulse">
                                <Play size={10} className="animate-spin" />
                                Uploading {file.progress}%
                              </span>
                            )}
                            {file.status === "pending" && (
                              <span className="flex items-center gap-[0.25rem] text-[clamp(0.625rem,0.9vw,1.15rem)] font-semibold text-yellow-500">
                                <Clock size={10} />
                                Queued
                              </span>
                            )}

                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-gray-400 hover:text-red-400 p-[0.25rem] rounded hover:bg-white/5 transition-colors"
                              title="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        {file.status === "uploading" && (
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div
                              className="bg-[var(--brand-500)] h-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-[0.75rem] border-t border-white/10 pt-[1rem] mt-[0.5rem]">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-[1.25rem] h-[2.5rem] rounded-full border border-white/10 hover:bg-white/5 text-white font-medium text-[clamp(0.75rem,1.1vw,1.35rem)] transition-all"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSuperAdmin;
