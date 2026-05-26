import { useState } from "react";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import MainLoginBg from "@/assets/main login.svg";
import GlcLogo from "@/assets/glc-logo.svg";
import { useUpdatePasswordMutation } from "@/features/auth/api/authApi";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice";


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
    <div className="flex flex-col w-full gap-2">
      {(label || labelRight) && (
        <div className="flex items-center justify-between h-5">
          {label && (
            <label
              htmlFor={id}
              className="font-sans font-medium text-[var(--text-secondary)] text-sm leading-none"
            >
              {label}
            </label>
          )}
          {labelRight && <div className="text-sm font-medium text-[var(--text-secondary)]">{labelRight}</div>}
        </div>
      )}

      <div className="relative flex items-center w-full bg-[var(--surface-page)] h-14 rounded-full">
        {Icon && (
          <span className="absolute pointer-events-none flex items-center opacity-50 left-4">
            <Icon
              strokeWidth={1.8}
              className="text-[var(--text-secondary)] w-[1.125rem] h-[1.125rem]"
            />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 rounded-full text-base ${Icon ? "pl-12" : "pl-4"
            } ${rightEl ? "pr-12" : "pr-4"}`}
        />

        {rightEl && (
          <span className="absolute flex items-center right-4">
            {rightEl}
          </span>
        )}
      </div>

      {error && (
        <p className="font-sans text-red-600 text-xs mt-1">
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
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}) {
  const bgClass = variant === "primary"
    ? "bg-[var(--brand-500)] hover:bg-[var(--brand-600)] shadow-[0_4px_20px_rgba(39,128,196,0.18)]"
    : "bg-[#3B75C3] hover:bg-[#2F5EA0] shadow-[0_12px_48px_rgba(0,0,0,0.06)]";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${bgClass} border-none text-white font-sans font-bold tracking-[0.04em] cursor-pointer transition-all duration-150 disabled:opacity-55 disabled:cursor-not-allowed hover:brightness-95 active:scale-[0.99] h-[3.25rem] rounded-full text-base flex items-center justify-center`}
    >
      {children}
    </button>
  );
}

function CardLogo() {
  return (
    <div className="flex flex-col mb-6">
      <img
        src={GlcLogo}
        alt="Green Land Capital"
        className="w-[9.4375rem] h-auto object-contain"
      />
    </div>
  );
}

