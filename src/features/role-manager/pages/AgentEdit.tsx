// src/features/agents/AgentEdit.tsx

import AgentForm from "./AgentForm";

export default function AgentEdit() {
  const savedData = localStorage.getItem("agent-data");

  const parsedData = savedData
    ? JSON.parse(savedData)
    : undefined;

  return (
    <AgentForm
      isEdit
      initialData={parsedData}
    />
  );
}