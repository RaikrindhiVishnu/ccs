import { useLocation } from "react-router-dom";
import AgentForm from "./AgentForm";

export default function AgentEdit() {
  const location = useLocation();

  const { initialData, roleType } = location.state || {};

  // Fallback to localStorage if state is empty
  const savedData = localStorage.getItem("agent-data");
  const parsedData = initialData || (savedData ? JSON.parse(savedData) : undefined);

  return (
    <AgentForm
      isEdit
      initialData={parsedData}
      roleType={roleType}
    />
  );
}