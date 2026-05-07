import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { FlowCard } from "./FlowCard";
import { FlowItem } from "./FlowItem";
import { FlowConnector } from "./FlowConnector";
import { MOCK_ROLE_DATA } from "../data/mockRoles";
import type { UserRole } from "../data/mockRoles";

export const RoleFlow: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFO, setSelectedFO] = useState<UserRole | null>(MOCK_ROLE_DATA[0]?.children?.[0] || null);
  const [searchFO, setSearchFO] = useState("");
  const [searchAgent, setSearchAgent] = useState("");

  const fieldOfficers = MOCK_ROLE_DATA[0].children || [];
  const filteredFOs = fieldOfficers.filter(fo => 
    fo.name.toLowerCase().includes(searchFO.toLowerCase()) || 
    fo.roleId.toLowerCase().includes(searchFO.toLowerCase())
  );

  const agents = selectedFO?.children || [];
  const filteredAgents = agents.filter(ag => 
    ag.name.toLowerCase().includes(searchAgent.toLowerCase()) || 
    ag.roleId.toLowerCase().includes(searchAgent.toLowerCase())
  );

  const selectedIndex = filteredFOs.findIndex(fo => fo.id === selectedFO?.id);
  const foCount = filteredFOs.length;

  const foOffset = foCount > 0 ? (selectedIndex + 0.5) / foCount : 0.5;

  return (
    <div className="flex flex-row items-start gap-0 w-full overflow-x-auto pb-6">
      {/* Level 1: RO & IO */}
      <div className="flex items-center w-1/3">
        <FlowCard>
          <div className="flex flex-col gap-4">
            {MOCK_ROLE_DATA.map((role, idx) => (
              <React.Fragment key={role.id}>
                <FlowItem 
                  {...role} 
                  variant="detailed" 
                  active={idx === 0}
                  onEdit={() => navigate("/role-manager/agent-edit")}
                  onView={() => navigate("/role-manager/profile")}
                />
                {idx < MOCK_ROLE_DATA.length - 1 && (
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
              wrapperClassName="border border-[var(--border-light)] rounded-full h-10 text-sm"
              variant="white"
            />
          }
        >
          <div className="flex flex-col gap-2 mt-2" >
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
              wrapperClassName="border border-[var(--border-light)] rounded-full h-10 text-sm"
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
