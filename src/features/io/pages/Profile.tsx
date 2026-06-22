import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import { BackButton } from "@/components/ui/BackButton";
import { Edit2, LogOut, Lock, Eye, EyeOff, Shield } from "lucide-react";
import roleProfile from "@/assets/prof.jpg";
import profileAvatar from "@/assets/profile.svg";
import sharpIcon from "@/assets/sharp.svg";
import glcLogo from "@/assets/glc-logo.svg";
import { useUpdatePasswordMutation } from "@/features/auth/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  const handlePasswordUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword({
        old_password: "", // No old password field in Figma, passing empty
        new_password: newPassword,
      }).unwrap();

      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setShowUpdatePassword(false);
    } catch (err: any) {
      console.error("Update password error:", err);
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Failed to update password.",
      );
    }
  };

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
        pb-[clamp(1.92rem,4.0vw,5.0rem)]
        font-[family-name:var(--font-sans)]
        flex flex-col items-center
      "
    >
      {/* Container holding Go Back button & main Profile card layout */}
      <div
        className="
          w-full max-w-[1440px]
          px-[clamp(3.6336rem,7.57vw,8.5rem)]
          pt-[clamp(1.77rem,2.64vw,3.5rem)]
          flex flex-col
        "
      >
        {/* Go Back button */}
        <div className="w-full flex justify-start mb-[clamp(2.4rem,3.61vw,4.5rem)]">
          <BackButton
            label="Go Back to Dashboard"
            variant="light"
            size="default"
            onClick={showUpdatePassword ? () => setShowUpdatePassword(false) : handleBack}
            className="
              w-[clamp(11.4375rem,16.94vw,18.5rem)]
              h-[clamp(2.25rem,3.61vw,3.8rem)]
              text-[clamp(0.7125rem,1.11vw,1.25rem)]
              py-[clamp(0.825rem,1.32vw,1.5rem)]
              px-[clamp(0.9375rem,1.39vw,1.8rem)]
              font-[family-name:var(--font-sans)]
              text-[var(--text-strong)]
              shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
              rounded-[60px]
              gap-[clamp(0.2688rem,0.56vw,0.8rem)]
            "
          />
        </div>

        {!showUpdatePassword ? (
          /* Main Profile Card Container (Figma width: 1244px, height: 922px) */
          <div
            className="
              relative w-full
              bg-[var(--surface-card)]
              rounded-[clamp(1.08rem,2.22vw,3.22rem)]
              p-[clamp(1.6656rem,3.47vw,4.0rem)]
              flex flex-col
              gap-[clamp(1.2rem,2.5vw,3.0rem)]
              min-h-[clamp(41.25rem,64.02vw,75.0rem)]
            "
          >
            {/* Card 1: Banner + Avatar Info Card (Figma width: 1144px, height: 263px) */}
            <div
              className="
                relative w-full
                bg-[var(--surface-card)]
                shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
                rounded-[clamp(0.8016rem,1.67vw,2.4rem)]
                min-h-[clamp(11.625rem,18.26vw,20.5rem)]
                flex flex-col md:flex-row md:items-end justify-between
                pb-[clamp(0.8016rem,1.67vw,2.4rem)]
                overflow-hidden md:overflow-visible
              "
            >
              {/* Banner (Figma width: 1143px, height: 291px, top: -28px) */}
              <div
                className="
                  absolute left-0 top-[-28px] w-full h-[clamp(12rem,20.2vw,23.0rem)]
                  rounded-[clamp(1.5rem,3.125vw,3.5rem)] overflow-hidden
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
              <div className="relative w-full px-[clamp(1.875rem,3.47vw,4.0rem)] flex flex-col md:flex-row md:items-end justify-between mt-[clamp(7.5rem,12.5vw,16.0rem)] z-10">
                {/* Left: Avatar + Name/Role */}
                <div className="flex flex-col md:flex-row items-center md:items-end gap-[clamp(0.9375rem,1.87vw,2.4rem)]">
                  {/* Avatar circle */}
                  <div
                    className="
                      w-[clamp(6.75rem,11.11vw,12.5rem)] h-[clamp(6.75rem,11.11vw,12.5rem)]
                      rounded-[136px] border-[clamp(0.2016rem,0.42vw,0.6rem)] border-white
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
                  <div className="flex flex-col text-center md:text-left pb-[clamp(0.3312rem,0.69vw,1.0rem)]">
                    <h2 className="text-[clamp(0.8438rem,1.67vw,2.0rem)] font-bold text-[var(--text-strong)] font-[family-name:var(--font-sans)] leading-[clamp(1.05rem,2.08vw,3.0rem)]">
                      {fullName}
                    </h2>
                    <span className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] font-[family-name:var(--font-sans)] leading-[clamp(0.6975rem,1.39vw,2.0rem)] opacity-[0.6] mt-[clamp(0.135rem,0.28vw,0.4rem)]">
                      {user?.role === "VO3" ? "Verification Officer 3" : "Intelligence Officer"}
                    </span>
                  </div>
                </div>

                {/* Right: Verified Badge */}
                <div className="flex items-center justify-center pb-[clamp(0.3312rem,0.69vw,1.0rem)] mt-4 md:mt-0">
                  <img
                    src={sharpIcon}
                    alt="Verified badge"
                    className="w-[clamp(3.375rem,5.76vw,6.5rem)] h-[clamp(3.375rem,5.76vw,6.5rem)] object-contain"
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
                p-[clamp(1.125rem,2.08vw,2.5rem)]
                flex flex-col gap-[clamp(0.8016rem,1.67vw,2.0rem)]
                min-h-[clamp(12rem,19.03vw,21.5rem)]
              "
            >
              <h3 className="text-[clamp(0.8438rem,1.67vw,2.0rem)] font-semibold text-[var(--text-strong)] font-[family-name:var(--font-sans)]">
                Personal details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[clamp(0.8016rem,1.67vw,2.0rem)] gap-y-[clamp(0.9312rem,1.94vw,2.4rem)]">
                {/* First name */}
                <div className="flex flex-col gap-[clamp(0.3312rem,0.69vw,1.0rem)]">
                  <label className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    First name
                  </label>
                  <div
                    className="
                      w-full h-[clamp(1.5rem,2.78vw,3.2rem)]
                      bg-[var(--surface-card)] border border-[var(--border-default)]
                      rounded-[clamp(0.42rem,0.83vw,1.2rem)] px-[clamp(0.4875rem,0.97vw,1.4rem)]
                      flex items-center text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    "
                  >
                    {firstName}
                  </div>
                </div>

                {/* Last name */}
                <div className="flex flex-col gap-[clamp(0.3312rem,0.69vw,1.0rem)]">
                  <label className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    Last name
                  </label>
                  <div
                    className="
                      w-full h-[clamp(1.5rem,2.78vw,3.2rem)]
                      bg-[var(--surface-card)] border border-[var(--border-default)]
                      rounded-[clamp(0.42rem,0.83vw,1.2rem)] px-[clamp(0.4875rem,0.97vw,1.4rem)]
                      flex items-center text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    "
                  >
                    {lastName}
                  </div>
                </div>

                {/* Date Of Birth */}
                <div className="flex flex-col gap-[clamp(0.3312rem,0.69vw,1.0rem)]">
                  <label className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    Date Of Birth
                  </label>
                  <div
                    className="
                      w-full h-[clamp(1.5rem,2.78vw,3.2rem)]
                      bg-[var(--surface-card)] border border-[var(--border-default)]
                      rounded-[clamp(0.42rem,0.83vw,1.2rem)] px-[clamp(0.4875rem,0.97vw,1.4rem)]
                      flex items-center text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    "
                  >
                    11/05/1991
                  </div>
                </div>

                {/* Phone number */}
                <div className="flex flex-col gap-[clamp(0.3312rem,0.69vw,1.0rem)]">
                  <label className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    Phone number
                  </label>
                  <div
                    className="
                      w-full h-[clamp(1.5rem,2.78vw,3.2rem)]
                      bg-[var(--surface-card)] border border-[var(--border-default)]
                      rounded-[clamp(0.42rem,0.83vw,1.2rem)] px-[clamp(0.4875rem,0.97vw,1.4rem)]
                      flex items-center text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    "
                  >
                    +91 839 293 8392
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[clamp(0.3312rem,0.69vw,1.0rem)]">
                  <label className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    Email
                  </label>
                  <div
                    className="
                      w-full h-[clamp(1.5rem,2.78vw,3.2rem)]
                      bg-[var(--surface-card)] border border-[var(--border-default)]
                      rounded-[clamp(0.42rem,0.83vw,1.2rem)] px-[clamp(0.4875rem,0.97vw,1.4rem)]
                      flex items-center text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    "
                  >
                    {email}
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-[clamp(0.3312rem,0.69vw,1.0rem)]">
                  <label className="text-[clamp(0.6562rem,1.11vw,1.25rem)] font-medium text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    Password
                  </label>
                  <div
                    className="
                      w-full h-[clamp(1.5rem,2.78vw,3.2rem)]
                      bg-[var(--surface-card)] border border-[var(--border-default)]
                      rounded-[clamp(0.42rem,0.83vw,1.2rem)] px-[clamp(0.4875rem,0.97vw,1.4rem)]
                      flex items-center justify-between text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    "
                  >
                    <span>XXXXXXXXXXX</span>
                    <button
                      onClick={() => setShowUpdatePassword(true)}
                      className="text-black/60 hover:text-black cursor-pointer"
                    >
                      <Edit2 className="w-[clamp(0.5625rem,1.11vw,1.25rem)] h-[clamp(0.5625rem,1.11vw,1.25rem)]" />
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
                p-[clamp(0.8438rem,1.67vw,2.0rem)_clamp(1.125rem,2.08vw,2.5rem)]
                flex flex-col gap-[clamp(0.8016rem,1.67vw,2.4rem)]
                min-h-[clamp(6rem,10.48vw,12.0rem)]
              "
            >
              <h3 className="text-[clamp(0.8438rem,1.67vw,2.0rem)] font-semibold text-[var(--text-strong)] font-[family-name:var(--font-sans)]">
                Alerts
              </h3>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-[clamp(0.2688rem,0.56vw,0.8rem)]">
                  <span className="text-[clamp(0.63rem,1.25vw,1.8rem)] font-semibold text-[var(--text-strong)] opacity-[0.8] font-[family-name:var(--font-sans)]">
                    Notifications
                  </span>
                  <span className="text-[clamp(0.4875rem,0.97vw,1.4rem)] text-[var(--text-strong)] opacity-[0.6] font-[family-name:var(--font-sans)]">
                    Receive updates via Notifications
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => setNotificationsEnabled((prev) => !prev)}
                  className={`
                    relative w-[clamp(1.6875rem,3.33vw,4.8rem)] h-[clamp(0.915rem,1.8vw,2.6rem)] rounded-full transition-colors cursor-pointer outline-none
                    ${notificationsEnabled ? "bg-[var(--toggle-active)]" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                      absolute top-[3px] left-[3px] w-[clamp(0.6975rem,1.39vw,2.0rem)] h-[clamp(0.6975rem,1.39vw,2.0rem)] rounded-full bg-white transition-transform
                      ${notificationsEnabled ? "translate-x-[clamp(0.765rem,1.53vw,2.2rem)]" : "translate-x-0"}
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
                p-[clamp(0.8438rem,1.67vw,2.0rem)_clamp(1.125rem,2.08vw,2.5rem)]
                flex items-center justify-between
                min-h-[clamp(3.375rem,5.9vw,7.0rem)]
              "
            >
              <span className="text-[clamp(0.63rem,1.25vw,1.8rem)] font-medium text-[var(--text-strong)] font-[family-name:var(--font-sans)]">
                Want to logout?
              </span>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="
                  flex items-center justify-center gap-[clamp(0.2688rem,0.56vw,0.8rem)]
                  bg-[var(--status-danger-soft)] rounded-[8px]
                  w-[clamp(4.5rem,8.61vw,10.0rem)]
                  h-[clamp(1.65rem,3.05vw,3.8rem)]
                  text-[var(--status-danger)] font-medium text-[clamp(0.6562rem,1.11vw,1.25rem)] font-[family-name:var(--font-sans)]
                  hover:opacity-90 transition-opacity
                  cursor-pointer
                "
              >
                <LogOut className="w-[clamp(0.6975rem,1.39vw,2.0rem)] h-[clamp(0.6975rem,1.39vw,2.0rem)] text-[var(--status-danger)]" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          /* Update Password Sub-View Card */
          <div
            className="
              w-full max-w-[clamp(21rem,38.2vw,42.0rem)] mx-auto
              bg-white
              shadow-[0px_1px_3.5px_rgba(0,0,0,0.06)]
              rounded-[32px]
              p-[clamp(1.6656rem,3.47vw,4.0rem)]
              flex flex-col items-center
              border border-slate-100
              min-h-[clamp(26.25rem,44.3vw,50.0rem)]
            "
          >
            {/* Logo */}
            <img
              src={glcLogo}
              alt="Green Land Capital Logo"
              className="w-[clamp(4.5rem,7.7vw,9.5rem)] h-auto object-contain mb-[clamp(1.125rem,2.0vw,3.0rem)] select-none"
            />

            {/* Heading Section */}
            <div className="w-full flex flex-col gap-2 mb-[clamp(1.125rem,2.2vw,3.0rem)] text-left">
              <h2 className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.9375rem,1.67vw,2.0rem)] text-[#111827] leading-tight">
                Update Password
              </h2>
              <p className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.6375rem,1.11vw,1.25rem)] text-[#6B7280] leading-relaxed">
                Ensure your account is using a long, random password to stay secure.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordUpdateSubmit} className="w-full flex flex-col gap-[clamp(0.9rem,1.67vw,2.5rem)]">
              {/* New Password Input Group */}
              <div className="flex flex-col gap-[clamp(0.3984rem,0.83vw,1.25rem)] w-full">
                <label className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.6375rem,1.11vw,1.25rem)] text-[#424751] leading-none">
                  New Password
                </label>
                <div className="relative w-full h-[clamp(2.25rem,3.95vw,5.0rem)] rounded-[32px] bg-[#F4F4F5] flex items-center px-[clamp(0.75rem,1.39vw,2.0rem)]">
                  {/* Lock icon */}
                  <Lock className="absolute left-[clamp(0.75rem,1.39vw,2.0rem)] text-[#9CA3AF] w-[clamp(0.675rem,1.11vw,1.5rem)] h-[clamp(0.825rem,1.46vw,1.8rem)]" />
                  
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="
                      w-full h-full bg-transparent pl-[clamp(1.35rem,2.5vw,3.5rem)] pr-[clamp(1.5rem,2.7vw,3.8rem)]
                      border-none outline-none font-[family-name:var(--font-sans)] font-normal text-[clamp(0.6375rem,1.11vw,1.25rem)] text-black
                      placeholder-[#9CA3AF]
                    "
                  />

                  {/* Eye Toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-[clamp(0.75rem,1.39vw,2.0rem)] text-[#9CA3AF] hover:text-black cursor-pointer flex items-center justify-center"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-[clamp(0.825rem,1.53vw,2.0rem)] h-[clamp(0.825rem,1.53vw,2.0rem)]" />
                    ) : (
                      <Eye className="w-[clamp(0.825rem,1.53vw,2.0rem)] h-[clamp(0.825rem,1.53vw,2.0rem)]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Input Group */}
              <div className="flex flex-col gap-[clamp(0.3984rem,0.83vw,1.25rem)] w-full">
                <label className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.6375rem,1.11vw,1.25rem)] text-[#424751] leading-none">
                  Confirm New Password
                </label>
                <div className="relative w-full h-[clamp(2.25rem,3.95vw,5.0rem)] rounded-[32px] bg-[#F4F4F5] flex items-center px-[clamp(0.75rem,1.39vw,2.0rem)]">
                  {/* Lock icon */}
                  <Lock className="absolute left-[clamp(0.75rem,1.39vw,2.0rem)] text-[#9CA3AF] w-[clamp(0.675rem,1.11vw,1.5rem)] h-[clamp(0.825rem,1.46vw,1.8rem)]" />
                  
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="
                      w-full h-full bg-transparent pl-[clamp(1.35rem,2.5vw,3.5rem)] pr-[clamp(1.5rem,2.7vw,3.8rem)]
                      border-none outline-none font-[family-name:var(--font-sans)] font-normal text-[clamp(0.6375rem,1.11vw,1.25rem)] text-black
                      placeholder-[#9CA3AF]
                    "
                  />

                  {/* Eye Toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-[clamp(0.75rem,1.39vw,2.0rem)] text-[#9CA3AF] hover:text-black cursor-pointer flex items-center justify-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-[clamp(0.825rem,1.53vw,2.0rem)] h-[clamp(0.825rem,1.53vw,2.0rem)]" />
                    ) : (
                      <Eye className="w-[clamp(0.825rem,1.53vw,2.0rem)] h-[clamp(0.825rem,1.53vw,2.0rem)]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="
                  w-full h-[clamp(2.1rem,3.61vw,4.5rem)] rounded-[9999px] bg-[var(--btn-secondary)]
                  flex items-center justify-center cursor-pointer transition-all duration-200
                  hover:opacity-90 shadow-[0px_10px_15px_-3px_rgba(24,92,168,0.2),0px_4px_6px_-4px_rgba(24,92,168,0.2)]
                  disabled:opacity-50 mt-[clamp(0.384rem,0.8vw,1.5rem)]
                "
              >
                <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.6375rem,1.11vw,1.25rem)] text-black">
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </span>
              </button>
            </form>

            {/* Secured by TechGy Innovations Footer */}
            <div className="flex items-center gap-[clamp(0.3rem,0.6vw,1.0rem)] mt-[clamp(1.5rem,3.1vw,4.0rem)]">
              <Shield className="text-[#006D3A] shrink-0 w-[clamp(0.675rem,1.11vw,1.5rem)] h-[clamp(0.675rem,1.11vw,1.5rem)]" />
              <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.4875rem,0.83vw,1.1rem)] text-[rgba(61,73,73,0.8)]">
                Secured by TechGy Innovations. End-to-end encrypted connection.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
