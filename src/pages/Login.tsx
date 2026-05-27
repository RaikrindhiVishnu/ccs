import { useState } from "react";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import MainLoginBg from "@/assets/main login.svg";
import GlcLogo from "@/assets/glc-logo.svg";
import { useUpdatePasswordMutation } from "@/features/auth/api/authApi";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice";
import { ROLE_CODES } from "@/features/auth/types";


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
  className?: string;
}

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
  className = "",
}: InputFieldProps) {
  return (
    <div className={`flex flex-col w-full gap-[clamp(0.375rem,0.4vw,0.5rem)] ${className}`}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between h-5">
          {label && (
            <label
              htmlFor={id}
              className="font-sans font-medium text-[var(--text-secondary)] text-[clamp(0.75rem,0.97vw,0.875rem)] min-[1440px]:text-sm leading-none"
            >
              {label}
            </label>
          )}
          {labelRight && (
            <div className="text-[clamp(0.75rem,0.97vw,0.875rem)] min-[1440px]:text-sm font-medium text-[var(--text-secondary)]">
              {labelRight}
            </div>
          )}
        </div>
      )}

      <div className="relative flex items-center w-full bg-[var(--surface-page)] h-[clamp(2.75rem,5.5vh,3.5rem)] min-[1440px]:h-14 rounded-full">
        {Icon && (
          <span className="absolute pointer-events-none flex items-center opacity-50 left-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:left-4">
            <Icon
              strokeWidth={1.8}
              className="text-[var(--text-secondary)] w-[clamp(1rem,1.25vw,1.25rem)] min-[1440px]:w-[1.125rem] h-[clamp(1rem,1.25vw,1.25rem)] min-[1440px]:h-[1.125rem]"
            />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 rounded-full text-[clamp(0.875rem,1.11vw,1rem)] min-[1440px]:text-base ${Icon ? "pl-[clamp(2.5rem,3.47vw,3.125rem)] min-[1440px]:pl-12" : "pl-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:pl-4"
            } ${rightEl ? "pr-[clamp(2.5rem,3.47vw,3.125rem)] min-[1440px]:pr-12" : "pr-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:pr-4"}`}
        />

        {rightEl && (
          <span className="absolute flex items-center right-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:right-4">
            {rightEl}
          </span>
        )}
      </div>

      {error && (
        <p className="font-sans text-red-600 text-[clamp(0.6875rem,0.83vw,0.75rem)] mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const bgClass = variant === "primary"
    ? "bg-[var(--brand-500)] hover:bg-[var(--brand-600)] shadow-[0_4px_20px_rgba(39,128,196,0.18)]"
    : "bg-[#3B75C3] hover:bg-[#2F5EA0] shadow-[0_12px_48px_rgba(0,0,0,0.06)]";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${bgClass} border-none text-white font-sans font-bold tracking-[0.04em] cursor-pointer transition-all duration-150 disabled:opacity-55 disabled:cursor-not-allowed hover:brightness-95 active:scale-[0.99] h-[3.25rem] rounded-full text-base flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}

function CardLogo() {
  return (
    <div className="flex flex-col mb-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:top-[47px] min-[1440px]:w-[151px] min-[1440px]:h-[73.26px] min-[1440px]:mb-0">
      <img
        src={GlcLogo}
        alt="Green Land Capital"
        className="w-[clamp(7.5rem,9.8vw,9.4375rem)] min-[1440px]:w-full h-auto object-contain"
      />
    </div>
  );
}

function SecureFooter() {
  return (
    <div className="flex items-center gap-4 mt-auto pt-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[calc(50%-419px/2-0.5px)] min-[1440px]:top-[614px] min-[1440px]:w-[419px] min-[1440px]:h-[20px] min-[1440px]:pt-0 min-[1440px]:mt-0 min-[1440px]:gap-[16px]">
      <ShieldCheck
        strokeWidth={1.8}
        className="shrink-0 text-[var(--status-success)] w-4 h-5 min-[1440px]:w-[16px] min-[1440px]:h-[20px]"
      />
      <span className="font-sans font-normal text-[var(--text-secondary)]/80 text-xs leading-tight min-[1440px]:w-[421px] min-[1440px]:text-[12px] min-[1440px]:leading-[16px]">
        Secured by TechGy Innovations. End-to-end encrypted connection.
      </span>
    </div>
  );
}

function LoginCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 right-4 md:right-[4vw] lg:right-[5vw] xl:right-[7.6875rem] bg-[var(--surface-card)] flex flex-col box-border shadow-[0px_8px_32px_rgba(0,0,0,0.07)] border border-[var(--border-soft)] rounded-4xl px-[clamp(1.5rem,3.33vw,3rem)] py-[clamp(1rem,3.5vh,3rem)] w-[calc(100%-2rem)] sm:w-[clamp(25rem,38.19vw,34.375rem)] min-[1440px]:w-[550px] min-[1440px]:h-[706px] min-[1440px]:shadow-[0px_1px_3.5px_rgba(0,0,0,0.06)] min-[1440px]:rounded-[32px] min-[1440px]:p-0 h-auto max-h-[calc(100vh-2.5rem)] ${className}`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1 min-[1440px]:static min-[1440px]:overflow-visible min-[1440px]:pr-0 min-[1440px]:mr-0">
        {children}
      </div>
    </div>
  );
}

