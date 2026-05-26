import { useState } from "react";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import MainLoginBg from "@/assets/main login.svg";
import GlcLogo from "@/assets/glc-logo.svg";
import { useUpdatePasswordMutation } from "@/features/auth/api/authApi";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice";
// ─── Design tokens (all derived from Figma 1440px baseline) ──────────────────
//
// Figma canvas: 1440 × 1024px
// Card: 550px wide, left: 767px, height: 706px (login) / 508px (update) / 706px (change)
// Card padding: 48px sides, 47px top, ~47px bottom
// Logo: 151 × 73.26px, top: 47px, left: 48px
// Heading block: top: 145px → 145-47=98px below logo area
// Form block: top: 279px
// Input height: 56px, radius: 32px, bg: #F3F3F5
// Button height: 52px, radius: 48px, bg: #2780C4
// Icon left inset: 16px, right inset: 16px
// Input left padding (with icon): 48px, right padding (with icon): 48px
// Footer: top: 614px from card top (login card)
//
// Responsive strategy:
//   All sizes scale linearly from 1024px → 1900px viewport width
//   clamp(min, preferred_vw, max) — preferred derived from Figma: value/1440*100vw
//   For heights we use vh-based scaling from 768px → 1080px viewport height
//
// Quick reference clamp helpers (px at 1024 → px at 1440 → px at 1900):
//   font 12 → clamp(9px, 0.833vw, 16px)
//   font 14 → clamp(10px, 0.972vw, 18px)
//   font 15 → clamp(11px, 1.042vw, 19px)
//   font 16 → clamp(11px, 1.111vw, 21px)
//   font 24 → clamp(17px, 1.667vw, 32px)
//   font 48 → clamp(32px, 3.333vw, 62px)
//   spacing 8  → clamp(6px, 0.556vw, 11px)
//   spacing 12 → clamp(8px, 0.833vw, 16px)
//   spacing 14 → clamp(10px, 0.972vw, 18px)
//   spacing 16 → clamp(11px, 1.111vw, 21px)
//   spacing 24 → clamp(17px, 1.667vw, 30px)
//   spacing 48 → clamp(34px, 3.333vw, 62px)
//   card-w 550 → clamp(390px, 38.194vw, 720px)
//   card-right  → clamp(24px, 4.375vw, 83px)   (1440-767-550=123 → right edge 123px)
//   input-h 56 → clamp(40px, 3.889vw, 73px)
//   button-h 52 → clamp(37px, 3.611vw, 68px)
//   logo-w 151  → clamp(107px, 10.486vw, 199px)
//   logo-h 73   → clamp(52px, 5.069vw, 96px)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────
interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ElementType;
  rightEl?: React.ReactNode;
  labelRight?: React.ReactNode;
  error?: string;
  id: string;
}

