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
        max-w-[min(90vw,560px)]
        rounded-[clamp(12px,1.5vw,20px)]
        bg-[#F8FAFC]
        border border-slate-200/60
        p-[clamp(14px,2vw,22px)]
        shadow-2xl
        box-border
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="
              text-[clamp(1.25rem,1.8vw,1.625rem)]
              leading-none
              font-bold
              text-[#202020]
              tracking-tight
            "
          >
            Raise Issue
          </h1>

          <p
            className="
              mt-1.5
              text-[clamp(0.75rem,0.95vw,0.8125rem)]
              text-[#5C5C5C]
            "
          >
            Send a message to the agent regarding corrections
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-slate-200/60 transition-colors"
        >
          <X className="w-5 h-5 text-[#3D3D3D]" />
        </button>
      </div>

      {/* To */}
      <div className="mt-3.5">
        <label
          className="
            block
            text-[clamp(0.75rem,0.95vw,0.8125rem)]
            text-[#3E3E3E]
            mb-1.5
            font-semibold
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
            h-[clamp(36px,3vw,42px)]
            rounded-[clamp(8px,0.8vw,12px)]
            border
            border-[#D8D8D8]
            bg-white
            px-4
            text-[clamp(0.75rem,1vw,0.875rem)]
            outline-none
            focus:border-[#3D7DCA]
            focus:ring-1
            focus:ring-[#3D7DCA]/40
            transition-all
          "
        />
      </div>

      {/* Subject */}
      <div className="mt-2.5">
        <label
          className="
            block
            text-[clamp(0.75rem,0.95vw,0.8125rem)]
            text-[#3E3E3E]
            mb-1.5
            font-semibold
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
            h-[clamp(36px,3vw,42px)]
            rounded-[clamp(8px,0.8vw,12px)]
            border
            border-[#D8D8D8]
            bg-white
            px-4
            text-[clamp(0.75rem,1vw,0.875rem)]
            outline-none
            focus:border-[#3D7DCA]
            focus:ring-1
            focus:ring-[#3D7DCA]/40
            transition-all
          "
        />
      </div>

      {/* Issues */}
      <div className="mt-2.5">
        <label
          className="
            block
            text-[clamp(0.75rem,0.95vw,0.8125rem)]
            text-[#3E3E3E]
            mb-2
            font-semibold
          "
        >
          Describe the issue
        </label>

        <div className="flex gap-2 flex-wrap">
          {issueOptions.map((issue) => (
            <button
              key={issue}
              onClick={() => setSelectedIssue(issue)}
              className={`
                px-4
                h-[clamp(28px,2.2vw,32px)]
                rounded-full
                border
                text-[clamp(0.7rem,0.85vw,0.75rem)]
                font-medium
                transition-all
                ${selectedIssue === issue
                  ? "bg-[#3D7DCA] text-white border-[#3D7DCA] shadow-md shadow-[#3D7DCA]/20"
                  : "border-[#D3D3D3] text-[#4B4B4B] bg-white hover:bg-slate-50 hover:border-slate-400"
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
            mt-2.5
            w-full
            h-[clamp(75px,8vw,90px)]
            rounded-[clamp(10px,1vw,14px)]
            border
            border-[#D8D8D8]
            bg-white
            px-4
            py-3
            text-[clamp(0.75rem,1vw,0.875rem)]
            outline-none
            resize-none
            placeholder:text-[#8A8A8A]
            focus:border-[#3D7DCA]
            focus:ring-1
            focus:ring-[#3D7DCA]/40
            transition-all
          "
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-[clamp(10px,1.2vw,16px)] mt-4">
        <button
          onClick={onClose}
          className="
            text-[clamp(0.75rem,1vw,0.875rem)]
            text-[#3F3F3F]
            font-bold
            hover:text-slate-800
            transition-colors
          "
        >
          Cancel
        </button>

        <button
          onClick={handleSendMail}
          disabled={isLoading}
          className="
            h-[clamp(34px,2.8vw,40px)]
            px-[clamp(18px,1.8vw,26px)]
            rounded-full
            bg-[linear-gradient(110.22deg,#2680C4_0%,#4A7BBB_100%)]
            text-white
            text-[clamp(0.75rem,1vw,0.875rem)]
            font-bold
            shadow-[0px_6px_15px_rgba(38,128,196,0.25)]
            hover:opacity-95
            active:scale-[0.98]
            transition-all
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