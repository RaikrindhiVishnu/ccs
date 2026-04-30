import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import role from "@/assets/role profile.svg";
import SuccessIcon from "@/assets/sucess.svg";
import { ArrowLeft, User } from "lucide-react";

interface RoleManagerData {
  firstName: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
  role: string;
  profileImage?: string;
  notificationsEnabled?: boolean;
  smsEnabled?: boolean;
}

interface RoleManagerDetailsProps {
  data?: RoleManagerData;
  onBack?: () => void;
}

function Toggle({ defaultOn = true }: { defaultOn?: boolean }) {
  const [enabled, setEnabled] = useState(defaultOn);

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`
        relative
        w-[clamp(36px,2.8vw,48px)]
        h-[clamp(20px,1.5vw,26px)]
        rounded-full
        transition-colors
        duration-300
        shrink-0
        ${enabled ? "bg-[color:var(--toggle-active)]" : "bg-gray-300"}
      `}
    >
      <div
        className={`
          absolute
          top-[clamp(2px,0.2vw,3px)]
          w-[clamp(14px,1.1vw,20px)]
          h-[clamp(14px,1.1vw,20px)]
          rounded-full
          bg-white
          transition-all
          duration-300
          ${enabled ? "left-[clamp(18px,1.4vw,25px)]" : "left-[clamp(2px,0.2vw,3px)]"}
        `}
      />
    </button>
  );
}

interface FieldProps {
  label: string;
  value: string;
}

function Field({ label, value }: FieldProps) {
  return <Input variant="form" label={label} value={value} onChange={() => {}} />;
}

