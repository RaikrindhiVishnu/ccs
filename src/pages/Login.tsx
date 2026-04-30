import { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "@/assets/glc-logo.svg"
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { setCredentials } from "../features/auth/store/authSlice";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { MOCK_USERS } from "@/core/config/layoutConfig";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("manager@glc.com");
  const [password, setPassword] = useState("manager@123");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const matchedUser = Object.values(MOCK_USERS).find(
      (u) => u.email === loginId
    );

    setTimeout(() => {
      dispatch(
        setCredentials({
          user: {
            id: matchedUser?.role ?? "unknown",
            email: loginId,
            name: matchedUser?.name ?? "User",
            role: matchedUser?.role ?? "ROLE_MANAGER",
          },
          accessToken: `mock-token-${matchedUser?.role ?? "default"}`,
          refreshToken: `mock-refresh-${matchedUser?.role ?? "default"}`,
        })
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[var(--background)] font-sans">
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
              color: "var(--foreground)",
              marginBottom: "clamp(10px, 1.37vh, 18px)",
            }}
          >
            Role Manager Login
          </Typography>

          {/* Subtext */}
          <Typography
            variant="p"
            className="font-normal leading-[1.625] m-0 shrink-0 text-left text-[clamp(11px,1.11vw,21px)] text-[var(--muted)] mb-[clamp(28px,3.71vh,50px)]"
          >
            Secure access for authorised role managers.
            <br /> Please authenticate to continue.
          </Typography>

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
                  className="login-forgot font-sans font-medium bg-transparent border-none cursor-pointer p-0 transition-opacity duration-150 text-[clamp(10px,0.97vw,18px)] text-[var(--muted)] hover:opacity-70"
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
                disabled={loading}
                className="login-btn w-full h-[clamp(45px,5.86vh,78px)] text-[clamp(10px,0.97vw,18px)] font-sans border-none rounded-full cursor-pointer font-semibold uppercase tracking-[0.7px] transition-all duration-200 flex items-center justify-center active:scale-[0.985] disabled:opacity-50 bg-[var(--primary)] text-[var(--card)] hover:bg-[#1e6aaa] hover:shadow-[0_4px_20px_rgba(39,128,196,0.28)]"
              >
                Login
              </button>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center mt-auto shrink-0 pl-[10px] gap-[clamp(6px,1.11vw,21px)] pt-[clamp(12px,1.95vh,26px)] text-[var(--muted)]">
              <ShieldCheck size={16} strokeWidth={1.8} className="shrink-0 opacity-50" />
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