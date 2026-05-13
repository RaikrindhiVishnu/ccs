import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

import { FlowCard } from "./FlowCard";
import { FlowItem } from "./FlowItem";
import { FlowConnector } from "./FlowConnector";
import type { UserRole } from "../data/mockRoles";

interface RoleFlowProps {
  regionOfficerData?: any;
  fieldOfficerData?: any;
  agentData?: any;
}

export const RoleFlow: React.FC<RoleFlowProps> = ({
  regionOfficerData,
  fieldOfficerData,
  agentData,
}) => {
  const navigate = useNavigate();

  // 1. Map Region & Intelligence Officers
  const roAndIo = regionOfficerData?.data && !Array.isArray(regionOfficerData.data)
    ? [
      {
        id: String(regionOfficerData.data.regional_officer_id),
        name: `${regionOfficerData.data.regional_officer_first_name || ""} ${regionOfficerData.data.regional_officer_last_name || ""}`.trim(),
        role: "Regional Officer" as const,
        roleId: "RO",
        contact: regionOfficerData.data.regional_officer_phone,
        avatar: "https://i.pravatar.cc/150?u=ro",
      },
      {
        id: String(regionOfficerData.data.intelligence_officer_id),
        name: `${regionOfficerData.data.intelligence_officer_first_name || ""} ${regionOfficerData.data.intelligence_officer_last_name || ""}`.trim(),
        role: "Intelligence Officer" as const,
        roleId: "IO",
        contact: regionOfficerData.data.intelligence_officer_phone,
        avatar: "https://i.pravatar.cc/150?u=io",
      },
    ].filter(item => item.name) // Only show if they have a name
    : [];

  // 2. Map Field Officers
  const fieldOfficers = Array.isArray(fieldOfficerData?.data)
    ? fieldOfficerData.data.map((fo: any, index: number) => ({
      id: `${fo.id}-${index}`,
      name: `${fo.first_name || ""} ${fo.last_name || ""}`.trim(),
      role: "Field Officer" as const,
      roleId: `FO-${fo.role_id || "000"}`,
      contact: fo.phone,
      avatar: `https://i.pravatar.cc/150?u=fo${fo.id}`,
    }))
    : [];

  const [selectedFO, setSelectedFO] = useState<UserRole | null>(null);
  const [searchFO, setSearchFO] = useState("");
  const [searchAgent, setSearchAgent] = useState("");

  const filteredFOs = fieldOfficers.filter(
    (fo: any) =>
      fo.name.toLowerCase().includes(searchFO.toLowerCase()) ||
      fo.roleId.toLowerCase().includes(searchFO.toLowerCase()),
  );

  // 3. Map Agents
  const rawAgents = Array.isArray(agentData?.data)
    ? agentData.data.map((ag: any, index: number) => ({
      id: `${ag.id}-${index}`,
      name: `${ag.first_name || ""} ${ag.last_name || ""}`.trim(),
      role: "Agent" as const,
      roleId: `AG-${ag.role_id || "000"}`,
      contact: ag.phone,
      avatar: `https://i.pravatar.cc/150?u=ag${ag.id}`,
    }))
    : [];

  const filteredAgents = rawAgents.filter(
    (ag: any) =>
      ag.name.toLowerCase().includes(searchAgent.toLowerCase()) ||
      ag.roleId.toLowerCase().includes(searchAgent.toLowerCase()),
  );

  const selectedIndex = filteredFOs.findIndex((fo: any) => fo.id === selectedFO?.id);
  const actualIndex = selectedIndex !== -1 ? selectedIndex : 0;
  const foCount = filteredFOs.length;

  const foOffset = foCount > 0 ? (actualIndex + 0.5) / foCount : 0.5;

  return (
    <div className="flex flex-row items-start gap-0 w-full overflow-x-auto pb-6">
      {/* Level 1: RO & IO */}
      <div className="flex items-center w-1/3">
        <FlowCard>
          <div className="flex flex-col gap-4">
            {roAndIo.map((role, idx) => (
              <React.Fragment key={role.id}>
                <FlowItem
                  {...role}
                  variant="detailed"
                  active={idx === 0}
                  onEdit={() => navigate("/role-manager/agent-edit")}
                  onView={() => navigate("/role-manager/profile")}
                />
                {idx < roAndIo.length - 1 && (
                  <div className="h-px bg-gray-100 w-full" />
                )}
              </React.Fragment>
            ))}
          </div>
        </FlowCard>
        <FlowConnector type="branch" startOffset={0.5} />
      </div>

      {/* Level 2: Field Officers */}
      <div className="flex items-center w-1/3">
        <FlowCard
          header={
            <Input
              placeholder="Search Field Officer"
              value={searchFO}
              onChange={(e) => setSearchFO(e.target.value)}
              icon={<Search size={16} />}
              wrapperClassName="border border-[var(--border-subtle)] rounded-full h-10 text-sm"
              variant="white"
            />
          }
        >
          <div className="flex flex-col gap-2 mt-2">
            {filteredFOs.map((fo) => (
              <FlowItem
                key={fo.id}
                {...fo}
                active={selectedFO?.id === fo.id}
                onClick={() => setSelectedFO(fo)}
                onEdit={() => navigate("/role-manager/agent-edit")}
                onView={() => navigate("/role-manager/profile")}
              />
            ))}
          </div>
        </FlowCard>
        <FlowConnector type="branch" startOffset={foOffset} />
      </div>

      {/* Level 3: Agents */}
      <div className="flex items-center w-1/3">
        <FlowCard
          header={
            <Input
              placeholder="Search Agents"
              value={searchAgent}
              onChange={(e) => setSearchAgent(e.target.value)}
              icon={<Search size={16} />}
              wrapperClassName="border border-[var(--border-subtle)] rounded-full h-10 text-sm"
              variant="white"
            />
          }
        >
          <div className="flex flex-col gap-2 mt-2">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((ag) => (
                <FlowItem
                  key={ag.id}
                  {...ag}
                  onEdit={() => navigate("/role-manager/agent-edit")}
                  onView={() => navigate("/role-manager/profile")}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 opacity-40">
                <Typography variant="p" className="text-sm">
                  No agents found
                </Typography>
              </div>
            )}
          </div>
        </FlowCard>
      </div>
    </div>
  );
};
