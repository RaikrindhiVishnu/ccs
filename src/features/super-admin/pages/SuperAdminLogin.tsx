import { useState } from "react";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import MainLoginBg from "@/assets/main login.svg";
import GlcLogo from "@/assets/glc-logo.svg";
import SharpIcon from "@/assets/sharp.svg";
import { useLoginMutation, useUpdatePasswordMutation, useForgotPasswordMutation } from "@/features/auth/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice";
import { UserRole, ROLE_CODES } from "@/features/auth/types";

// ─── Dev Mock Users ───────────────────────────────────────────────────────────
const MOCK_USERS = [
  { login_id: "superadmin@glc.com", password: "superadmin@123", role_id: UserRole.SADMIN, first_name: "Super", last_name: "Admin", id: 999 },
];

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
  type="text",
  value,
  onChange,
  icon: Icon,
  rightEl,
  labelRight,
  error,
  id,
  className="",
}: InputFieldProps) {
  return (
    <div className={`flex flex-col w-full gap-[clamp(0.375rem,0.4vw,0.5rem)] ${className}`}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between h-5 ">
          {label && (
            <label
              htmlFor={id}
              className="font-sans font-medium text-[var(--text-secondary)] text-[clamp(0.75rem,0.97vw,0.875rem)] lg:text-[0.97vw] leading-none"
            >
              {label}
            </label>
          )}
          {labelRight && (
            <div className="text-[clamp(0.75rem,0.97vw,0.875rem)] lg:text-[0.97vw] font-medium text-[var(--text-secondary)]">
              {labelRight}
            </div>
          )}
        </div>
      )}

      <div className="relative flex items-center w-full bg-[var(--surface-page)] h-[clamp(2.75rem,5.5vh,3.5rem)] min-[1440px]:h-[3.89vw] rounded-full">
        {Icon && (
          <span className="absolute pointer-events-none flex items-center opacity-50 left-[clamp(0.875rem,1.11vw,1.25rem)] lg:left-[1.11vw]">
            <Icon
              strokeWidth={1.8}
              className="text-[var(--text-secondary)] w-[clamp(1rem,1.25vw,1.25rem)] lg:w-[1.11vw] h-[clamp(1rem,1.25vw,1.25rem)] lg:h-[1.11vw]"
            />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-full bg-transparent border-none outline-none font-sans font-normal text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 rounded-full text-[clamp(0.875rem,1.11vw,1rem)] lg:text-[1.11vw] ${Icon ? "pl-[clamp(2.5rem,3.47vw,3.125rem)] lg:pl-[3.33vw]" : "pl-[clamp(0.875rem,1.11vw,1.25rem)] lg:pl-[1.11vw]"
            } ${rightEl ? "pr-[clamp(2.5rem,3.47vw,3.125rem)] lg:pr-[3.33vw]" : "pr-[clamp(0.875rem,1.11vw,1.25rem)] lg:pr-[1.11vw]"
            }`}
        />

        {rightEl && (
          <span className="absolute flex items-center right-[clamp(0.875rem,1.11vw,1.25rem)] lg:right-[1.11vw]">
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
  type="button",
  variant="primary",
  className="",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const bgClass=variant === "primary"
      ? "bg-[var(--brand-500)] hover:bg-[var(--brand-600)] shadow-[0_4px_20px_rgba(39,128,196,0.18)]"
      : "bg-[#3B75C3] hover:bg-[#2F5EA0] shadow-[0_12px_48px_rgba(0,0,0,0.06)]";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${bgClass} border-none text-white font-sans font-bold tracking-[0.04em] cursor-pointer transition-all duration-150 disabled:opacity-55 disabled:cursor-not-allowed hover:brightness-95 active:scale-[0.99] h-[3.25rem] min-[1440px]:h-[3.61vw] rounded-full text-base flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}

function CardLogo({ className="" }: { className?: string }) {
  return (
    <div className={`flex flex-col mb-[clamp(0.75rem,2.5vh,1.5rem)] lg:mb-0 shrink-0 ${className}`}>

      <img
        src={GlcLogo}
        alt="Green Land Capital"
        className="w-[clamp(7.5rem,9.8vw,9.4375rem)] lg:w-[10.49vw] h-auto object-contain"
      />
    </div>
  );
}
function SecureFooter({ className="" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 -pt-[clamp(0.5rem,1.5vh,1rem)] ${className}`}>

      <ShieldCheck
        strokeWidth={1.8}
        className="shrink-0 text-[var(--status-success)] w-4 h-5 lg:w-[1.11vw] lg:h-[1.39vw]"
      />
      <span className="font-sans font-normal text-[var(--text-secondary)]/80 text-xs leading-tight lg:text-[0.83vw] lg:leading-[1.11vw]">
        Secured by TechGy Innovations. End-to-end encrypted connection.
      </span>
    </div>
  );
}

