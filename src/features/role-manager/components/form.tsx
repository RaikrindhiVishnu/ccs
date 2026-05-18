import * as React from "react";
import { X } from "lucide-react";

import { useSendIssueMailMutation } from "@/features/auth/api/authApi";

interface RaiseIssueFormProps {
  agentEmail?: string;
  onClose?: () => void;
}

const issueOptions = [
  "Incorrect document",
  "Missing details",
  "Invalid bank info",
];

export const RaiseIssueForm = ({
  agentEmail,
  onClose,
}: RaiseIssueFormProps) => {
  const [selectedIssue, setSelectedIssue] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [toMail, setToMail] = React.useState(agentEmail || "");
const [subject, setSubject] = React.useState("");

  const [sendIssueMail, { isLoading }] =
    useSendIssueMailMutation();

  const handleSendMail = async () => {
    try {
      const payload = {
  to_mails: [toMail],

  Subject: subject,

  Body: `
    <h3>${selectedIssue}</h3>
    <p>${message}</p>
  `,

  cc_mails: [],
};
if (!toMail.trim()) {
  alert("Please enter recipient mail");
  return;
}

if (!subject.trim()) {
  alert("Please enter subject");
  return;
}

if (!selectedIssue) {
  alert("Please select issue");
  return;
}

if (!message.trim()) {
  alert("Please enter message");
  return;
}

      await sendIssueMail(payload).unwrap();



      alert("Mail sent successfully");

      onClose?.();
    } catch (error) {
      console.log("Mail Error:", error);
    }
  };

  return (
    <div
      className="
        w-full
        max-w-[620px]
        rounded-[28px]
        bg-[#F7F7F7]
        px-7
        py-6
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="
              text-[34px]
              leading-none
              font-bold
              text-[#202020]
            "
          >
            Raise Issue
          </h1>

          <p
            className="
              mt-2
              text-[15px]
              text-[#4F4F4F]
            "
          >
            Send a message to the agent regarding corrections
          </p>
        </div>

        <button onClick={onClose}>
          <X className="w-6 h-6 text-[#3D3D3D]" />
        </button>
      </div>

      {/* To */}
      <div className="mt-7">
        <label
          className="
            block
            text-[15px]
            text-[#3E3E3E]
            mb-2
            font-medium
          "
        >
          To
        </label>

        <input
  type="email"
  value={toMail}
  onChange={(e) => setToMail(e.target.value)}
  placeholder="Enter recipient mail"
  className="
    w-full
    h-[52px]
    rounded-[14px]
    border
    border-[#D8D8D8]
    bg-white
    px-5
    text-[15px]
    outline-none
  "
/>
      </div>

      {/* Subject */}
      <div className="mt-5">
        <label
          className="
            block
            text-[15px]
            text-[#3E3E3E]
            mb-2
            font-medium
          "
        >
          Subject
        </label>

        <input
  type="text"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  placeholder="Enter subject"
  className="
    w-full
    h-[52px]
    rounded-[14px]
    border
    border-[#D8D8D8]
    bg-white
    px-5
    text-[15px]
    outline-none
  "
/>
      </div>

      {/* Issues */}
      <div className="mt-5">
        <label
          className="
            block
            text-[15px]
            text-[#3E3E3E]
            mb-3
            font-medium
          "
        >
          Describe the issue
        </label>

        <div className="flex gap-3 flex-wrap">
          {issueOptions.map((issue) => (
            <button
              key={issue}
              onClick={() => setSelectedIssue(issue)}
              className={`
                px-5
                h-[38px]
                rounded-full
                border
                text-[14px]
                transition-all
                ${
                  selectedIssue === issue
                    ? "bg-[#3D7DCA] text-white border-[#3D7DCA]"
                    : "border-[#D3D3D3] text-[#4B4B4B] bg-white"
                }
              `}
            >
              {issue}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Mention what needs to be corrected or re-uploaded..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
            mt-4
            w-full
            h-[130px]
            rounded-[16px]
            border
            border-[#D8D8D8]
            bg-transparent
            px-5
            py-4
            text-[15px]
            outline-none
            resize-none
            placeholder:text-[#8A8A8A]
          "
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-5 mt-6">
        <button
          onClick={onClose}
          className="
            text-[16px]
            text-[#3F3F3F]
            font-medium
          "
        >
          Cancel
        </button>

        <button
          onClick={handleSendMail}
          disabled={isLoading}
          className="
            h-[48px]
            px-8
            rounded-full
            bg-[#3D7DCA]
            text-white
            text-[15px]
            font-medium
            shadow-[0px_8px_20px_rgba(61,125,202,0.35)]
            disabled:opacity-50
          "
        >
          {isLoading ? "Sending..." : "Send Mail"}
        </button>
      </div>
    </div>
  );
};

export default RaiseIssueForm;