// ─── InputField ───────────────────────────────────────────────────────────────
// Figma: input height 56px, radius 32px, bg #F3F3F5
// left icon inset 16px, icon size ~13.33px
// left padding with icon: 48px, without: 16px
// right padding with rightEl: 48px, without: 16px
// label: 14px medium #3D4949, height 20px
// placeholder: 16px regular rgba(109,122,122,0.6)
// input text: 16px regular #1A1C1D
function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  icon: Icon,
  rightEl,
  labelRight,
  error,
  id,
}: InputFieldProps) {
  return (
    <div
      className="flex flex-col w-full"
      style={{ gap: "clamp(6px,0.556vw,11px)" }}
    >
      {(label || labelRight) && (
        <div
          className="flex items-center justify-between"
          style={{ height: "clamp(14px,1.389vw,20px)" }}
        >
          {label && (
            <label
              htmlFor={id}
              className="font-sans font-medium text-[#3D4949] leading-none"
              style={{ fontSize: "clamp(10px,0.972vw,18px)" }}
            >
              {label}
            </label>
          )}
          {labelRight && <div>{labelRight}</div>}
        </div>
      )}

      {/* Input wrapper — Figma: 56px tall, radius 32px */}
      <div
        className="relative flex items-center w-full bg-[#F3F3F5]"
        style={{
          height: "clamp(40px,3.889vw,73px)",
          borderRadius: "clamp(22px,2.222vw,42px)",
        }}
      >
        {Icon && (
          <span
            className="absolute pointer-events-none flex items-center opacity-50"
            style={{ left: "clamp(11px,1.111vw,21px)" }}
          >
            <Icon
              strokeWidth={1.8}
              className="text-[#6D7A7A]"
              style={{
                width: "clamp(9px,0.926vw,18px)",
                height: "clamp(9px,0.926vw,18px)",
              }}
            />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[#1A1C1D] placeholder:text-[rgba(109,122,122,0.6)]"
          style={{
            fontSize: "clamp(11px,1.111vw,21px)",
            paddingLeft: Icon
              ? "clamp(30px,3.333vw,62px)"
              : "clamp(11px,1.111vw,21px)",
            paddingRight: rightEl
              ? "clamp(30px,3.333vw,62px)"
              : "clamp(11px,1.111vw,21px)",
            borderRadius: "clamp(22px,2.222vw,42px)",
          }}
        />

        {rightEl && (
          <span
            className="absolute flex items-center"
            style={{ right: "clamp(11px,1.111vw,21px)" }}
          >
            {rightEl}
          </span>
        )}
      </div>

      {error && (
        <p
          className="font-sans text-red-600 mt-0.5"
          style={{ fontSize: "clamp(9px,0.764vw,14px)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────
// Figma: height 52px, radius 48px, bg #2780C4, font 16px bold white
function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-[#2780C4] border-none text-white font-sans font-bold tracking-[0.04em] cursor-pointer transition-all duration-150 shadow-[0_4px_20px_rgba(39,128,196,0.18)] disabled:opacity-55 disabled:cursor-not-allowed hover:brightness-90 active:scale-[0.99]"
      style={{
        height: "clamp(37px,3.611vw,68px)",
        borderRadius: "clamp(26px,3.333vw,62px)",
        fontSize: "clamp(11px,1.111vw,21px)",
      }}
    >
      {children}
    </button>
  );
}

// ─── CardLogo ─────────────────────────────────────────────────────────────────
// Figma: 151 × 73.26px, left: 48px, top: 47px
function CardLogo() {
  return (
    <div
      className="flex flex-col"
      style={{ marginBottom: "clamp(14px,1.389vw,20px)" }}
    >
      <img
        src={GlcLogo}
        alt="Green Land Capital"
        className="object-contain h-auto"
        style={{
          width: "clamp(107px,10.486vw,199px)",
        }}
      />
    </div>
  );
}

// ─── SecureFooter ─────────────────────────────────────────────────────────────
// Figma: icon 16×20px green, text 12px rgba(61,73,73,0.8), gap 16px
function SecureFooter() {
  return (
    <div
      className="flex items-center mt-auto"
      style={{
        gap: "clamp(11px,1.111vw,21px)",
        paddingTop: "clamp(11px,1.111vw,21px)",
      }}
    >
      <ShieldCheck
        strokeWidth={1.8}
        className="shrink-0 text-[#006D3A]"
        style={{
          width: "clamp(11px,1.111vw,21px)",
          height: "clamp(14px,1.389vw,26px)",
        }}
      />
      <span
        className="font-sans font-normal text-[rgba(61,73,73,0.8)] leading-4"
        style={{ fontSize: "clamp(9px,0.833vw,16px)" }}
      >
        Secured by TechGy Innovations. End-to-end encrypted connection.
      </span>
    </div>
  );
}

// ─── LoginCard ────────────────────────────────────────────────────────────────
// Figma 1440px: width 550px, right edge = 1440 - 767 - 550 = 123px from right
// Padding: 48px sides, top ~47px, bottom ~47px
// Border-radius: 32px
// Box-shadow: 0px 1px 3.5px rgba(0,0,0,0.06), 0px 8px 32px rgba(0,0,0,0.07)
function LoginCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 bg-white flex flex-col box-border ${className}`}
      style={{
        width: "clamp(390px,38.194vw,720px)",
        right: "clamp(24px,8.542vw,162px)",
        borderRadius: "clamp(22px,2.222vw,42px)",
        padding: "clamp(34px,3.333vw,62px)",
        paddingBottom: "clamp(28px,2.778vw,52px)",
        boxShadow:
          "0px 1px 3.5px rgba(0,0,0,0.06), 0px 8px 32px rgba(0,0,0,0.07)",
      }}
    >
      {children}
    </div>
  );
}

// ─── SCREEN 1 · Login ─────────────────────────────────────────────────────────
function LoginScreen({
  onSuccess,
}: {
  onSuccess: (d: { is_first_login: number }) => void;
}) {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!loginId.trim()) e.loginId = "Login ID is required";
    else if (!/\S+@\S+\.\S+/.test(loginId)) e.loginId = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});

  try {
    setLoading(true);

    const response = await login({
      login_id: loginId,
      password,
    }).unwrap();
dispatch(
  setCredentials({
    user: {
      id: response.id,
      login_id: response.login_id,
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: response.role_id,
      is_first_login: response.is_first_login,
    },
    accessToken: response.token,
    refreshToken: response.refreshToken,
  })
);

    onSuccess({
      is_first_login: response.is_first_login,
    });
  } catch (err: any) {
    setErrors({
      password:
        err?.data?.error || "Invalid credentials",
    });
  } finally {
    setLoading(false);
  }
};

  const EyeBtn = () => (
    <button
      type="button"
      onClick={() => setShowPw((v) => !v)}
      className="border-none bg-transparent cursor-pointer p-0 flex items-center opacity-45"
      aria-label={showPw ? "Hide password" : "Show password"}
    >
      {showPw ? (
        <Eye
          strokeWidth={1.8}
          className="text-[#6D7A7A]"
          style={{
            width: "clamp(12px,1.274vw,24px)",
            height: "clamp(11px,1.146vw,22px)",
          }}
        />
      ) : (
        <EyeOff
          strokeWidth={1.8}
          className="text-[#6D7A7A]"
          style={{
            width: "clamp(12px,1.274vw,24px)",
            height: "clamp(11px,1.146vw,22px)",
          }}
        />
      )}
    </button>
  );

  return (
    <LoginCard>
      <CardLogo />

      {/* Heading block — Figma: top 145px from card top, logo ends ~120px, so ~25px gap */}
      <div style={{ marginBottom: "clamp(14px,1.528vw,22px)" }}>
        {/* Title: Manrope 700, 24px, tracking -0.9px, color #1A1C1D */}
        <h1
          className="font-heading font-bold text-[#1A1C1D] m-0"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(17px,1.667vw,32px)",
            lineHeight: "clamp(24px,2.778vw,40px)",
            letterSpacing: "-0.9px",
            marginBottom: "clamp(6px,0.694vw,10px)",
          }}
        >
          Role Manager Login
        </h1>
        {/* Subtitle: Plus Jakarta Sans 400, 16px, lh 26px, #3D4949 */}
        <p
          className="font-sans font-normal text-[#3D4949] m-0"
          style={{
            fontSize: "clamp(11px,1.111vw,21px)",
            lineHeight: "clamp(17px,1.806vw,27px)",
          }}
        >
          Secure access for authorised role managers.
          <br />
          Please authenticate to continue.
        </p>
      </div>

      {/* Form — Figma gap between inputs: 24px (login id gap + password margin) */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1"
        style={{ gap: "clamp(14px,1.667vw,24px)" }}
      >
        <InputField
          id="login-id"
          label="Login ID"
          placeholder="Enter your assigned ID"
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          icon={User}
          error={errors.loginId}
        />

        <InputField
          id="login-password"
          label="Password"
          placeholder="Enter Password"
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          error={errors.password}
          labelRight={
            <button
              type="button"
              className="border-none bg-transparent cursor-pointer p-0 font-sans font-medium text-[#6D7A7A]"
              style={{ fontSize: "clamp(9px,0.764vw,14px)" }}
            >
              Forgot Password?
            </button>
          }
          rightEl={<EyeBtn />}
        />

        {/* Submit button — Figma: 48px top margin from last input */}
        <div style={{ marginTop: "clamp(20px,3.333vw,48px)" }}>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Signing in…" : "LOGIN"}
          </PrimaryButton>
        </div>

        <SecureFooter />
      </form>
    </LoginCard>
  );
}

// ─── SCREEN 2 · Update Default Password ──────────────────────────────────────
// Figma: card 550×508px, heading 24px bold #111827, body 16px #6B7280
// Actions gap 16px, "Set New Password" button 52px, "Continue" text 15px bold #424751
function UpdateDefaultPasswordScreen({
  onSetNew,
  onContinue,
}: {
  onSetNew: () => void;
  onContinue: () => void;
}) {
  return (
    <LoginCard>
      <CardLogo />

      <div style={{ marginBottom: "clamp(18px,1.944vw,28px)" }}>
        <h2
          className="font-sans font-bold text-[#111827] m-0"
          style={{
            fontSize: "clamp(17px,1.667vw,32px)",
            lineHeight: "clamp(24px,2.917vw,42px)",
            marginBottom: "clamp(6px,0.556vw,10px)",
          }}
        >
          Update Default Password
        </h2>
        <p
          className="font-sans font-normal text-[#6B7280] m-0"
          style={{
            fontSize: "clamp(11px,1.111vw,21px)",
            lineHeight: "clamp(15px,1.528vw,22px)",
          }}
        >
          You are currently logging in with a system-generated password sent to
          your email. For your security, we strongly recommend setting a new
          password now.
        </p>
      </div>

      <div
        className="flex flex-col flex-1 items-center"
        style={{ gap: "clamp(11px,1.111vw,21px)" }}
      >
        <PrimaryButton onClick={onSetNew}>Set New Password</PrimaryButton>

        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-transparent border-none cursor-pointer font-sans font-bold text-[#424751] text-center transition-opacity hover:opacity-65"
          style={{
            fontSize: "clamp(11px,1.042vw,19px)",
            padding: "clamp(4px,0.556vw,8px) 0",
          }}
        >
          Continue to Dashboard
        </button>

        <SecureFooter />
      </div>
    </LoginCard>
  );
}

// ─── SCREEN 3 · Change Password ───────────────────────────────────────────────
// Figma: card 550×706px, form gap 24px between fields
// label: 16px regular #424751 (different from login screen's 14px medium)
// input bg: #F4F4F5 (slightly different from login's #F3F3F5)
// icon: #9CA3AF (grey, not #6D7A7A)
function ChangePasswordScreen({ onDone }: { onDone: () => void }) {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!newPw) e.newPw = "New password is required";
    else if (newPw.length < 8)
      e.newPw = "Password must be at least 8 characters";
    if (!confirmPw) e.confirmPw = "Please confirm your password";
    else if (newPw !== confirmPw) e.confirmPw = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});

    try {
      await updatePassword({
        new_password: newPw,
      }).unwrap();

      setSuccess(true);

      setTimeout(() => {
        onDone();
      }, 1400);
    } catch (err: any) {
      setErrors({
        confirmPw: err?.data?.error || "Failed to update password",
      });
    }
  };

  const EyeToggle = ({
    show,
    toggle,
  }: {
    show: boolean;
    toggle: () => void;
  }) => (
    <button
      type="button"
      onClick={toggle}
      className="border-none bg-transparent cursor-pointer p-0 flex items-center opacity-45"
    >
      {show ? (
        <Eye
          strokeWidth={1.8}
          className="text-[#9CA3AF]"
          style={{
            width: "clamp(14px,1.528vw,28px)",
            height: "clamp(14px,1.375vw,26px)",
          }}
        />
      ) : (
        <EyeOff
          strokeWidth={1.8}
          className="text-[#9CA3AF]"
          style={{
            width: "clamp(14px,1.528vw,28px)",
            height: "clamp(13px,1.146vw,22px)",
          }}
        />
      )}
    </button>
  );

  // Change password screen uses slightly different input bg (#F4F4F5)
  // and label color (#424751 instead of #3D4949)
  // We override via inline style on the input wrapper approach
  // by using a local ChangeInputField wrapper
  const ChangeInputField = ({
    label: fieldLabel,
    ...rest
  }: InputFieldProps) => (
    <div
      className="flex flex-col w-full"
      style={{ gap: "clamp(8px,0.833vw,12px)" }}
    >
      {fieldLabel && (
        <label
          htmlFor={rest.id}
          className="font-sans font-normal text-[#424751]"
          style={{
            fontSize: "clamp(11px,1.111vw,21px)",
            lineHeight: "clamp(15px,1.667vw,24px)",
          }}
        >
          {fieldLabel}
        </label>
      )}
      <div
        className="relative flex items-center w-full"
        style={{
          height: "clamp(40px,3.958vw,75px)",
          borderRadius: "clamp(22px,2.222vw,42px)",
          background: "#F4F4F5",
        }}
      >
        {rest.icon && (
          <span
            className="absolute pointer-events-none flex items-center"
            style={{ left: "clamp(14px,1.389vw,26px)" }}
          >
            <rest.icon
              strokeWidth={1.8}
              className="text-[#9CA3AF]"
              style={{
                width: "clamp(11px,1.111vw,21px)",
                height: "clamp(14px,1.458vw,27px)",
              }}
            />
          </span>
        )}
        <input
          id={rest.id}
          type={rest.type || "text"}
          value={rest.value}
          onChange={rest.onChange}
          placeholder={rest.placeholder}
          className="w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[#1A1C1D] placeholder:text-[#9CA3AF]"
          style={{
            fontSize: "clamp(11px,1.111vw,21px)",
            paddingLeft: rest.icon
              ? "clamp(34px,3.889vw,73px)"
              : "clamp(14px,1.389vw,26px)",
            paddingRight: rest.rightEl
              ? "clamp(34px,3.889vw,73px)"
              : "clamp(14px,1.389vw,26px)",
            borderRadius: "clamp(22px,2.222vw,42px)",
          }}
        />
        {rest.rightEl && (
          <span
            className="absolute flex items-center"
            style={{ right: "clamp(14px,1.389vw,26px)" }}
          >
            {rest.rightEl}
          </span>
        )}
      </div>
      {rest.error && (
        <p
          className="font-sans text-red-600 mt-0.5"
          style={{ fontSize: "clamp(9px,0.764vw,14px)" }}
        >
          {rest.error}
        </p>
      )}
    </div>
  );

  return (
    <LoginCard>
      <CardLogo />

      <div style={{ marginBottom: "clamp(14px,1.389vw,20px)" }}>
        <h2
          className="font-sans font-bold text-[#111827] m-0"
          style={{
            fontSize: "clamp(17px,1.667vw,32px)",
            lineHeight: "clamp(24px,2.917vw,42px)",
            marginBottom: "clamp(6px,0.556vw,10px)",
          }}
        >
          Change Password
        </h2>
        <p
          className="font-sans font-normal text-[#6B7280] m-0"
          style={{
            fontSize: "clamp(11px,1.111vw,21px)",
            lineHeight: "clamp(15px,1.528vw,22px)",
          }}
        >
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3">
          <div
            className="rounded-full bg-[#E8F5EE] flex items-center justify-center"
            style={{
              width: "clamp(40px,3.889vw,73px)",
              height: "clamp(40px,3.889vw,73px)",
            }}
          >
            <svg
              style={{
                width: "clamp(16px,1.667vw,31px)",
                height: "clamp(16px,1.667vw,31px)",
              }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12l5 5L19 7"
                stroke="#006D3A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p
            className="font-sans font-semibold text-[#006D3A] text-center m-0"
            style={{ fontSize: "clamp(11px,1.111vw,21px)" }}
          >
            Password updated successfully!
          </p>
          <p
            className="font-sans text-[#6B7280] m-0"
            style={{ fontSize: "clamp(10px,0.972vw,18px)" }}
          >
            Redirecting to dashboard…
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1"
          style={{ gap: "clamp(17px,1.667vw,31px)" }}
        >
          <ChangeInputField
            id="new-password"
            label="New Password"
            placeholder="Enter new password"
            type={showNew ? "text" : "password"}
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            icon={Lock}
            error={errors.newPw}
            rightEl={
              <EyeToggle show={showNew} toggle={() => setShowNew((v) => !v)} />
            }
          />

          <ChangeInputField
            id="confirm-password"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            type={showConfirm ? "text" : "password"}
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            icon={Lock}
            error={errors.confirmPw}
            rightEl={
              <EyeToggle
                show={showConfirm}
                toggle={() => setShowConfirm((v) => !v)}
              />
            }
          />

          {/* Button: 16px gap from last input per Figma actions gap */}
          <div style={{ marginTop: "clamp(4px,1.111vw,16px)" }}>
            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </PrimaryButton>
          </div>

          <SecureFooter />
        </form>
      )}
    </LoginCard>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────
// Welcome text — Figma: left 110px, top 780px (on 1024px tall canvas)
// At 1440px wide: left 110px = 7.639vw, top 780px = ~76.2vh
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={MainLoginBg}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Welcome text — Figma: Plus Jakarta Sans 600, 48px, lh 60px, white */}
      <div
        className="absolute"
        style={{
          left: "clamp(56px,7.639vw,145px)",
          bottom: "clamp(40px,10.547vh,108px)",
        }}
      >
        <p
          className="font-sans font-semibold text-white drop-shadow-lg m-0"
          style={{
            fontSize: "clamp(28px,3.333vw,63px)",
            lineHeight: "clamp(36px,4.167vw,79px)",
          }}
        >
          Welcome To
          <br />
          Greenland Capital
        </p>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function LoginFlow() {
  const navigate = useNavigate();
  type Screen = "login" | "update-default" | "change-password" | "dashboard";
  const [screen, setScreen] = useState<Screen>("login");

  const handleLoginSuccess = ({
    is_first_login,
  }: {
    is_first_login: number;
  }) => {
    if (is_first_login === 1) {
  setScreen("update-default");
} else {
  navigate("/dashboard");
}
  };

  return (
    <div className="fixed inset-0 font-sans overflow-hidden">
      <Background />

      {screen === "login" && <LoginScreen onSuccess={handleLoginSuccess} />}

      {screen === "update-default" && (
        <UpdateDefaultPasswordScreen
          onSetNew={() => setScreen("change-password")}
          onContinue={() => navigate("/dashboard")}
        />
      )}

      {screen === "change-password" && (
        <ChangePasswordScreen onDone={() => navigate("/dashboard")} />
      )}

     
    </div>
  );
}