function SecureFooter() {
  return (
    <div className="flex items-center gap-4 mt-auto pt-6">
      <ShieldCheck
        strokeWidth={1.8}
        className="shrink-0 text-[var(--status-success)] w-4 h-5"
      />
      <span className="font-sans font-normal text-[var(--text-secondary)]/80 text-xs leading-tight">
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
      className={`absolute top-1/2 -translate-y-1/2 right-4 md:right-[4vw] lg:right-[5vw] xl:right-[7.6875rem] bg-[var(--surface-card)] flex flex-col box-border shadow-[0px_8px_32px_rgba(0,0,0,0.07)] border border-[var(--border-soft)] rounded-4xl p-6 sm:p-10 xl:p-12 w-[calc(100%-2rem)] sm:w-[30rem] lg:w-[31.25rem] xl:w-[34.375rem] max-h-[calc(100vh-2.5rem)] ${className}`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1">
        {children}
      </div>
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
      <div className="mb-6">
        {/* Title: Manrope 700, 24px, tracking -0.9px, color #1A1C1D */}
        <h1 className="font-heading font-bold text-[var(--text-heading)] text-[1.5rem] leading-[2.5rem] tracking-[-0.05625rem] m-0 mb-2">
          Role Manager Login
        </h1>
        {/* Subtitle: Plus Jakarta Sans 400, 16px, lh 26px, #3D4949 */}
        <p className="font-sans font-normal text-[var(--text-secondary)] text-base leading-[1.625rem] m-0">
          Secure access for authorised role managers.
          <br />
          Please authenticate to continue.
        </p>
      </div>

      {/* Form — Figma gap between inputs: 24px (login id gap + password margin) */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 gap-6"
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
              className="border-none bg-transparent cursor-pointer p-0 font-sans font-medium text-[var(--text-secondary)] hover:text-[var(--text-heading)] transition-colors text-sm"
            >
              Forgot Password?
            </button>
          }
          rightEl={<EyeBtn />}
        />

        {/* Submit button — Figma: 48px top margin from last input */}
        <div className="mt-8 lg:mt-12">
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Signing in…" : "LOGIN"}
          </PrimaryButton>
        </div>

        <SecureFooter />
      </form>
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

      <div className="mb-6 lg:mb-8">
        <h2 className="font-sans font-bold text-[var(--text-heading)] text-[1.5rem] leading-[2.625rem] m-0 mb-2">
          Update Default Password
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-base leading-[1.375rem] m-0">
          You are currently logging in with a system-generated password sent to
          your email. For your security, we strongly recommend setting a new
          password now.
        </p>
      </div>

      <div className="flex flex-col flex-1 items-center gap-4 mt-4 lg:mt-6">
        <PrimaryButton onClick={onSetNew} variant="secondary">
          Set New Password
        </PrimaryButton>

        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-transparent border-none cursor-pointer font-sans font-bold text-[var(--text-secondary)] text-center transition-opacity hover:opacity-65 py-2 text-[0.9375rem] leading-[1.375rem]"
        >
          Continue to Dashboard
        </button>

        <SecureFooter />
      </div>
    </LoginCard>
  );
}

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
    <div className="flex flex-col w-full gap-2">
      {fieldLabel && (
        <label
          htmlFor={rest.id}
          className="font-sans font-medium text-[var(--text-secondary)] text-sm leading-none"
        >
          {fieldLabel}
        </label>
      )}
      <div className="relative flex items-center w-full bg-[var(--surface-page)] h-14 rounded-full">
        {rest.icon && (
          <span className="absolute pointer-events-none flex items-center opacity-50 left-4">
            <rest.icon
              strokeWidth={1.8}
              className="text-[var(--text-secondary)]/60 w-[1.125rem] h-[1.125rem]"
            />
          </span>
        )}
        <input
          id={rest.id}
          type={rest.type || "text"}
          value={rest.value}
          onChange={rest.onChange}
          placeholder={rest.placeholder}
          className={`w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 rounded-full text-base ${rest.icon ? "pl-12" : "pl-4"
            } ${rest.rightEl ? "pr-12" : "pr-4"}`}
        />
        {rest.rightEl && (
          <span className="absolute flex items-center right-4">
            {rest.rightEl}
          </span>
        )}
      </div>
      {rest.error && (
        <p className="font-sans text-red-600 text-xs mt-1">
          {rest.error}
        </p>
      )}
    </div>
  );

  return (
    <LoginCard>
      <CardLogo />

      <div className="mb-6 lg:mb-8">
        <h2 className="font-sans font-bold text-[var(--text-heading)] text-[1.5rem] leading-[2.625rem] m-0 mb-2">
          Change Password
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-base leading-[1.375rem] m-0">
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
          className="flex flex-col flex-1 gap-6"
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
          <div className="mt-4 lg:mt-6">
            <PrimaryButton type="submit" disabled={isLoading} variant="secondary">
              {isLoading ? "Updating..." : "Update Password"}
            </PrimaryButton>
          </div>

          <SecureFooter />
        </form>
      )}
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

      {/* Welcome text — Figma: Plus Jakarta Sans 600, 48px, lh 60px, white */}
      <div className="hidden md:block absolute left-8 md:left-[5vw] lg:left-[6vw] xl:left-[6.875rem] bottom-8 md:bottom-[6vh] lg:bottom-[8vh] max-w-[17.5rem] sm:max-w-[21.25rem] md:max-w-[25rem] xl:max-w-[30rem]">
        <p className="font-sans font-semibold text-white drop-shadow-lg m-0 text-3xl md:text-4xl xl:text-[3rem] leading-tight xl:leading-[3.75rem] tracking-tight">
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
