import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useGetAgentDetailsMutation } from "../api/userDirectoryApi";

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

  const handleView = (item: any, roleType: string) => {
    const userId = item.originalId || item.id;
    let path = "";
    if (roleType === "IO") path = "/role-manager/edit-intelligence-officer";
    else if (roleType === "RO") path = "/role-manager/edit-regional-officer";
    else if (roleType === "FO") path = "/role-manager/edit-field-officer";
    else if (roleType === "AG") path = "/role-manager/agent-edit";

    navigate(path, {
      state: {
        initialData: item,
        roleType,
        userId,
        from: "/role-manager/user-directory",
        isViewMode: true,
      },
    });
  };

  // ─────────────────────────────────────────────────────────────
  // RO & IO
  // ─────────────────────────────────────────────────────────────

  const roAndIo =
    regionOfficerData?.data &&
    !Array.isArray(regionOfficerData.data)
      ? [
          {
            id: String(regionOfficerData.data.regional_officer_id),
            originalId: regionOfficerData.data.regional_officer_id,
            first_name:
              regionOfficerData.data.regional_officer_first_name,
            last_name:
              regionOfficerData.data.regional_officer_last_name,
            phone: regionOfficerData.data.regional_officer_phone,
            name: `${
              regionOfficerData.data
                .regional_officer_first_name || ""
            } ${
              regionOfficerData.data
                .regional_officer_last_name || ""
            }`.trim(),
            role: "Regional Officer" as const,
            roleId: "RO",
            contact:
              regionOfficerData.data.regional_officer_phone,
            avatar:
              regionOfficerData.data.regional_officer_avatar ||
              regionOfficerData.data.avatar ||
              regionOfficerData.data.profile_image ||
              "",
          },
          {
            id: String(
              regionOfficerData.data.intelligence_officer_id
            ),
            originalId:
              regionOfficerData.data.intelligence_officer_id,
            first_name:
              regionOfficerData.data
                .intelligence_officer_first_name,
            last_name:
              regionOfficerData.data
                .intelligence_officer_last_name,
            phone:
              regionOfficerData.data
                .intelligence_officer_phone,
            name: `${
              regionOfficerData.data
                .intelligence_officer_first_name || ""
            } ${
              regionOfficerData.data
                .intelligence_officer_last_name || ""
            }`.trim(),
            role: "Intelligence Officer" as const,
            roleId: "IO",
            contact:
              regionOfficerData.data
                .intelligence_officer_phone,
            avatar:
              regionOfficerData.data.intelligence_officer_avatar ||
              regionOfficerData.data.avatar ||
              regionOfficerData.data.profile_image ||
              "",
          },
        ].filter((item) => item.name)
      : [];

  // ─────────────────────────────────────────────────────────────
  // FIELD OFFICERS
  // ─────────────────────────────────────────────────────────────

  const fieldOfficers = Array.isArray(fieldOfficerData?.data)
    ? fieldOfficerData.data.map(
        (fo: any, index: number) => ({
          ...fo,
          id: `${fo.id}-${index}`,
          originalId: fo.id,
          name: `${fo.first_name || ""} ${
            fo.last_name || ""
          }`.trim(),
          role: "Field Officer" as const,
          roleId: `FO-${fo.role_id || "000"}`,
          contact: fo.phone,
          avatar: fo.avatar || fo.profile_image || fo.image || "",
        })
      )
    : [];

  const [selectedFO, setSelectedFO] =
    useState<UserRole | null>(null);

  const [searchFO, setSearchFO] = useState("");
  const [searchAgent, setSearchAgent] = useState("");

  const [getAgentDetails] =
    useGetAgentDetailsMutation();

  const [localAgents, setLocalAgents] = useState<any[]>(
    []
  );

  const [
    selectedFieldOfficerIndex,
    setSelectedFieldOfficerIndex,
  ] = useState(0);

  const handleFieldOfficerClick = async (
    officer: any,
    index: number
  ) => {
    setSelectedFO(officer);
    setSelectedFieldOfficerIndex(index);

    try {
      const targetId = officer.role_id;

      const response = await getAgentDetails(
        targetId
      ).unwrap();

      setLocalAgents(response?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredFOs = fieldOfficers.filter(
    (fo: any) =>
      fo.name
        .toLowerCase()
        .includes(searchFO.toLowerCase()) ||
      fo.roleId
        .toLowerCase()
        .includes(searchFO.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────
  // AGENTS
  // ─────────────────────────────────────────────────────────────

  const agentsToMap = selectedFO
    ? localAgents
    : agentData?.data || [];

  const rawAgents = Array.isArray(agentsToMap)
    ? agentsToMap.map(
        (ag: any, index: number) => ({
          ...ag,
          id: `${ag.id}-${index}`,
          originalId: ag.id,
          name: `${ag.first_name || ""} ${
            ag.last_name || ""
          }`.trim(),
          role: "Agent" as const,
          roleId: `AG-${ag.role_id || "000"}`,
          contact: ag.phone,
          avatar: ag.avatar || ag.profile_image || ag.image || "",
        })
      )
    : [];

  const filteredAgents = rawAgents.filter(
    (ag: any) =>
      ag.name
        .toLowerCase()
        .includes(searchAgent.toLowerCase()) ||
      ag.roleId
        .toLowerCase()
        .includes(searchAgent.toLowerCase())
  );

  const actualIndex = selectedFieldOfficerIndex;

  const foCount = filteredFOs.length;

  const foOffset =
    foCount > 0
      ? (actualIndex + 0.5) / foCount
      : 0.5;

  return (
    <div className="flex flex-row items-start gap-0 w-full overflow-x-auto pb-6">
      {/* ───────────────────────── RO & IO ───────────────────────── */}

      <div className="flex items-center w-1/3">
        <FlowCard>
          <div className="flex flex-col gap-4">
            {roAndIo.map((role, idx) => (
              <React.Fragment key={role.id}>
                <FlowItem
                  {...role}
                  variant="detailed"
                  active={idx === 0}
                  onEdit={() =>
                    navigate(
                      role.roleId === "IO"
                        ? "/role-manager/edit-intelligence-officer"
                        : "/role-manager/edit-regional-officer",
                      {
                        state: {
                          initialData: role,
                          roleType: role.roleId,
                          userId: role.originalId,
                          from: "/role-manager/user-directory",
                          isViewMode: false,
                        },
                      }
                    )
                  }
                  onView={() =>
                    handleView(
                      role,
                      role.roleId === "IO"
                        ? "IO"
                        : "RO"
                    )
                  }
                />

                {idx < roAndIo.length - 1 && (
                  <div className="h-px bg-gray-100 w-full" />
                )}
              </React.Fragment>
            ))}
          </div>
        </FlowCard>

        <FlowConnector
          type="branch"
          startOffset={0.5}
        />
      </div>

      {/* ───────────────────── FIELD OFFICERS ───────────────────── */}

      <div className="flex items-center w-1/3">
        <FlowCard
          header={
            <Input
              placeholder="Search Field Officer"
              value={searchFO}
              onChange={(e) =>
                setSearchFO(e.target.value)
              }
              icon={<Search size={16} />}
              wrapperClassName="border border-[var(--border-subtle)] rounded-full h-10 text-sm"
              variant="white"
            />
          }
        >
          <div className="flex flex-col gap-2 mt-2">
            {filteredFOs.map((fo, index) => (
              <FlowItem
                key={fo.id}
                {...fo}
                active={
                  selectedFieldOfficerIndex === index
                }
                onClick={() =>
                  handleFieldOfficerClick(fo, index)
                }
                onEdit={() =>
                  navigate(
                    "/role-manager/edit-field-officer",
                    {
                      state: {
                        initialData: fo,
                        roleType: "FO",
                        userId: fo.originalId,
                        from: "/role-manager/user-directory",
                        isViewMode: false,
                      },
                    }
                  )
                }
                onView={() =>
                  handleView(fo, "FO")
                }
              />
            ))}
          </div>
        </FlowCard>

        <FlowConnector
          type="branch"
          startOffset={foOffset}
        />
      </div>

      {/* ───────────────────────── AGENTS ───────────────────────── */}

      <div className="flex items-center w-1/3">
        <FlowCard
          header={
            <Input
              placeholder="Search Agents"
              value={searchAgent}
              onChange={(e) =>
                setSearchAgent(e.target.value)
              }
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
                  onEdit={() =>
                    navigate(
                      "/role-manager/agent-edit",
                      {
                        state: {
                          initialData: ag,
                          roleType: "AG",
                          userId: ag.originalId,
                          from: "/role-manager/user-directory",
                          isViewMode: false,
                        },
                      }
                    )
                  }
                  onView={() =>
                    handleView(ag, "AG")
                  }
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 opacity-40">
                <Typography
                  variant="p"
                  className="text-sm"
                >
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