// ─── SCREEN 1 · Login ─────────────────────────────────────────────────────────
function LoginScreen({
  onSuccess,
}: {
  onSuccess: (d: { is_first_login: number; passwordUsed: string }) => void;
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
            role: ROLE_CODES[response.role_id] || "",
            is_first_login: response.is_first_login,
          },
          accessToken: response.token,
          refreshToken: response.refreshToken,
        })
      );

      onSuccess({
        is_first_login: response.is_first_login,
        passwordUsed: password,
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
      className="border-none bg-transparent cursor-pointer p-0 flex items-center opacity-45 hover:opacity-75 transition-opacity"
      aria-label={showPw ? "Hide password" : "Show password"}
    >
      {showPw ? (
        <Eye
          strokeWidth={1.8}
          className="text-[var(--text-secondary)] w-5 h-5"
        />
      ) : (
        <EyeOff
          strokeWidth={1.8}
          className="text-[var(--text-secondary)] w-5 h-5"
        />
      )}
    </button>
  );

  return (
    <LoginCard>
      <CardLogo />

      {/* Heading block — Figma: top 145px from card top, logo ends ~120px, so ~25px gap */}
      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:right-[48px] min-[1440px]:top-[145px] min-[1440px]:h-[106px] min-[1440px]:m-0 min-[1440px]:gap-[14px] min-[1440px]:flex min-[1440px]:flex-col min-[1440px]:align-start">
        {/* Title: Manrope 700, 24px, tracking -0.9px, color #1A1C1D */}
        <h1 className="font-heading font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] min-[1440px]:text-[24px] min-[1440px]:leading-[40px] leading-snug tracking-[-0.05625rem] min-[1440px]:tracking-[-0.9px] min-[1440px]:w-[454px] min-[1440px]:h-[40px] m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-0">
          Role Manager Login
        </h1>
        {/* Subtitle: Plus Jakarta Sans 400, 16px, lh 26px, #3D4949 */}
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] min-[1440px]:text-[16px] min-[1440px]:leading-[26px] min-[1440px]:w-[454px] min-[1440px]:h-[52px] leading-normal m-0">
          Secure access for authorised role managers.
          <br />
          Please authenticate to continue.
        </p>
      </div>

      {/* Form — Figma gap between inputs: 24px (login id gap + password margin) */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 gap-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:right-[48px] min-[1440px]:top-[279px] min-[1440px]:h-[292px] min-[1440px]:m-0 min-[1440px]:gap-0 min-[1440px]:block"
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
          className="min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[10px] min-[1440px]:h-[84px] min-[1440px]:m-0 min-[1440px]:gap-[8px] min-[1440px]:flex min-[1440px]:flex-col"
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
              className="border-none bg-transparent cursor-pointer p-0 font-sans font-medium text-[var(--text-secondary)] hover:text-[var(--text-heading)] transition-colors text-sm"
            >
              Forgot Password?
            </button>
          }
          rightEl={<EyeBtn />}
          className="min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[94px] min-[1440px]:h-[108px] min-[1440px]:pt-[24px] min-[1440px]:m-0 min-[1440px]:gap-[8px] min-[1440px]:flex min-[1440px]:flex-col"
        />

        {/* Submit button — Figma: 48px top margin from last input */}
        <div className="mt-[clamp(1rem,3.5vh,2.5rem)] min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[192px] min-[1440px]:h-[100px] min-[1440px]:pt-[48px] min-[1440px]:m-0">
          <PrimaryButton type="submit" disabled={loading} className="min-[1440px]:h-[52px] min-[1440px]:rounded-[48px] min-[1440px]:py-[20px]">
            {loading ? "Signing in…" : "LOGIN"}
          </PrimaryButton>
        </div>
      </form>

      <SecureFooter />
    </LoginCard>
  );
}

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

      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:right-[48px] min-[1440px]:top-[145px] min-[1440px]:h-[106px] min-[1440px]:m-0 min-[1440px]:gap-[14px] min-[1440px]:flex min-[1440px]:flex-col min-[1440px]:align-start">
        <h2 className="font-sans font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] min-[1440px]:text-[24px] min-[1440px]:leading-[40px] leading-snug m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-0">
          Update Default Password
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] min-[1440px]:text-[16px] min-[1440px]:leading-[26px] min-[1440px]:w-[454px] min-[1440px]:h-[52px] leading-normal m-0">
          You are currently logging in with a system-generated password sent to
          your email. For your security, we strongly recommend setting a new
          password now.
        </p>
      </div>

      <div className="flex flex-col flex-1 items-center gap-[clamp(0.75rem,2.5vh,1.5rem)] mt-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:right-[48px] min-[1440px]:top-[279px] min-[1440px]:h-[292px] min-[1440px]:m-0 min-[1440px]:gap-0 min-[1440px]:block">
        <div className="min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[10px] min-[1440px]:h-[84px] min-[1440px]:pt-[16px] min-[1440px]:m-0">
          <PrimaryButton onClick={onSetNew} variant="secondary" className="min-[1440px]:h-[52px] min-[1440px]:rounded-[48px] min-[1440px]:py-[20px]">
            Set New Password
          </PrimaryButton>
        </div>

        <div className="min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[94px] min-[1440px]:h-[108px] min-[1440px]:pt-[24px] min-[1440px]:m-0 min-[1440px]:flex min-[1440px]:items-center">
          <button
            type="button"
            onClick={onContinue}
            className="w-full bg-transparent border-none cursor-pointer font-sans font-bold text-[var(--text-secondary)] text-center transition-opacity hover:opacity-65 py-2 text-[clamp(0.875rem,0.97vw,0.9375rem)] min-[1440px]:text-sm min-[1440px]:leading-[20px] leading-[1.375rem]"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>

      <SecureFooter />
    </LoginCard>
  );
}

