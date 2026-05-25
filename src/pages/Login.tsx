import { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "@/assets/glc-logo.svg";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { setCredentials } from "../features/auth/store/authSlice";
import { useLoginMutation } from "../features/auth/api/authApi";
import { UserRole, ROLE_CODES } from "../features/auth/types";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../components/validations/loginschema";
import { toast } from "sonner";
const MOCK_API_USERS = [
  {
    login_id: "sadmin@glc.com",
    password: "sadmin@123",
    response: {
      id: 101,
      login_id: "sadmin@glc.com",
      first_name: "Super",
      last_name: "Admin",
      role_id: UserRole.SADMIN,
      is_first_login: 0,
      token: "mock-token-sadmin",
      refreshToken: "mock-refresh-token-sadmin",
    },
  },
  {
    login_id: "manager@glc.com",
    password: "manager@123",
    response: {
      id: 102,
      login_id: "manager@glc.com",
      first_name: "Role",
      last_name: "Manager",
      role_id: UserRole.ROLEMNGR,
      is_first_login: 0,
      token: "mock-token-rolemngr",
      refreshToken: "mock-refresh-token-rolemngr",
    },
  },
  {
    login_id: "ccs@glc.com",
    password: "ccs@123456",
    response: {
      id: 103,
      login_id: "ccs@glc.com",
      first_name: "CCS",
      last_name: "Officer",
      role_id: UserRole.CCS,
      is_first_login: 0,
      token: "mock-token-ccs",
      refreshToken: "mock-refresh-token-ccs",
    },
  },
  {
    login_id: "field.officer@glc.com",
    password: "field.officer@123",
    response: {
      id: 104,
      login_id: "field.officer@glc.com",
      first_name: "Field",
      last_name: "Officer",
      role_id: UserRole.FO,
      is_first_login: 0,
      token: "mock-token-fo",
      refreshToken: "mock-refresh-token-fo",
    },
  },
  {
    login_id: "io@glc.com",
    password: "io@123456",
    response: {
      id: 105,
      login_id: "io@glc.com",
      first_name: "Intelligence",
      last_name: "Officer",
      role_id: UserRole.IO,
      is_first_login: 0,
      token: "mock-token-io",
      refreshToken: "mock-refresh-token-io",
    },
  },
  {
    login_id: "regional@glc.com",
    password: "regional@123",
    response: {
      id: 106,
      login_id: "regional@glc.com",
      first_name: "Edward",
      last_name: "Janowski",
      role_id: UserRole.RO,
      is_first_login: 0,
      token: "mock-token-ro",
      refreshToken: "mock-refresh-token-ro",
    },
  },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("john.doe@example.com");
  const [password, setPassword] = useState("MySecret@123");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    login_id?: string;
    password?: string;
  }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrors({});
    const result = loginSchema.safeParse({
      login_id: loginId,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        login_id: fieldErrors.login_id?.[0],
        password: fieldErrors.password?.[0],
      });

      // toast.error("Please fill all required fields");

      return;
    }

    const mockUser = MOCK_API_USERS.find(
      (u) => u.login_id === loginId && u.password === password,
    );

    if (mockUser) {
      const { token, refreshToken, ...userData } = mockUser.response;
      const roleCode = ROLE_CODES[userData.role_id];

      dispatch(
        setCredentials({
          user: { ...userData, role: roleCode },
          accessToken: token,
          refreshToken,
        }),
      );
      
      // Navigate based on role
      if (roleCode === "CCS") {
        navigate("/ccs/dashboard");
      } else if (roleCode === "RO") {
        navigate("/regional-officer/dashboard");
      } else if (roleCode === "FO") {
        navigate("/field-officer/dashboard");
      } else {
        navigate("/role-manager/dashboard");
      }
      return;
    }

    try {
      const response = await login({
        login_id: loginId,
        password,
      }).unwrap();

      const { token, refreshToken, ...userData } = response;
      const roleCode = ROLE_CODES[userData.role_id];

      dispatch(
        setCredentials({
          user: { ...userData, role: roleCode },
          accessToken: token,
          refreshToken,
        }),
      );
      
      // Navigate based on role
      if (roleCode === "CCS") {
        navigate("/");
      } else if (roleCode === "RO") {
        navigate("/regional-officer/dashboard");
      } else if (roleCode === "FO") {
        navigate("/field-officer/dashboard");
      } else {
        navigate("/role-manager/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed:", err);

      toast.error(
        err?.data?.message || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[var(--surface-page)] font-[var(--font-sans)]">
      <div className="flex flex-row items-center w-[clamp(800px,81.1826vw,1560px)] gap-[clamp(48px,6.7361vw,130px)]">
        {/* LOGO */}
        <div className="shrink-0 flex items-center justify-center w-[clamp(300px,36.3215vw,697px)]">
          <img
            src={logo}
            alt="Green Land Capital"
            className="w-full h-auto aspect-[523.03/253.75] object-contain block"
          />
        </div>
        <div
          className="shrink-0 flex flex-col w-[clamp(380px,38.1250vw,732px)] rounded-[clamp(20px,2.2222vw,32px)] bg-[var(--surface-card)] shadow-[0px_1px_3.5px_rgba(0,0,0,0.06)] p-[clamp(32px,3.6111vw,60px)_clamp(28px,3.3333vw,56px)_clamp(24px,2.7778vw,40px)]"
          style={{
            aspectRatio: "clamp(0.784,calc(0.784 + (0.907 - 0.784) * ((100vw - 1024px) / (1280px - 1024px))),0.907)",
          }}
        >
          {/* HEADING */}
          <div className="flex flex-col shrink-0 gap-[clamp(8px,0.9722vw,16px)]">
            <h1 className="m-0 font-bold font-[var(--font-heading)] text-[clamp(24px,2.5000vw,48px)] leading-[1.111] tracking-[-0.9px] text-[var(--text-strong)]">
              Role Manager Login
            </h1>

            <p className="m-0 font-normal font-[var(--font-sans)] text-[clamp(13px,1.1111vw,21px)] leading-[1.625] text-[var(--text-muted)]">
              Secure access for authorised role managers.
              <br />
              Please authenticate to continue.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-[clamp(10px,0.6944vw,12px)] rounded-lg border border-red-200 bg-red-50 px-[clamp(12px,0.8333vw,14px)] py-[clamp(8px,0.5556vw,10px)] font-[var(--font-sans)] text-[clamp(11px,0.8333vw,14px)] text-red-600">
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            className="flex flex-col flex-1 min-h-0 mt-[clamp(28px,2.7778vw,48px)]"
            onSubmit={handleLogin}
          >
            <LoginField
              id="login-id"
              label="Login ID"
              type="text"
              placeholder="Enter your assigned ID"
              autoComplete="username"
              icon={
                <User
                  strokeWidth={1.8}
                  className="opacity-40 w-[clamp(12px,0.9722vw,16px)] h-[clamp(12px,0.9722vw,16px)]"
                />
              }
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            {errors.login_id && (
              <p className="mt-1 text-sm text-red-500">{errors.login_id}</p>
            )}

            <div className="mt-[clamp(18px,1.6667vw,28px)]">
              <LoginField
                id="login-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                autoComplete="current-password"
                icon={
                  <Lock
                    strokeWidth={1.8}
                    className="opacity-40 w-[clamp(12px,0.9722vw,16px)] h-[clamp(12px,0.9722vw,16px)]"
                  />
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelRight={
                  <button
                    type="button"
                    className="border-none bg-transparent cursor-pointer p-0 font-medium leading-[1.43] transition-opacity duration-150 hover:opacity-50 font-[var(--font-sans)] text-[clamp(12px,0.9722vw,18px)] text-[var(--text-muted)]"
                  >
                    Forgot Password?
                  </button>
                }
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="border-none bg-transparent cursor-pointer p-0 flex items-center transition-opacity duration-150 hover:opacity-70 opacity-40"
                  >
                    {showPassword ? (
                      <Eye
                        strokeWidth={1.8}
                        className="w-[clamp(15px,1.2500vw,20px)] h-[clamp(15px,1.2500vw,20px)]"
                      />
                    ) : (
                      <EyeOff
                        strokeWidth={1.8}
                        className="w-[clamp(15px,1.2500vw,20px)] h-[clamp(15px,1.2500vw,20px)]"
                      />
                    )}
                  </button>
                }
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full shrink-0 flex items-center justify-center border-none cursor-pointer font-semibold uppercase transition-all duration-200 active:scale-[0.985] disabled:opacity-50 hover:brightness-90 hover:shadow-[0_4px_20px_rgba(39,128,196,0.28)] mt-[clamp(32px,3.3333vw,56px)] h-[clamp(50px,4.1667vw,80px)] rounded-[clamp(32px,3.3333vw,56px)] bg-[var(--brand-500)] text-white font-[var(--font-sans)] text-[clamp(13px,1.2500vw,24px)] tracking-[0.7px]"
            >
              {isLoading ? "Signing in…" : "Login"}
            </button>

            {/* FOOTER */}
            <div className="flex items-center shrink-0 mt-auto gap-[clamp(10px,1.1111vw,16px)]">
              <ShieldCheck
                strokeWidth={1.8}
                className="shrink-0 opacity-40 text-[var(--text-strong)] w-[clamp(13px,1.1111vw,18px)] h-[clamp(13px,1.1111vw,18px)]"
              />

              <span className="font-[var(--font-sans)] font-normal text-[clamp(11px,0.8333vw,16px)] leading-[1.333] text-[var(--text-muted-strong)]">
                Secured by TechGy Innovations. End-to-end encrypted connection.
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface LoginFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  labelRight?: React.ReactNode;
}

function LoginField({
  label,
  icon,
  rightElement,
  labelRight,
  id,
  ...inputProps
}: LoginFieldProps) {
  return (
    <div className="flex flex-col w-full gap-[clamp(6px,0.5556vw,8px)]">
      {/* LABEL */}
      <div className="flex items-center justify-between min-h-[clamp(17px,1.3889vw,22px)]">
        <label
          htmlFor={id}
          className="font-medium font-[var(--font-sans)] text-[clamp(12px,0.9722vw,18px)] leading-[1.43] text-[var(--text-muted)]"
        >
          {label}
        </label>

        {labelRight && <div>{labelRight}</div>}
      </div>

      {/* INPUT */}
      <div className="relative flex items-center w-full shrink-0 h-[clamp(46px,3.8889vw,75px)] rounded-[clamp(24px,2.2222vw,40px)] bg-[var(--surface-page)]">
        {icon && (
          <span className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center left-[clamp(14px,1.1111vw,18px)]">
            {icon}
          </span>
        )}

        <input
          id={id}
          className={`w-full h-full border-none outline-none bg-transparent font-[var(--font-sans)] font-normal text-[clamp(13px,1.1111vw,18px)] text-[var(--text-primary)] placeholder:text-[var(--text-muted-strong)]
            ${
              icon
                ? "pl-[clamp(34px,3.3333vw,52px)]"
                : "pl-[clamp(16px,1.1111vw,22px)]"
            }
            ${
              rightElement
                ? "pr-[clamp(36px,3.3333vw,52px)]"
                : "pr-[clamp(16px,1.1111vw,22px)]"
            }`}
          {...inputProps}
        />

        {rightElement && (
          <span className="absolute top-1/2 -translate-y-1/2 flex items-center right-[clamp(14px,1.1111vw,18px)]">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}