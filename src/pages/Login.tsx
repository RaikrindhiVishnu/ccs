import { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "@/assets/glc-logo.svg"
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { setCredentials } from "../features/auth/store/authSlice";
import { useLoginMutation } from "../features/auth/api/authApi";
import { UserRole, ROLE_CODES } from "../features/auth/types";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

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
    password: "ccs@123",
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
    password: "io@123",
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
  {
    login_id: "vo@glc.com",
    password: "vo@123",
    response: {
      id: 107,
      login_id: "vo@glc.com",
      first_name: "Verification",
      last_name: "Officer",
      role_id: UserRole.VO1,
      is_first_login: 0,
      token: "mock-token-vo1",
      refreshToken: "mock-refresh-token-vo1",
    },
  },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("john.doe@example.com");
  const [password, setPassword] = useState("MySecret@123");
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Check for Mock Users first
    const mockUser = MOCK_API_USERS.find(
      (u) => u.login_id === loginId && u.password === password
    );

    if (mockUser) {
      const { token, refreshToken, ...userData } = mockUser.response;
      const roleCode = ROLE_CODES[userData.role_id];
      dispatch(
        setCredentials({
          user: {
            ...userData,
            role: roleCode,
          },
          accessToken: token,
          refreshToken: refreshToken,
        })
      );
      
      // Navigate based on role
      if (roleCode === "CCS") {
        navigate("/ccs/dashboard");
      } else if (roleCode === "RO") {
        navigate("/regional-officer/dashboard");
      } else if (roleCode === "FO") {
        navigate("/field-officer/dashboard");
      } else if (roleCode === "VO1") {
        navigate("/verification-officer/dashboard");
      } else {
        navigate("/role-manager/dashboard");
      }
      return;
    }

    // 2. If not a mock user, call real API
    try {
      const response = await login({ login_id: loginId, password }).unwrap();
      
      const { token, refreshToken, ...userData } = response;
      const roleCode = ROLE_CODES[userData.role_id];
      
      dispatch(
        setCredentials({
          user: {
            ...userData,
            role: roleCode,
          },
          accessToken: token,
          refreshToken: refreshToken,
        }),
      );
      
      // Navigate based on role
      if (roleCode === "CCS") {
        navigate("/ccs/dashboard");
      } else if (roleCode === "RO") {
        navigate("/regional-officer/dashboard");
      } else if (roleCode === "FO") {
        navigate("/field-officer/dashboard");
      } else if (roleCode === "VO1") {
        navigate("/verification-officer/dashboard");
      } else {
        navigate("/role-manager/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[var(--surface-page)] font-sans">
      <div className="flex flex-row items-center w-[clamp(831px,81.18vw,1542px)] gap-[clamp(67px,6.74vw,128px)]">
        {/* ── Logo Side ── */}
        <div className="flex items-center justify-center shrink-0 flex-[0_0_clamp(372px,36.32vw,690px)]">
          <img
            src={logo}
            alt="Green Land Capital"
            className="w-full h-auto object-contain block"
          />
        </div>

        {/* ── Card ── */}
        <Card className="flex flex-col shrink-0 box-border rounded-[var(--radius-xl)] flex-[0_0_clamp(388px,38.13vw,725px)] h-[clamp(460px,59.86vh,800px)] p-[clamp(39px,5.08vh,68px)_clamp(34px,3.33vw,63px)]">
          {/* Heading */}
          <Typography
            variant="h1"
            className="font-bold leading-[1.11] tracking-[-0.9px] m-0 flex-shrink-0 text-left"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 2.5vw, 47px)",
              color: "var(--text-primary)",
              marginBottom: "clamp(10px, 1.37vh, 18px)",
            }}
          >
            Role Manager Login
          </Typography>

          {/* Subtext */}
          <Typography
            variant="p"
            className="font-normal leading-[1.625] m-0 shrink-0 text-left text-[clamp(11px,1.11vw,21px)] text-[var(--text-muted)] mb-[clamp(28px,3.71vh,50px)]"
          >
            Secure access for authorised role managers.
            <br /> Please authenticate to continue.
          </Typography>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col flex-1" onSubmit={handleLogin}>
            {/* ── Login ID Field ── */}
            <Input
              id="login-id"
              type="text"
              label="Login ID"
              placeholder="Enter your assigned ID"
              autoComplete="username"
              icon={<User size={16} strokeWidth={1.8} />}
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />

            {/* ── Password Field ── */}
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter Password"
              autoComplete="current-password"
              icon={<Lock size={16} strokeWidth={1.8} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              containerClassName="mt-[clamp(17px,2.34vh,31px)]"
              labelRightElement={
                <button
                  type="button"
                  className="login-forgot font-sans font-medium bg-transparent border-none cursor-pointer p-0 transition-opacity duration-150 text-[clamp(10px,0.97vw,18px)] text-[var(--text-muted)] hover:opacity-70"
                >
                  Forgot Password?
                </button>
              }
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="bg-transparent border-none cursor-pointer p-0 flex items-center transition-opacity duration-150 opacity-40 hover:opacity-70"
                >
                  {showPassword ? (
                    <Eye size={18} strokeWidth={1.8} />
                  ) : (
                    <EyeOff size={18} strokeWidth={1.8} />
                  )}
                </button>
              }
            />

            {/* ── Submit Button ── */}
            <div className="shrink-0 mt-[clamp(36px,4.69vh,63px)]">
              <button
                type="submit"
                disabled={isLoading}
                className="login-btn w-full h-[clamp(45px,5.86vh,78px)] text-[clamp(10px,0.97vw,18px)] font-sans border-none rounded-full cursor-pointer font-semibold uppercase tracking-[0.7px] transition-all duration-200 flex items-center justify-center active:scale-[0.985] disabled:opacity-50 bg-[var(--brand-500)] text-[var(--surface-card)] hover:bg-[#1e6aaa] hover:shadow-[0_4px_20px_rgba(39,128,196,0.28)]"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center mt-auto shrink-0 pl-[10px] gap-[clamp(6px,1.11vw,21px)] pt-[clamp(12px,1.95vh,26px)] text-[var(--text-muted)]">
              <ShieldCheck
                size={16}
                strokeWidth={1.8}
                className="shrink-0 opacity-50"
              />
              <Typography
                variant="span"
                className="leading-[1.33] text-[clamp(9px,0.83vw,16px)]"
              >
                Secured by TechGy Innovations. End-to-end encrypted connection.
              </Typography>
            </div>

          </form>
        </Card>
      </div>
    </div>
  );
}