import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useLazyGetAgentDetailsQuery } from "../api/userDirectoryApi";

import { FlowCard } from "./FlowCard";
import { FlowItem } from "./FlowItem";
import { FlowConnector } from "./FlowConnector";

interface RoleFlowProps {
  regionOfficerData?: any;
  fieldOfficerData?: any;
  agentData?: any;
  stateId: string;
  regionId: string;
}

export const RoleFlow: React.FC<RoleFlowProps> = ({
  regionOfficerData,
  fieldOfficerData,
  agentData,
  stateId,
  regionId,
}) => {
  const navigate = useNavigate();

  const handleView = (item: any, roleType: string) => {
    const userId = item.originalId || item.id;
    let path = "";
    if (roleType === "IO") path = "/role-manager/edit-intelligence-officer";
    else if (roleType === "RO") path = `/role-manager/edit-regional-officer/${userId}`;
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
          name: `${regionOfficerData.data
            .regional_officer_first_name || ""
            } ${regionOfficerData.data
              .regional_officer_last_name || ""
            }`.trim(),
          email: regionOfficerData.data.regional_officer_email,
          state: regionOfficerData.data.state_id,
          region: regionOfficerData.data.region_name || regionOfficerData.data.region_id,
          role: "Regional Officer" as const,
          roleId: regionOfficerData.data.regional_officer_user_code ||
            (typeof regionOfficerData.data.regional_officer_role_id === "string" && regionOfficerData.data.regional_officer_role_id.includes("RO-")
              ? regionOfficerData.data.regional_officer_role_id
              : `RO-${regionOfficerData.data.regional_officer_role_id || regionOfficerData.data.regional_officer_id || "-"}`),
          contact:
            regionOfficerData.data.regional_officer_phone,
          avatar: regionOfficerData.data.regional_officer_profile_url || "",
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
          name: `${regionOfficerData.data
            .intelligence_officer_first_name || ""
            } ${regionOfficerData.data
              .intelligence_officer_last_name || ""
            }`.trim(),
          role: "Intelligence Officer" as const,
          roleId: regionOfficerData.data.intelligence_officer_user_code ||
            (typeof regionOfficerData.data.intelligence_officer_role_id === "string" && regionOfficerData.data.intelligence_officer_role_id.includes("IO-")
              ? regionOfficerData.data.intelligence_officer_role_id
              : `IO-${regionOfficerData.data.intelligence_officer_role_id || regionOfficerData.data.intelligence_officer_id || "-"}`),
          contact:
            regionOfficerData.data
              .intelligence_officer_phone,
          avatar: regionOfficerData.data.intelligence_officer_profile_url || "",
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
        name: `${fo.first_name || ""} ${fo.last_name || ""
          }`.trim(),
        role: "Field Officer" as const,
        roleId: fo.field_officer_user_code || fo.feild_officer_user_code || fo.user_code || fo.userCode || (fo.role_id ? String(fo.role_id) : "-"),
        contact: fo.phone,
        avatar: fo.profile_url || "",
      })
    )
    : [];

  const [selectedFO, setSelectedFO] =
    useState<any | null>(null);

  const [searchFO, setSearchFO] = useState("");
  const [searchAgent, setSearchAgent] = useState("");

  const [getAgentDetails] =
    useLazyGetAgentDetailsQuery();

  const [localAgents, setLocalAgents] = useState<any[]>(
    []
  );

  const [
    selectedFieldOfficerIndex,
    setSelectedFieldOfficerIndex,
  ] = useState(0);

  useEffect(() => {
    setSelectedFO(null);
    setSelectedFieldOfficerIndex(0);
    setLocalAgents([]);
  }, [stateId, regionId]);

  const handleFieldOfficerClick = async (
    officer: any,
    index: number
  ) => {
    setSelectedFO(officer);
    setSelectedFieldOfficerIndex(index);

    try {
      const targetId = officer.originalId || officer.id;

      const response = await getAgentDetails({
        area_id: officer.area_id || 0,
      }).unwrap();

      setLocalAgents(response?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredFOs = fieldOfficers.filter(
    (fo: any) =>
      String(fo.name || "")
        .toLowerCase()
        .includes(searchFO.toLowerCase()) ||
      String(fo.roleId || "")
        .toLowerCase()
        .includes(searchFO.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────
  // AGENTS
  // ─────────────────────────────────────────────────────────────

  const agentsToMap =
    fieldOfficers.length === 0
      ? []
      : selectedFO
        ? localAgents
        : agentData?.data || [];

  const rawAgents = Array.isArray(agentsToMap)
    ? agentsToMap.map(
      (ag: any, index: number) => ({
        ...ag,
        id: `${ag.id}-${index}`,
        originalId: ag.id,
        name: `${ag.first_name || ""} ${ag.last_name || ""
          }`.trim(),
        role: "Agent" as const,
        roleId: ag.agent_user_code || ag.user_code || ag.userCode || (ag.role_id ? String(ag.role_id) : "-"),
        contact: ag.phone,
        avatar: ag.profile_url || "",
      })
    )
    : [];

  const filteredAgents = rawAgents.filter(
    (ag: any) =>
      String(ag.name || "")
        .toLowerCase()
        .includes(searchAgent.toLowerCase()) ||
      String(ag.roleId || "")
        .toLowerCase()
        .includes(searchAgent.toLowerCase())
  );

  const foOffset = selectedFieldOfficerIndex / 3;

  return (
    <div className="w-full overflow-hidden">
      <div
        className="
          w-full
          flex items-stretch
          px-3
        "
      >
        {/* ───────────────────────── RO & IO ───────────────────────── */}

        <div className="flex flex-col flex-1 min-w-0">
          <FlowCard className="flex-1">
            <div className="flex flex-col gap-6">
              {roAndIo.length > 0 ? (
                roAndIo.map((role, idx) => (
                  <React.Fragment key={role.id}>
                    <FlowItem
                      {...role}
                      variant="detailed"
                      active={idx === 0}
                      onEdit={() =>
                        navigate(
                          role.role === "Intelligence Officer"
                            ? "/role-manager/edit-intelligence-officer"
                            : `/role-manager/edit-regional-officer/${role.originalId}`,
                          {
                            state: {
                              initialData: role,
                              roleType: role.role === "Intelligence Officer" ? "IO" : "RO",
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
                          role.role === "Intelligence Officer"
                            ? "IO"
                            : "RO"
                        )
                      }
                    />

                    {idx < roAndIo.length - 1 && (
                      <div className="h-px bg-[#E7EAEA] w-full mx-auto" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-start pt-[134px] h-[280px] opacity-40">
                  <Typography
                    variant="p"
                    className="text-sm"
                  >
                    No data available
                  </Typography>
                </div>
              )}
            </div>
          </FlowCard>
        </div>

        <FlowConnector
          type="branch"
          startOffset={0.5}
        />

        {/* ───────────────────── FIELD OFFICERS ───────────────────── */}

        <div className="flex flex-col flex-1 min-w-0">
          <FlowCard
            className="flex-1"
            header={
              <Input
                placeholder="Search Field Officer"
                value={searchFO}
                onChange={(e) =>
                  setSearchFO(e.target.value)
                }
                icon={<Search size={16} />}
                wrapperClassName="border border-[var(--border-subtle)] rounded-full h-10 min-[1920px]:h-14 min-[2560px]:h-16 text-sm"
                variant="white"
              />
            }
          >
            <div className="flex flex-col gap-2 mt-2">
              {filteredFOs.length > 0 ? (
                filteredFOs.slice(0, 4).map((fo: any, index: number) => (
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-start pt-[78px] h-[240px] opacity-40">
                  <Typography
                    variant="p"
                    className="text-sm"
                  >
                    No data available
                  </Typography>
                </div>
              )}
            </div>
          </FlowCard>
        </div>

        <FlowConnector
          type="branch"
          startOffset={foOffset}
        />

        {/* ───────────────────────── AGENTS ───────────────────────── */}

        <div className="flex flex-col flex-1 min-w-0">
          <FlowCard
            className="flex-1"
            header={
              <Input
                placeholder="Search Agents"
                value={searchAgent}
                onChange={(e) =>
                  setSearchAgent(e.target.value)
                }
                icon={<Search size={16} />}
                wrapperClassName="border border-[var(--border-subtle)] rounded-full h-10 min-[1920px]:h-14 min-[2560px]:h-16 text-sm"
                variant="white"
              />
            }
          >
            <div className="flex flex-col gap-2 mt-2">
              {filteredAgents.length > 0 ? (
                filteredAgents.slice(0, 4).map((ag) => (
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
                <div className="flex flex-col items-center justify-start pt-[78px] h-[240px] opacity-40">
                  <Typography
                    variant="p"
                    className="text-sm"
                  >
                    No data available
                  </Typography>
                </div>
              )}
            </div>
          </FlowCard>
        </div>
      </div>
    </div>
  );
};