export default function RoleManagerDetails({ data, onBack }: RoleManagerDetailsProps) {
  const profile = data ?? {
    firstName: "Sravan",
    lastName: "Kumar",
    age: "32",
    phone: "+91 9342848293",
    email: "sravan@gmail.com",
    role: "Role Manager",
    notificationsEnabled: true,
    smsEnabled: true,
  };

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-[color:var(--background)]
        px-[clamp(20px,5vw,98px)]
        py-[clamp(20px,2vw,38px)]
      "
    >
      {/* Go Back */}
      <button
        type="button"
        onClick={onBack}
        className="
          flex items-center gap-2
          px-5 py-3
          mb-[clamp(24px,2.5vw,38px)]
          bg-[color:var(--card)]
          rounded-full
          shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
          text-[color:var(--text-neutral)]
          text-[clamp(12px,0.95vw,16px)]
          font-[family-name:var(--btn-font-secondary)]
          hover:opacity-80
          transition-opacity
        "
      >
        <ArrowLeft size={16} strokeWidth={1.4} />
        Go Back to Dashboard
      </button>

      {/* Main Wrapper */}
      <div
        className="
          w-full
          max-w-[1700px]
          mx-auto
          bg-[color:var(--card)]
          rounded-[clamp(28px,2.5vw,46px)]
          p-[clamp(20px,2vw,32px)]
          space-y-[clamp(18px,1.8vw,26px)]
        "
      >
        {/* ───────────── PROFILE CARD ───────────── */}
        <div
          className="
            overflow-hidden
            rounded-[clamp(16px,1.5vw,24px)]
            bg-[color:var(--card)]
            shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
          "
        >
          {/* Banner */}
          <div className="w-full h-[clamp(120px,11vw,170px)] overflow-hidden">
            <img src={role} alt="banner" className="w-full h-full object-cover" />
          </div>

          {/* Profile Section */}
          <div
            className="
              relative
              flex items-end justify-between
              px-[clamp(20px,2vw,32px)]
              pb-[clamp(16px,1.6vw,24px)]
              -mt-[clamp(40px,4vw,60px)]
            "
          >
            {/* Left */}
            <div className="flex items-end gap-[clamp(12px,1.2vw,20px)]">
              {/* Avatar */}
              <div
                className="
                  shrink-0
                  rounded-full
                  overflow-hidden
                  border-[clamp(2px,0.2vw,4px)]
                  border-[color:var(--card)]
                  bg-[color:var(--card)]
                  shadow-[0px_4px_10px_rgba(0,0,0,0.12)]
                  w-[clamp(100px,6vw,160px)]
                  h-[clamp(100px,6vw,160px)]
                  flex items-center justify-center
                "
              >
                {profile.profileImage ? (
                  <img src={profile.profileImage} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <User strokeWidth={1.5} className="w-[38%] h-[38%] text-[color:var(--muted)]" />
                )}
              </div>

              {/* Name */}
              <div className="pb-[clamp(4px,0.4vw,8px)]">
                <Typography
                  variant="h2"
                  className="
                    font-bold
                    leading-none
                    pt-[clamp(60px,3.5vw,84px)]
                    text-[color:var(--profile-text)]
                    text-[clamp(18px,1.3vw,24px)]
                  "
                >
                  {profile.firstName} {profile.lastName}
                </Typography>

                <p
                  className="
                    mt-[clamp(4px,0.4vw,8px)]
                    font-medium
                    text-[color:var(--profile-subtext)]
                    text-[clamp(11px,0.9vw,15px)]
                  "
                >
                  {profile.role}
                </p>
              </div>
            </div>

            {/* Badge */}
            <div className="pb-[clamp(4px,0.5vw,10px)] shrink-0">
              <img
                src={SuccessIcon}
                alt="success"
                className="
                  object-contain
                  w-[clamp(34px,3vw,52px)]
                  h-[clamp(34px,3vw,52px)]
                "
              />
            </div>
          </div>
        </div>

        {/* ───────────── PERSONAL DETAILS ───────────── */}
        <div
          className="
            bg-[color:var(--card)]
            rounded-[clamp(16px,1.5vw,24px)]
            shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
            px-[clamp(20px,2vw,30px)]
            py-[clamp(20px,2vw,28px)]
            space-y-[clamp(18px,1.6vw,28px)]
          "
        >
          <Typography
            variant="h3"
            className="
              font-semibold
              text-[clamp(18px,1.5vw,24px)]
              text-[color:var(--foreground)]
            "
          >
            Personal Details
          </Typography>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-3
              gap-x-[clamp(16px,1.8vw,24px)]
              gap-y-[clamp(16px,1.8vw,28px)]
            "
          >
            <Field label="First Name" value={profile.firstName} />
            <Field label="Last Name" value={profile.lastName} />
            <Field label="Age" value={profile.age} />
            <Field label="Phone Number" value={profile.phone} />
            <Field label="Email" value={profile.email} />
          </div>
        </div>

        {/* ───────────── ALERTS ───────────── */}
        <div
          className="
            bg-[color:var(--card)]
            rounded-[clamp(16px,1.5vw,24px)]
            shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
            px-[clamp(20px,2vw,30px)]
            py-[clamp(20px,2vw,28px)]
            space-y-[clamp(18px,1.6vw,28px)]
          "
        >
          <Typography
            variant="h3"
            className="
              font-semibold
              text-[clamp(18px,1.5vw,24px)]
              text-[color:var(--foreground)]
            "
          >
            Alerts
          </Typography>

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-[clamp(18px,2vw,40px)]
            "
          >
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-[clamp(2px,0.3vw,6px)]">
                <h4
                  className="
                    font-semibold
                    text-[clamp(14px,1vw,18px)]
                    text-[color:var(--foreground)]
                  "
                >
                  Notifications
                </h4>
                <p
                  className="
                    text-[clamp(11px,0.9vw,14px)]
                    text-[color:var(--muted)]
                  "
                >
                  Receive updates via Notifications
                </p>
              </div>
              <Toggle defaultOn={profile.notificationsEnabled} />
            </div>

            {/* SMS */}
            <div className="flex items-center justify-between">
              <div className="space-y-[clamp(2px,0.3vw,6px)]">
                <h4
                  className="
                    font-semibold
                    text-[clamp(14px,1vw,18px)]
                    text-[color:var(--foreground)]
                  "
                >
                  SMS Alerts
                </h4>
                <p
                  className="
                    text-[clamp(11px,0.9vw,14px)]
                    text-[color:var(--muted)]
                  "
                >
                  Get important alerts via SMS
                </p>
              </div>
              <Toggle defaultOn={profile.smsEnabled} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}