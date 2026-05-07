import React from "react";
import { Typography } from "@/components/ui/typography";

const RegionAndArea: React.FC = () => {
  return (
    <div className="flex flex-col p-8 gap-6 min-h-full">
      <Typography variant="h1" className="text-3xl font-bold">
        Region and Area
      </Typography>
      <div className="p-6 bg-(--card) rounded-2xl shadow-sm border border-(--border)">
        <Typography variant="p" className="text-(--muted)">
          Manage and configure regions and operational areas here.
        </Typography>
      </div>
    </div>
  );
};

export default RegionAndArea;