function LoginCard({
  children,
  className="",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 right-4 md:right-[4vw] lg:right-[8.54vw] bg-[var(--surface-card)] flex flex-col box-border shadow-[0px_8px_32px_rgba(0,0,0,0.07)] border border-[var(--border-soft)] rounded-4xl px-[clamp(1.5rem,3.33vw,3rem)] pt-[clamp(1rem,3.5vh,3rem)] pb-[clamp(1rem,3.5vh,2.5rem)] min-[1440px]:pt-[3.26vw] min-[1440px]:pb-[3.26vw] min-[1440px]:px-[3.33vw] lg:px-[3.33vw] w-[calc(100%-2rem)] sm:w-[clamp(25rem,38.19vw,34.375rem)] lg:w-[38.19vw] lg:shadow-[0px_1px_3.5px_rgba(0,0,0,0.06)] lg:rounded-[2.22vw] h-auto max-h-[calc(100vh-2.5rem)] ${className}`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1 lg:overflow-visible lg:pr-0 lg:mr-0 gap-[clamp(1rem,2vh,2rem)] min-[1440px]:gap-0">
        {children}
      </div>
    </div>
  );
}

// ─── SCREEN 1 · Login ─────────────────────────────────────────────────────────
function LoginScreen({
  onSuccess,
  onForgotPassword,
}: {
  onSuccess: (d: { is_first_login: number; passwordUsed: string }) => void;
  onForgotPassword: () => void;
}) {
  const dispatch=useDispatch();
  const [login] = useLoginMutation();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate=() => {
    const e: Record<string, string> = {};
    if (!loginId.trim()) e.loginId="Login ID is required";
    else if (!/\S+@\S+\.\S+/.test(loginId)) e.loginId="Enter a valid email";
    if (!password) e.password="Password is required";
    else if (password.length < 6) e.password="Password must be at least 6 characters";
    return e;
  };

  const handleSubmit=async (e: React.FormEvent) => {
    e.preventDefault();
    const errs=validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const mockUser=MOCK_USERS.find(
      (u) => u.login_id === loginId && u.password === password
    );
    if (mockUser) {
      const roleCode = ROLE_CODES[mockUser.role_id as UserRole] || "SUPERADMIN";
      dispatch(
        setCredentials({
          user: {
            id: mockUser.id,
            login_id: mockUser.login_id,
            first_name: mockUser.first_name,
            last_name: mockUser.last_name,
            role_id: mockUser.role_id,
            role: roleCode,
            is_first_login: 0,
          },
          accessToken: "mock-token-" + roleCode.toLowerCase(),
          refreshToken: "mock-refresh-" + roleCode.toLowerCase(),
        })
      );
      onSuccess({ is_first_login: 0, passwordUsed: password });
      return;
    }

    try {
      setLoading(true);
      const response=await login({ login_id: loginId, password }).unwrap();
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
      onSuccess({ is_first_login: response.is_first_login, passwordUsed: password });
    } catch (err: any) {
      setErrors({ password: err?.data?.error || "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  const EyeBtn=() => (
    <button
      type="button"
      onClick={() => setShowPw((v) => !v)}
      className="border-none bg-transparent cursor-pointer p-0 flex items-center opacity-45 hover:opacity-75 transition-opacity"
      aria-label={showPw ? "Hide password" : "Show password"}
    >
      {showPw ? (
        <Eye strokeWidth={1.8} className="text-[var(--text-secondary)] w-5 h-5" />
      ) : (
        <EyeOff strokeWidth={1.8} className="text-[var(--text-secondary)] w-5 h-5" />
      )}
    </button>
  );

  return (
    <LoginCard className="min-[1440px]:h-[48.68vw]">
      <CardLogo className="min-[1440px]:mb-[1.72vw]" />

      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] lg:mb-0 lg:flex lg:flex-col lg:items-start shrink-0 min-[1440px]:mb-[1.94vw]">
        <h1 className="font-heading font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] lg:text-[1.67vw] lg:leading-[2.78vw] leading-snug tracking-[-0.05625rem] lg:tracking-[-0.06vw] m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-[0.97vw] ">
          Super Admin Login
        </h1>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] lg:text-[1.11vw] lg:leading-[1.81vw] leading-normal m-0">
          Secure access for authorised super admins.
          <br />
          Please authenticate to continue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 gap-[clamp(0.75rem,2.5vh,1.5rem)] w-full"
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
          className="min-[1440px]:mt-[1.67vw]"
        />

        <InputField
          id="login-password"
          label="Password"
          className="min-[1440px]:mt-[1.67vw]"
          placeholder="Enter Password"
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          error={errors.password}
          rightEl={<EyeBtn />}
        />

        <div className="flex justify-end -mt-[clamp(0.25rem,1vh,0.75rem)] min-[1440px]:mt-[0.97vw]">
          <button
            type="button"
            onClick={onForgotPassword}
            className="
      border-none
      cursor-pointer
      p-0
      font-semibold
      text-[#3D4949]
      hover:text-[var(--text-heading)]
      transition-colors
      text-[13px]
      leading-[18px]
      sm:text-[14px]
      sm:leading-[20px]
      lg:text-[0.97vw]
      lg:leading-[1.38vw]
      tracking-normal
      align-middle
      whitespace-nowrap
    "
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-[clamp(1rem,3.5vh,2.5rem)] min-[1440px]:mt-[1.67vw]">
          <PrimaryButton type="submit" disabled={loading} className=" lg:rounded-full lg:text-[1.11vw]">
            {loading ? "Signing in…" : "LOGIN"}
          </PrimaryButton>
        </div>
      </form>

      <SecureFooter className="min-[1440px]:mt-[1.39vw] min-[1440px]:pt-0" />
    </LoginCard>
  );
}

// ─── SCREEN 2 · Forgot Password ───────────────────────────────────────────────
function ForgotPasswordScreen({
  onSuccess,
}: {
  
  onSuccess: (maskedEmail: string) => void;
}) {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const maskEmail=(raw: string) => {
    const [local, domain] = raw.split("@");
    const visible=local.slice(0, Math.min(3, local.length));
    return `${visible}${"X".repeat(Math.max(0, local.length - visible.length))}@${domain}`;
  };

  const handleSubmit=async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return; }
    setError("");
    try {
      await forgotPassword({ login_id: email }).unwrap();
      onSuccess(maskEmail(email));
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <LoginCard className="min-[1440px]:h-[41.81vw]">
      <CardLogo className="min-[1440px]:mb-[1.72vw]" />

      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] lg:mb-0 lg:flex lg:flex-col shrink-0 min-[1440px]:mb-[1.11vw]">
        <h2 className="font-heading font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] lg:text-[1.67vw] lg:leading-[2.92vw] leading-snug tracking-[-0.05625rem] m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-[0.56vw] ">
          Forgot Your Password?
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] lg:text-[1.11vw] lg:leading-[1.53vw] leading-normal m-0 min-[1440px]:max-w-[20.35vw]">
          Enter your Registered Mail to Receive a Temporary Password
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 min-[1440px]:flex-none gap-[clamp(0.75rem,2.5vh,1.5rem)] w-full min-[1440px]:gap-0"
      >
        <InputField
          id="forgot-email"
          label="Enter Registered Mail"
          placeholder="Enter Your Registered Mail Here"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={User}
          error={error}
          className="min-[1440px]:mt-[1.67vw] min-[1440px]:gap-[0.83vw]"
        />

        <div className="mt-[clamp(1rem,3.5vh,2.5rem)] min-[1440px]:mt-[2.36vw]">
          <PrimaryButton type="submit" disabled={isLoading} variant="secondary" className=" lg:rounded-full lg:text-[1.11vw]">
            {isLoading ? "Sending…" : "Send Password"}
          </PrimaryButton>
        </div>
      </form>

      <SecureFooter className="min-[1440px]:mt-[5.21vw] min-[1440px]:pt-0" />
    </LoginCard>
  );
}

// ─── SCREEN 3 · Forgot Password Success ──────────────────────────────────────
function ForgotPasswordSuccessScreen({
  maskedEmail,
  onDone,
}: {
  maskedEmail: string;
  onDone: () => void;
}) {
  return (
    <div className="
 absolute top-1/2 -translate-y-1/2
 right-4 md:right-[4vw] lg:right-[8.54vw]
 bg-white box-border
 border border-[var(--border-soft)]
 shadow-[0px_0px_12.5px_rgba(0,0,0,0.15)]
 rounded-[24px] lg:rounded-[1.67vw]
 w-[calc(100%-2rem)] sm:w-[clamp(25rem,42.36vw,38.125rem)] lg:w-[42.36vw]
 h-auto max-h-[calc(100vh-2.5rem)]
 overflow-y-auto lg:overflow-visible
 px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(1.5rem,4vh,3rem)] lg:px-[2.22vw]
 flex flex-col items-center
 ">
      <h2 className="
 font-sans font-semibold text-black
 text-[clamp(1rem,1.66vw,1.5rem)] lg:text-[1.67vw] lg:leading-[2.08vw]
 text-center m-0 mb-[clamp(1rem,2.5vh,1.5rem)] 
 ">
        Password Sent Successfully
      </h2>

      <div className="
 flex items-center justify-center
 my-[clamp(1rem,2.5vh,1.5rem)] lg:my-0 
 ">
        <img
          src={SharpIcon}
          alt="Success"
          className="w-[clamp(7rem,12.5vw,11.25rem)] lg:w-[12.5vw] h-[clamp(7rem,12.5vw,11.25rem)] lg:h-[12.5vw] object-contain"
        />
      </div>

      <div className="
 flex justify-center
 mb-[clamp(1.5rem,3vh,2rem)] 
 ">
        <p className="
 font-sans font-semibold text-[#3D4949]
 text-[clamp(0.875rem,1.38vw,1.125rem)] lg:text-[1.39vw] lg:leading-[1.74vw]
 text-center m-0 leading-snug
 ">
          We Have Sent a Temporary Password
          <br />
          to {maskedEmail}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onDone}
          className="
 w-full max-w-[clamp(10rem,14.16vw,12.75rem)] lg:w-[14.17vw] lg:max-w-none
 h-[clamp(3rem,4.5vh,4rem)] 
 bg-[#2780C4] hover:bg-[#1f6aaa]
 active:scale-[0.99] transition-all duration-150
 text-white font-sans font-semibold
 text-[clamp(1rem,1.38vw,1.25rem)] lg:text-[1.65vw] lg:leading-[2.08vw]
 border-none cursor-pointer rounded-[56px] lg:rounded-[3.89vw]
 flex items-center justify-center
 "
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 4 · Update Default Password ──────────────────────────────────────
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

      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] lg:mb-0 lg:flex lg:flex-col lg:items-start shrink-0 min-[1440px]:mb-[1.94vw]">
        <h2 className="font-sans font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] lg:text-[1.67vw] lg:leading-[2.78vw] leading-snug m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-[0.97vw] ">
          Update Default Password
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] lg:text-[1.11vw] lg:leading-[1.81vw] leading-normal m-0">
          You are currently logging in with a system-generated password sent to
          your email. For your security, we strongly recommend setting a new
          password now.
        </p>
      </div>

      <div className="flex flex-col flex-1 gap-[clamp(0.75rem,2.5vh,1.5rem)] w-full mt-[clamp(0.75rem,2.5vh,1.5rem)] ">
        <div>
          <PrimaryButton onClick={onSetNew} variant="secondary" className=" lg:rounded-full lg:text-[1.11vw]">
            Set New Password
          </PrimaryButton>
        </div>

        <div className="flex items-center ">
          <button
            type="button"
            onClick={onContinue}
            className="w-full bg-transparent border-none cursor-pointer font-sans font-bold text-[var(--text-secondary)] text-center transition-opacity hover:opacity-65 py-2 text-[clamp(0.875rem,0.97vw,0.9375rem)] lg:text-[1.04vw] lg:leading-[1.53vw] leading-[1.375rem]"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>

      <SecureFooter className="min-[1440px]:mt-[1.39vw] min-[1440px]:pt-0" />
    </LoginCard>
  );
}

// ─── SCREEN 5 · Change Password ───────────────────────────────────────────────
function ChangePasswordScreen({ onDone, oldPassword }: { onDone: () => void; oldPassword: string }) {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate=() => {
    const e: Record<string, string> = {};
    if (!newPw) e.newPw="New password is required";
    else if (newPw.length < 8) e.newPw="Password must be at least 8 characters";
    if (!confirmPw) e.confirmPw="Please confirm your password";
    else if (newPw !== confirmPw) e.confirmPw="Passwords do not match";
    return e;
  };

  const handleSubmit=async (e: React.FormEvent) => {
    e.preventDefault();
    const errs=validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    try {
      await updatePassword({ old_password: oldPassword, new_password: newPw }).unwrap();
      setSuccess(true);
      setTimeout(() => { onDone(); }, 1400);
    } catch (err: any) {
      setErrors({ confirmPw: err?.data?.error || "Failed to update password" });
    }
  };

  const EyeToggle=({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <button
      type="button"
      onClick={toggle}
      className="border-none bg-transparent cursor-pointer p-0 flex items-center opacity-45 hover:opacity-75 transition-opacity"
    >
      {show ? (
        <Eye strokeWidth={1.8} className="text-[var(--text-secondary)]/60 w-5 h-5" />
      ) : (
        <EyeOff strokeWidth={1.8} className="text-[var(--text-secondary)]/60 w-5 h-5" />
      )}
    </button>
  );

  return (
    <LoginCard>
      <CardLogo className="min-[1440px]:mb-[1.72vw]" />

      <div className="mb-[clamp(0.75rem,2.5vh,1.5rem)] lg:mb-0 lg:flex lg:flex-col lg:items-start shrink-0 min-[1440px]:mb-[1.94vw]">
        <h2 className="font-sans font-bold text-[var(--text-heading)] text-[clamp(1.25rem,1.66vw,1.5rem)] lg:text-[1.67vw] lg:leading-[2.78vw] leading-snug m-0 mb-[clamp(0.25rem,0.4vw,0.5rem)] min-[1440px]:mb-[0.97vw] ">
          Change Password
        </h2>
        <p className="font-sans font-normal text-[var(--text-secondary)] text-[clamp(0.875rem,1.11vw,1rem)] lg:text-[1.11vw] lg:leading-[1.81vw] leading-normal m-0">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-6 ">
          <div className="rounded-full bg-[var(--status-success-soft)] flex items-center justify-center w-14 h-14 lg:w-[3.89vw] ">
            <svg className="w-6 h-6 lg:w-[1.67vw] " viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#006D3A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-sans font-semibold text-[var(--status-success)] text-center text-base lg:text-[1.11vw] m-0">
            Password updated successfully!
          </p>
          <p className="font-sans text-[var(--text-secondary)] text-sm lg:text-[0.97vw] m-0">
            Redirecting to dashboard…
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-[clamp(0.75rem,2.5vh,1.5rem)] w-full min-[1440px]:gap-0"
        >
          <InputField
            id="new-password"
            label="New Password"
            placeholder="Enter new password"
            type={showNew ? "text" : "password"}
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            icon={Lock}
            error={errors.newPw}
            rightEl={<EyeToggle show={showNew} toggle={() => setShowNew((v) => !v)} />}
            className="min-[1440px]:mt-[1.67vw]"
          />

          <InputField
            id="confirm-password"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            type={showConfirm ? "text" : "password"}
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            icon={Lock}
            error={errors.confirmPw}
            rightEl={<EyeToggle show={showConfirm} toggle={() => setShowConfirm((v) => !v)} />}
            className="min-[1440px]:mt-[1.67vw]"
          />

          <div className="mt-[clamp(0.75rem,2.5vh,1.5rem)] min-[1440px]:mt-[1.67vw]">
            <PrimaryButton type="submit" disabled={isLoading} variant="secondary" className=" lg:rounded-full lg:text-[1.11vw]">
              {isLoading ? "Updating..." : "Update Password"}
            </PrimaryButton>
          </div>
        </form>
      )}

      <SecureFooter className="min-[1440px]:mt-[1.39vw] min-[1440px]:pt-0" />
    </LoginCard>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      <img src={MainLoginBg} alt="Background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
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
export default function SuperAdminLogin() {
  const navigate=useNavigate();
  type Screen="login" | "update-default" | "change-password" | "forgot-password" | "forgot-success";
  const [screen, setScreen] = useState<Screen>("login");
  const [oldPassword, setOldPassword] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");

  const handleLoginSuccess=({
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
      navigate("/super-admin/dashboard");
    }
  };

  return (
    <div className="fixed inset-0 font-sans overflow-hidden">
      <Background />

      {screen === "login" && (
        <LoginScreen
          onSuccess={handleLoginSuccess}
          onForgotPassword={() => setScreen("forgot-password")}
        />
      )}

      {screen === "forgot-password" && (
        <ForgotPasswordScreen
          onSuccess={(masked) => { setMaskedEmail(masked); setScreen("forgot-success"); }}
        />
      )}

      {screen === "forgot-success" && (
        <ForgotPasswordSuccessScreen
          maskedEmail={maskedEmail}
          onDone={() => setScreen("login")}
        />
      )}

      {screen === "update-default" && (
        <UpdateDefaultPasswordScreen
          onSetNew={() => setScreen("change-password")}
          onContinue={() => navigate("/super-admin/dashboard")}
        />
      )}

      {screen === "change-password" && (
        <ChangePasswordScreen onDone={() => navigate("/super-admin/dashboard")} oldPassword={oldPassword} />
      )}
    </div>
  );
}
