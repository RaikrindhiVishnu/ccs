import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import glcLogo from "@/assets/glc-logo.svg";
import { useUpdatePasswordMutation } from "@/features/auth/api/authApi";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [updatePassword, { isLoading: isUpdating }] = useUpdatePasswordMutation();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword === currentPassword) {
      toast.error("New password must be different from current password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updatePassword({
        old_password: currentPassword,
        new_password: newPassword,
      }).unwrap();

      toast.success("Password updated successfully!");
      setTimeout(() => {
        navigate("/role-manager/profile");
      }, 1500);
    } catch (err: any) {
      console.error("Update password error:", err);
      toast.error(
        err?.data?.message || 
        err?.message || 
        "Failed to update password. Please check your current password."
      );
    }
  };

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-[#F8FAFC]
        px-[clamp(1.25rem,5vw,6.125rem)]
        py-[clamp(1.25rem,2vw,2.375rem)]
        flex
        flex-col
      "
    >
      {/* Go Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
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
          w-fit
          cursor-pointer
        "
      >
        <ArrowLeft size={16} strokeWidth={1.4} />
        Go Back
      </button>

      {/* Main Wrapper */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="
            w-full
            max-w-[430px]
            bg-white
            rounded-[2.5rem]
            shadow-[0px_4px_30px_rgba(0,0,0,0.03)]
            p-8 lg:p-10
            flex
            flex-col
            items-center
            border
            border-slate-100
          "
        >
          {/* Logo */}
          <img src={glcLogo} alt="Green Land Capital Logo" className="h-14 w-auto object-contain mb-6 select-none" />

          {/* Heading */}
          <Typography
            variant="h2"
            className="
              font-bold
              text-[22px]
              text-slate-800
              mb-2
              text-center
            "
          >
            Update Password
          </Typography>

          <p className="text-xs text-slate-400 text-center mb-8 max-w-[290px] leading-relaxed">
            Ensure your account is using a long, random password to stay secure.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Current Password Input */}
            <Input
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="form"
              containerClassName="gap-1.5 w-full"
              wrapperClassName="bg-[#F1F5F9] border-none rounded-full h-12 flex items-center focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500/20 transition-all duration-200"
              className="text-sm pr-10 border-none outline-none bg-transparent w-full h-full text-slate-800 placeholder-slate-400"
              icon={<Lock size={16} className="text-slate-400" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* New Password Input */}
            <Input
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="form"
              containerClassName="gap-1.5 w-full"
              wrapperClassName="bg-[#F1F5F9] border-none rounded-full h-12 flex items-center focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500/20 transition-all duration-200"
              className="text-sm pr-10 border-none outline-none bg-transparent w-full h-full text-slate-800 placeholder-slate-400"
              icon={<Lock size={16} className="text-slate-400" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="form"
              containerClassName="gap-1.5 w-full"
              wrapperClassName="bg-[#F1F5F9] border-none rounded-full h-12 flex items-center focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500/20 transition-all duration-200"
              className="text-sm pr-10 border-none outline-none bg-transparent w-full h-full text-slate-800 placeholder-slate-400"
              icon={<Lock size={16} className="text-slate-400" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Update Password Button */}
            <Button
              type="submit"
              variant="primary"
              loading={isUpdating}
              className="w-full rounded-full h-12 text-sm font-semibold tracking-normal normal-case mt-2 bg-[#3B8FD9] hover:bg-[#2563EB]"
            >
              Update Password
            </Button>
          </form>

          {/* Footer Security Badge */}
          <div className="flex items-center gap-1.5 mt-8 text-[11px] text-slate-400 font-medium">
            <Shield size={13} className="text-emerald-500 shrink-0" />
            <span>Secured by TechGy Innovations. End-to-end encrypted connection.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
