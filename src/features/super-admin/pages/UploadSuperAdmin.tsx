import React, { useState, useRef } from "react";
import SuperAdminHeader from "@/features/super-admin/components/SuperAdminHeader";
import VisitorSalesCard from "@/features/super-admin/components/VisitorSalesCard";
import FarmlandStatsCard from "@/features/super-admin/components/FarmlandStatsCard";
import { mockDashboardData } from "@/features/super-admin/data/mockDashboardData";
import { 
  CloudUpload, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Trash2, 
  Play, 
  Clock, 
  Database,
  Layers
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
    {
      id: "3",
      name: "farmlands_valuation_v3.xlsx",
      size: "12.8 MB",
      progress: 60,
      status: "uploading",
      type: "Farmlands Data",
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
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 5 } : f))
    );

    let progressVal = 5;
    const interval = setInterval(() => {
      progressVal += Math.floor(Math.random() * 20) + 10;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "completed" } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: progressVal } : f))
        );
      }
    }, 400);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">
      {/* Header Section */}
      <div className="shrink-0">
        <SuperAdminHeader
          title="SUPER ADMIN"
          breadcrumb="Assigned Farmlands"
          subtitle="Next-generation platform infrastructure for scaling sustainable estates."
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

     
    </div>
  );
};

export default UploadSuperAdmin;
