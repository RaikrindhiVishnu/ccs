import React from "react";
import { Typography } from "@/components/ui/typography";
import { Search, UserPlus, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserDirectory: React.FC = () => {
  // Mock data for demonstration


  return (
    <div className="flex flex-col p-[clamp(12px,1.5vw,24px)] gap-[clamp(12px,1.5vw,24px)] box-border min-h-full">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between">
        <div>
          <Typography variant="h2" className="text-3xl font-semibold tracking-tight text-[var(--text-dark)]">
            User Directory
          </Typography>
          <Typography variant="p" className="text-sm text-[var(--muted)] opacity-80 mt-1">
            Manage and monitor all users within your jurisdiction.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
