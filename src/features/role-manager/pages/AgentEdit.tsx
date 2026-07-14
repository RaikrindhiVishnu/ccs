import { useLocation, useNavigate } from "react-router-dom";
import AgentForm from "./AgentForm";

export default function AgentEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const { initialData, roleType, from, isViewMode } = location.state || {};

  // Fallback to localStorage if state is empty
  const savedData = localStorage.getItem("agent-data");
  const parsedData = initialData || (savedData ? JSON.parse(savedData) : undefined);

  return (
    <AgentForm
      isEdit
      initialData={parsedData}
      roleType={roleType}
      isViewMode={isViewMode}
      from={from}
      onCancel={() => navigate(from || "/role-manager/create-roles")}
    />
  );
}