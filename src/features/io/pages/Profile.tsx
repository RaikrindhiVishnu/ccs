import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import { BackButton } from "@/components/ui/BackButton";
import { Edit2, LogOut } from "lucide-react";
import roleProfile from "@/assets/prof.jpg";
import profileAvatar from "@/assets/profile.svg";
import sharpIcon from "@/assets/sharp.svg";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Rahul Kumar"
    : "Rahul Kumar";

  const firstName = user?.first_name || "Rahul Kumar";
  const lastName = user?.last_name || "Sampeti";
  const email = user?.login_id || "Rahulkumar@gmail.com";

  return (
    <div
      className="
        relative min-h-screen w-full
        bg-[var(--surface-page)]
        pb-[clamp(2.5rem,4vw,5rem)]
        font-[family-name:var(--font-sans)]
        flex flex-col items-center
      "
    >
      {/* Container holding Go Back button & main Profile card layout */}
      <div
        className="
          w-full max-w-[1440px]
          px-[clamp(4.5rem,7.57vw,8.5rem)]
          pt-[clamp(2.36rem,2.64vw,3.5rem)]
          flex flex-col
        "
      >
        {/* Go Back button (Figma width: 244px, height: 52px, left: 98px, top: 38px) */}
        <div className="w-full flex justify-start mb-[clamp(3.2rem,3.61vw,4.5rem)]">
          <BackButton
            label="Go Back to Dashboard"
            variant="light"
            size="default"
            onClick={handleBack}
            className="
              w-[clamp(15.25rem,16.94vw,18.5rem)]
              h-[clamp(3rem,3.61vw,3.8rem)]
              text-[clamp(0.95rem,1.11vw,1.25rem)]
              py-[clamp(1.1rem,1.32vw,1.5rem)]
              px-[clamp(1.25rem,1.39vw,1.8rem)]
              font-[family-name:var(--font-sans)]
              text-[var(--text-strong)]
              shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
              rounded-[60px]
              gap-[clamp(0.35rem,0.56vw,0.8rem)]
            "
          />
        </div>

        {/* Main Profile Card Container (Figma width: 1244px, height: 922px) */}
        <div
          className="
            relative w-full
            bg-[var(--surface-card)]
            rounded-[clamp(1.44rem,2.22vw,3.22rem)]
            p-[clamp(1.5rem,3.47vw,4rem)]
            flex flex-col
            gap-[clamp(1.5rem,2.5vw,3rem)]
            min-h-[clamp(55rem,64.02vw,75rem)]
          "
        >
          {/* Card 1: Banner + Avatar Info Card (Figma width: 1144px, height: 263px) */}
          <div
            className="
              relative w-full
              bg-[var(--surface-card)]
              shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
              rounded-[clamp(0.75rem,1.67vw,2.4rem)]
              min-h-[clamp(15.5rem,18.26vw,20.5rem)]
              flex flex-col md:flex-row md:items-end justify-between
              pb-[clamp(1rem,1.67vw,2.4rem)]
              overflow-hidden md:overflow-visible
            "
          >
            {/* Banner (Figma width: 1143px, height: 291px, top: -28px) */}
            <div
              className="
                absolute left-0 top-[-28px] w-full h-[clamp(16rem,20.2vw,23rem)]
                rounded-[clamp(2rem,3.125vw,3.5rem)] overflow-hidden
                z-0
              "
            >
              <img
                src={roleProfile}
                alt="Banner"
                className="w-full h-full object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-black/22" />
            </div>

            {/* Overlapping Info section */}
            <div className="relative w-full px-[clamp(2.5rem,3.47vw,4rem)] flex flex-col md:flex-row md:items-end justify-between mt-[clamp(10rem,12.5vw,16rem)] z-10">
              {/* Left: Avatar + Name/Role */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-[clamp(1.25rem,1.87vw,2.4rem)]">
                {/* Avatar circle (Figma width: 160px, height: 160px, top: 101px, left: 50px) */}
                <div
                  className="
                    w-[clamp(9rem,11.11vw,12.5rem)] h-[clamp(9rem,11.11vw,12.5rem)]
                    rounded-[136px] border-[clamp(0.25rem,0.42vw,0.6rem)] border-white
                    overflow-hidden bg-[var(--surface-card)] shadow-md
                    shrink-0
                  "
                >
                  <img
                    src={profileAvatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Role */}
                <div className="flex flex-col text-center md:text-left pb-[clamp(0.4rem,0.69vw,1rem)]">
                  <h2 className="text-[clamp(1.125rem,1.67vw,2rem)] font-bold text-[var(--text-strong)] font-[family-name:var(--font-sans)] leading-[clamp(1.4rem,2.08vw,3rem)]">
                    {fullName}
                  </h2>
                  <span className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] font-[family-name:var(--font-sans)] leading-[clamp(0.93rem,1.39vw,2rem)] opacity-[0.6] mt-[clamp(0.18rem,0.28vw,0.4rem)]">
                    Intelligence Officer
                  </span>
                </div>
              </div>

              {/* Right: Verified Badge image replace from assets (Figma height: 83px) */}
              <div className="flex items-center justify-center pb-[clamp(0.4rem,0.69vw,1rem)] mt-4 md:mt-0">
                <img
                  src={sharpIcon}
                  alt="Verified badge"
                  className="w-[clamp(4.5rem,5.76vw,6.5rem)] h-[clamp(4.5rem,5.76vw,6.5rem)] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Personal Details Card (Figma width: 1144px, height: 274px, top: 329px) */}
          <div
            className="
              w-full bg-[var(--surface-card)]
              shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
              rounded-[24px]
              p-[clamp(1.5rem,2.08vw,2.5rem)]
              flex flex-col gap-[clamp(1rem,1.67vw,2rem)]
              min-h-[clamp(16rem,19.03vw,21.5rem)]
            "
          >
            <h3 className="text-[clamp(1.125rem,1.67vw,2rem)] font-semibold text-[var(--text-strong)] font-[family-name:var(--font-sans)]">
              Personal details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[clamp(1rem,1.67vw,2rem)] gap-y-[clamp(1.2rem,1.94vw,2.4rem)]">
              {/* First name */}
              <div className="flex flex-col gap-[clamp(0.4rem,0.69vw,1rem)]">
                <label className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  First name
                </label>
                <div
                  className="
                    w-full h-[clamp(2rem,2.78vw,3.2rem)]
                    bg-[var(--surface-card)] border border-[var(--border-default)]
                    rounded-[clamp(0.56rem,0.83vw,1.2rem)] px-[clamp(0.65rem,0.97vw,1.4rem)]
                    flex items-center text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                  "
                >
                  {firstName}
                </div>
              </div>

              {/* Last name */}
              <div className="flex flex-col gap-[clamp(0.4rem,0.69vw,1rem)]">
                <label className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  Last name
                </label>
                <div
                  className="
                    w-full h-[clamp(2rem,2.78vw,3.2rem)]
                    bg-[var(--surface-card)] border border-[var(--border-default)]
                    rounded-[clamp(0.56rem,0.83vw,1.2rem)] px-[clamp(0.65rem,0.97vw,1.4rem)]
                    flex items-center text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                  "
                >
                  {lastName}
                </div>
              </div>

              {/* Date Of Birth */}
              <div className="flex flex-col gap-[clamp(0.4rem,0.69vw,1rem)]">
                <label className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  Date Of Birth
                </label>
                <div
                  className="
                    w-full h-[clamp(2rem,2.78vw,3.2rem)]
                    bg-[var(--surface-card)] border border-[var(--border-default)]
                    rounded-[clamp(0.56rem,0.83vw,1.2rem)] px-[clamp(0.65rem,0.97vw,1.4rem)]
                    flex items-center text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                  "
                >
                  11/05/1991
                </div>
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-[clamp(0.4rem,0.69vw,1rem)]">
                <label className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  Phone number
                </label>
                <div
                  className="
                    w-full h-[clamp(2rem,2.78vw,3.2rem)]
                    bg-[var(--surface-card)] border border-[var(--border-default)]
                    rounded-[clamp(0.56rem,0.83vw,1.2rem)] px-[clamp(0.65rem,0.97vw,1.4rem)]
                    flex items-center text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                  "
                >
                  +91 839 293 8392
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-[clamp(0.4rem,0.69vw,1rem)]">
                <label className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  Email
                </label>
                <div
                  className="
                    w-full h-[clamp(2rem,2.78vw,3.2rem)]
                    bg-[var(--surface-card)] border border-[var(--border-default)]
                    rounded-[clamp(0.56rem,0.83vw,1.2rem)] px-[clamp(0.65rem,0.97vw,1.4rem)]
                    flex items-center text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                  "
                >
                  {email}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[clamp(0.4rem,0.69vw,1rem)]">
                <label className="text-[clamp(0.875rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  Password
                </label>
                <div
                  className="
                    w-full h-[clamp(2rem,2.78vw,3.2rem)]
                    bg-[var(--surface-card)] border border-[var(--border-default)]
                    rounded-[clamp(0.56rem,0.83vw,1.2rem)] px-[clamp(0.65rem,0.97vw,1.4rem)]
                    flex items-center justify-between text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                  "
                >
                  <span>XXXXXXXXXXX</span>
                  <button className="text-black/60 hover:text-black cursor-pointer">
                    <Edit2 className="w-[clamp(0.75rem,1.11vw,1.25rem)] h-[clamp(0.75rem,1.11vw,1.25rem)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Alerts Card (Figma width: 1144px, height: 151px, top: 627px) */}
          <div
            className="
              w-full bg-[var(--surface-card)]
              shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
              rounded-[24px]
              p-[clamp(1.125rem,1.67vw,2rem)_clamp(1.5rem,2.08vw,2.5rem)]
              flex flex-col gap-[clamp(1rem,1.67vw,2.4rem)]
              min-h-[clamp(8rem,10.48vw,12rem)]
            "
          >
            <h3 className="text-[clamp(1.125rem,1.67vw,2rem)] font-semibold text-[var(--text-strong)] font-[family-name:var(--font-sans)]">
              Alerts
            </h3>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-[clamp(0.35rem,0.56vw,0.8rem)]">
                <span className="text-[clamp(0.84rem,1.25vw,1.8rem)] font-semibold text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                  Notifications
                </span>
                <span className="text-[clamp(0.65rem,0.97vw,1.4rem)] text-[var(--text-strong)] opacity-[0.6] font-[family-name:var(--font-sans)]">
                  Receive updates via Notifications
                </span>
              </div>

              {/* Toggle Switch Toggle Button */}
              <button
                onClick={() => setNotificationsEnabled((prev) => !prev)}
                className={`
                  relative w-[clamp(2.25rem,3.33vw,4.8rem)] h-[clamp(1.22rem,1.8vw,2.6rem)] rounded-full transition-colors cursor-pointer outline-none
                  ${notificationsEnabled ? "bg-[var(--toggle-active)]" : "bg-gray-300"}
                `}
              >
                <span
                  className={`
                    absolute top-[3px] left-[3px] w-[clamp(0.93rem,1.39vw,2rem)] h-[clamp(0.93rem,1.39vw,2rem)] rounded-full bg-white transition-transform
                    ${notificationsEnabled ? "translate-x-[clamp(1.02rem,1.53vw,2.2rem)]" : "translate-x-0"}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Card 4: Logout Card (Figma width: 1144px, height: 85px, top: 805px) */}
          <div
            className="
              w-full bg-[var(--surface-card)]
              shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
              rounded-[24px]
              p-[clamp(1.125rem,1.67vw,2rem)_clamp(1.5rem,2.08vw,2.5rem)]
              flex items-center justify-between
              min-h-[clamp(4.5rem,5.9vw,7rem)]
            "
          >
            <span className="text-[clamp(0.84rem,1.25vw,1.8rem)] font-medium text-[var(--text-strong)] font-[family-name:var(--font-sans)]">
              Want to logout?
            </span>

            {/* Logout button (Figma Frame 2147240665) */}
            <button
              onClick={handleLogout}
              className="
                flex items-center justify-center gap-[clamp(0.35rem,0.56vw,0.8rem)]
                bg-[var(--status-danger-soft)] rounded-[8px]
                w-[clamp(6rem,8.61vw,10rem)]
                h-[clamp(2.2rem,3.05vw,3.8rem)]
                text-[var(--status-danger)] font-medium text-[clamp(0.875rem,1.11vw,1.25rem)] font-[family-name:var(--font-sans)]
                hover:opacity-90 transition-opacity
                cursor-pointer
              "
            >
              <LogOut className="w-[clamp(0.93rem,1.39vw,2rem)] h-[clamp(0.93rem,1.39vw,2rem)] text-[var(--status-danger)]" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