function ChangePasswordScreen({ onDone, oldPassword }: { onDone: () => void; oldPassword: string }) {
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
        old_password: oldPassword,
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
      className="border-none bg-transparent cursor-pointer p-0 flex items-center opacity-45 hover:opacity-75 transition-opacity"
    >
      {show ? (
        <Eye
          strokeWidth={1.8}
          className="text-[var(--text-secondary)]/60 w-5 h-5"
        />
      ) : (
        <EyeOff
          strokeWidth={1.8}
          className="text-[var(--text-secondary)]/60 w-5 h-5"
        />
      )}
    </button>
  );

  const ChangeInputField = ({
    label: fieldLabel,
    ...rest
  }: InputFieldProps) => (
    <div className="flex flex-col w-full gap-[clamp(0.375rem,0.4vw,0.5rem)]">
      {fieldLabel && (
        <label
          htmlFor={rest.id}
          className="font-sans font-medium text-[var(--text-secondary)] text-[clamp(0.75rem,0.97vw,0.875rem)] min-[1440px]:text-sm leading-none"
        >
          {fieldLabel}
        </label>
      )}
      <div className="relative flex items-center w-full bg-[var(--surface-page)] h-[clamp(2.75rem,5.5vh,3.5rem)] min-[1440px]:h-14 rounded-full">
        {rest.icon && (
          <span className="absolute pointer-events-none flex items-center opacity-50 left-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:left-4">
            <rest.icon
              strokeWidth={1.8}
              className="text-[var(--text-secondary)]/60 w-[clamp(1rem,1.25vw,1.25rem)] min-[1440px]:w-[1.125rem] h-[clamp(1rem,1.25vw,1.25rem)] min-[1440px]:h-[1.125rem]"
            />
          </span>
        )}
        <input
          id={rest.id}
          type={rest.type || "text"}
          value={rest.value}
          onChange={rest.onChange}
          placeholder={rest.placeholder}
          className={`w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 rounded-full text-[clamp(0.875rem,1.11vw,1rem)] min-[1440px]:text-base ${rest.icon ? "pl-[clamp(2.5rem,3.47vw,3.125rem)] min-[1440px]:pl-12" : "pl-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:pl-4"
            } ${rest.rightEl ? "pr-[clamp(2.5rem,3.47vw,3.125rem)] min-[1440px]:pr-12" : "pr-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:pr-4"}`}
        />
        {rest.rightEl && (
          <span className="absolute flex items-center right-[clamp(0.875rem,1.11vw,1.25rem)] min-[1440px]:right-4">
            {rest.rightEl}
          </span>
        )}
      </div>
      {rest.error && (
        <p className="font-sans text-red-600 text-[clamp(0.6875rem,0.83vw,0.75rem)] mt-0.5">
          {rest.error}
        </p>
      )}
    </div>
  );

  return (
    <LoginCard>
      <CardLogo />

      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:right-[48px] min-[1440px]:top-[145px] min-[1440px]:h-[106px] min-[1440px]:m-0 min-[1440px]:gap-[14px] min-[1440px]:flex min-[1440px]:flex-col min-[1440px]:align-start">
        <h2 className="font-sans font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] min-[1440px]:text-[24px] min-[1440px]:leading-[40px] leading-snug m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-0">
          Change Password
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] min-[1440px]:text-[16px] min-[1440px]:leading-[26px] min-[1440px]:w-[454px] min-[1440px]:h-[52px] leading-normal m-0">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-6">
          <div className="rounded-full bg-[var(--status-success-soft)] flex items-center justify-center w-14 h-14">
            <svg
              className="w-6 h-6"
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
          <p className="font-sans font-semibold text-[var(--status-success)] text-center text-base m-0">
            Password updated successfully!
          </p>
          <p className="font-sans text-[var(--text-secondary)] text-sm m-0">
            Redirecting to dashboard…
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-[48px] min-[1440px]:right-[48px] min-[1440px]:top-[279px] min-[1440px]:h-[292px] min-[1440px]:m-0 min-[1440px]:gap-0 min-[1440px]:block"
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
            className="min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[10px] min-[1440px]:h-[84px] min-[1440px]:m-0 min-[1440px]:gap-[8px] min-[1440px]:flex min-[1440px]:flex-col"
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
            className="min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[94px] min-[1440px]:h-[108px] min-[1440px]:pt-[24px] min-[1440px]:m-0 min-[1440px]:gap-[8px] min-[1440px]:flex min-[1440px]:flex-col"
          />

          {/* Button: 16px gap from last input per Figma actions gap */}
          <div className="mt-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:top-[192px] min-[1440px]:h-[100px] min-[1440px]:pt-[48px] min-[1440px]:m-0">
            <PrimaryButton type="submit" disabled={isLoading} variant="secondary" className="min-[1440px]:h-[52px] min-[1440px]:rounded-[48px] min-[1440px]:py-[20px]">
              {isLoading ? "Updating..." : "Update Password"}
            </PrimaryButton>
          </div>
        </form>
      )}

      <SecureFooter />
    </LoginCard>
  );
}
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      <img
        src={MainLoginBg}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Welcome text — Split style with fluid vw-based scaling starting from 1024px (md) up to 1920px */}
      <div className="hidden md:block absolute left-8 md:left-[6vw] xl:left-[7.64vw] 2xl:left-[6.875rem] bottom-20 md:bottom-[6.5vh] xl:bottom-[6.25rem] max-w-max flex flex-col justify-end">
        <span className="font-sans font-bold text-white drop-shadow-lg text-3xl md:text-[3.2vw] xl:text-[3.33vw] 2xl:text-[3rem] leading-none tracking-tight block whitespace-nowrap">
          Welcome To
        </span>
        <span className="font-sans font-normal text-white drop-shadow-lg text-4xl md:text-[3.8vw] xl:text-[3.89vw] 2xl:text-[3.5rem] leading-none tracking-normal block mt-3 whitespace-nowrap">
          Greenland Capital
        </span>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function LoginFlow() {
  const navigate = useNavigate();
  type Screen = "login" | "update-default" | "change-password" | "dashboard";
  const [screen, setScreen] = useState<Screen>("login");
  const [oldPassword, setOldPassword] = useState("");

  const handleLoginSuccess = ({
    is_first_login,
    passwordUsed,
  }: {
    is_first_login: number;
    passwordUsed: string;
  }) => {
    setOldPassword(passwordUsed);
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
        <ChangePasswordScreen onDone={() => navigate("/dashboard")} oldPassword={oldPassword} />
      )}
    </div>
  );
}
