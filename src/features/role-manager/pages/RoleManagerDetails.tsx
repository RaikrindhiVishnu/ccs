import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import role from "@/assets/role profile.svg";
import SuccessIcon from "@/assets/sucess.svg";
import { ArrowLeft, User, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/core/hooks";

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
        w-[clamp(2.25rem,2.8vw,3rem)]
        h-[clamp(1.25rem,1.5vw,1.625rem)]
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
          top-[clamp(0.125rem,0.2vw,0.1875rem)]
          w-[clamp(0.875rem,1.1vw,1.25rem)]
          h-[clamp(0.875rem,1.1vw,1.25rem)]
          rounded-full
          bg-white
          transition-all
          duration-300
          ${enabled
            ? "left-[clamp(1.125rem,1.4vw,1.5625rem)]"
            : "left-[clamp(0.125rem,0.2vw,0.1875rem)]"
          }
        `}
      />
    </button>
  );
}

export default function RoleManagerDetails({
  data: _data,
  onBack,
}: RoleManagerDetailsProps) {
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.auth.user);

  const profile = currentUser
    ? {
        firstName: currentUser.first_name || "",
        lastName: currentUser.last_name || "",
        age:
          (currentUser as any).dob ||
          (currentUser as any).date_of_birth ||
          (currentUser as any).age ||
          "",
        phone:
          (currentUser as any).phone_number ||
          (currentUser as any).phone ||
          "",
        email:
          currentUser.login_id ||
          (currentUser as any).email ||
          "",
        role: currentUser.role || "Role Manager",
        profileImage: (currentUser as any).profile_url || undefined,
        notificationsEnabled: true,
        smsEnabled: true,
      }
    : {
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
        email: "",
        role: "Role Manager",
        notificationsEnabled: true,
        smsEnabled: true,
      };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-[color:var(--surface-page)]
        px-[clamp(1.25rem,5vw,6.125rem)]
        py-[clamp(1.25rem,2vw,2.375rem)]
      "
    >
      {/* Go Back */}
      <button
        type="button"
        onClick={handleBack}
        className="
          flex items-center gap-2
          px-5 py-3
          mb-[clamp(1.5rem,2.5vw,2.375rem)]
          bg-[color:var(--surface-card)]
          rounded-full
          shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
          text-[color:var(--text-secondary)]
          text-[clamp(0.75rem,0.95vw,1rem)]
          font-[family-name:var(--font-inter)]
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
          max-w-[106.25rem]
          mx-auto
          bg-[color:var(--surface-card)]
          rounded-[clamp(1.75rem,2.5vw,2.875rem)]
          p-[clamp(1.25rem,2vw,2rem)]
          space-y-[clamp(1.125rem,1.8vw,1.625rem)]
        "
      >
        {/* ───────────── PROFILE CARD ───────────── */}
        <div
          className="
            overflow-hidden
            rounded-[clamp(1rem,1.5vw,1.5rem)]
            bg-[color:var(--surface-card)]
            shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
          "
          // rounded: 16px→1rem, 24px→1.5rem
        >
          {/* Banner */}
          <div className="w-full h-[clamp(7.5rem,11vw,10.625rem)] overflow-hidden">
            {/* h: 120px→7.5rem, 170px→10.625rem */}
            <img
              src={role}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Section */}
          <div
            className="
              relative
              flex items-end justify-between
              px-[clamp(1.25rem,2vw,2rem)]
              pb-[clamp(1rem,1.6vw,1.5rem)]
              -mt-[clamp(2.5rem,4vw,3.75rem)]
            "
          >
            {/* Left */}
            <div className="flex items-end gap-[clamp(0.75rem,1.2vw,1.25rem)]">
              {/* gap: 12px→0.75rem, 20px→1.25rem */}

              {/* Avatar */}
              <div
                className="
                  shrink-0
                  rounded-full
                  overflow-hidden
                  border-[clamp(0.125rem,0.2vw,0.25rem)]
                  border-[color:var(--surface-card)]
                  bg-[color:var(--surface-card)]
                  shadow-[0px_4px_10px_rgba(0,0,0,0.12)]
                  w-[clamp(6.25rem,6vw,10rem)]
                  h-[clamp(6.25rem,6vw,10rem)]
                  flex items-center justify-center
                "
                // border: 2px→0.125rem, 4px→0.25rem
                // w/h: 100px→6.25rem, 160px→10rem
              >
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    strokeWidth={1.5}
                    className="w-[38%] h-[38%] text-[color:var(--text-muted)]"
                  />
                )}
              </div>

              {/* Name */}
              <div className="pb-[clamp(0.25rem,0.4vw,0.5rem)]">
                {/* pb: 4px→0.25rem, 8px→0.5rem */}
                <Typography
                  variant="h2"
                  className="
                    font-bold
                    leading-none
                    pt-[clamp(3.75rem,3.5vw,5.25rem)]
                    text-[color:var(--profile-text)]
                    text-[clamp(1.125rem,1.3vw,1.5rem)]
                  "
                >
                  {profile.firstName} {profile.lastName}
                </Typography>

                <p
                  className="
                    mt-[clamp(0.25rem,0.4vw,0.5rem)]
                    font-medium
                    text-[color:var(--text-supporting)]
                    text-[clamp(0.6875rem,0.9vw,0.9375rem)]
                  "
                >
                  {profile.role}
                </p>
              </div>
            </div>

            {/* Badge */}
            <div className="pb-[clamp(0.25rem,0.5vw,0.625rem)] shrink-0">
              {/* pb: 4px→0.25rem, 10px→0.625rem */}
              <img
                src={SuccessIcon}
                alt="success"
                className="
                  object-contain
                  w-[clamp(2.125rem,3vw,3.25rem)]
                  h-[clamp(2.125rem,3vw,3.25rem)]
                "
                // w/h: 34px→2.125rem, 52px→3.25rem
              />
            </div>
          </div>
        </div>

        {/* ───────────── PERSONAL DETAILS ───────────── */}
        <div
          className="
            bg-[color:var(--surface-card)]
            rounded-[clamp(1rem,1.5vw,1.5rem)]
            shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
            px-[clamp(1.25rem,2vw,1.875rem)]
            py-[clamp(1.25rem,2vw,1.75rem)]
            space-y-[clamp(1.125rem,1.6vw,1.75rem)]
          "
        >
          <Typography
            variant="h3"
            className="
              font-semibold
              text-[clamp(1.125rem,1.5vw,1.5rem)]
              text-[color:var(--text-primary)]
            "
            // text: 18px→1.125rem, 24px→1.5rem
          >
            Personal Details
          </Typography>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-3
              gap-x-[clamp(1rem,1.8vw,1.5rem)]
              gap-y-[clamp(1rem,1.8vw,1.75rem)]
            "
          >
            <Input variant="form" label="First name" value={profile.firstName} readOnly />
            <Input variant="form" label="Last name" value={profile.lastName} readOnly />
            <Input variant="form" label="Date Of Birth" value={profile.age} readOnly />
            <Input variant="form" label="Phone number" value={profile.phone} readOnly />
            <Input variant="form" label="Email" value={profile.email} readOnly />
            <Input
              variant="form"
              label="Password"
              value="XXXXXXXXXX"
              readOnly
              rightElement={
                <button
                  type="button"
                  onClick={() => navigate("/role-manager/update-password")}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  <Pencil size={15} />
                </button>
              }
            />
          </div>
        </div>

        {/* ───────────── ALERTS ───────────── */}
        {/* <div
          className="
            bg-[color:var(--surface-card)]
            rounded-[clamp(1rem,1.5vw,1.5rem)]
            shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
            px-[clamp(1.25rem,2vw,1.875rem)]
            py-[clamp(1.25rem,2vw,1.75rem)]
            space-y-[clamp(1.125rem,1.6vw,1.75rem)]
          "
        >
          <Typography
            variant="h3"
            className="
              font-semibold
              text-[clamp(1.125rem,1.5vw,1.5rem)]
              text-[color:var(--text-primary)]
            "
          >
            Alerts
          </Typography>

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-[clamp(1.125rem,2vw,2.5rem)]
            "
          >
            <div className="flex items-center justify-between">
              <div className="space-y-[clamp(0.125rem,0.3vw,0.375rem)]">
                <h4
                  className="
                    font-semibold
                    text-[clamp(0.875rem,1vw,1.125rem)]
                    text-[color:var(--text-primary)]
                  "
                  // text: 14px→0.875rem, 18px→1.125rem
                >
                  Notifications
                </h4>
                <p
                  className="
                    text-[clamp(0.6875rem,0.9vw,0.875rem)]
                    text-[color:var(--text-muted)]
                  "
                  // text: 11px→0.6875rem, 14px→0.875rem
                >
                  Receive updates via Notifications
                </p>
              </div>
              <Toggle defaultOn={profile.notificationsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-[clamp(0.125rem,0.3vw,0.375rem)]">
                <h4
                  className="
                    font-semibold
                    text-[clamp(0.875rem,1vw,1.125rem)]
                    text-[color:var(--text-primary)]
                  "
                  // text: 14px→0.875rem, 18px→1.125rem
                >
                  SMS Alerts
                </h4>
                <p
                  className="
                    text-[clamp(0.6875rem,0.9vw,0.875rem)]
                    text-[color:var(--text-muted)]
                  "
                  // text: 11px→0.6875rem, 14px→0.875rem
                >
                  Get important alerts via SMS
                </p>
              </div>
              <Toggle defaultOn={profile.smsEnabled} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
