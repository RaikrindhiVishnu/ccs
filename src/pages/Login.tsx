import { useState } from "react";
import logo from "@/assets/glc-logo.svg";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background)", fontFamily: "var(--font-sans)" }}
    >
      <div
        className="flex flex-row items-center"
        style={{
          width: "clamp(831px, 81.18vw, 1542px)",
          gap: "clamp(67px, 6.74vw, 128px)",
        }}
      >
        {/* ── Logo Side ── */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ flex: "0 0 clamp(372px, 36.32vw, 690px)" }}
        >
          <img
            src={logo}
            alt="Green Land Capital"
            className="w-full h-auto object-contain block"
          />
        </div>

        {/* ── Card ── */}
        <div
          className="flex flex-col flex-shrink-0 box-border"
          style={{
            flex: "0 0 clamp(388px, 38.13vw, 725px)",
            height: "clamp(460px, 59.86vh, 800px)",
            background: "var(--card)",
            boxShadow: "var(--shadow-card)",
            borderRadius: "clamp(22px, 2.22vw, 42px)",
            padding: "clamp(39px, 5.08vh, 68px) clamp(34px, 3.33vw, 63px)",
          }}
        >
          {/* Heading */}
          <h1
            className="font-bold leading-[1.11] tracking-[-0.9px] m-0 flex-shrink-0 text-left"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 2.5vw, 47px)",
              color: "var(--foreground)",
              marginBottom: "clamp(10px, 1.37vh, 18px)",
            }}
          >
            Role Manager Login
          </h1>

          {/* Subtext */}
          <p
            className="font-normal leading-[1.625] m-0 flex-shrink-0 text-left"
            style={{
              fontSize: "clamp(11px, 1.11vw, 21px)",
              color: "var(--muted)",
              marginBottom: "clamp(28px, 3.71vh, 50px)",
            }}
          >
            Secure access for authorised role managers.
            <br /> Please authenticate to continue.
          </p>

          {/* Form */}
          <div className="flex flex-col flex-1">

            {/* ── Login ID Field ── */}
            <div className="flex flex-col" style={{ gap: "clamp(6px, 0.78vh, 10px)" }}>
              <div
                className="flex justify-between items-center"
                style={{ height: "clamp(16px, 1.95vh, 26px)" }}
              >
                <label
                  htmlFor="login-id"
                  className="font-medium leading-none"
                  style={{
                    fontSize: "clamp(10px, 0.97vw, 18px)",
                    color: "var(--muted)",
                  }}
                >
                  Login ID
                </label>
              </div>

              <div
                className="relative flex items-center flex-shrink-0 rounded-full"
                style={{
                  height: "clamp(42px, 5.47vh, 73px)",
                  background: "var(--input)",
                }}
              >
                <span
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center opacity-40"
                  style={{ left: "clamp(13px, 1.11vw, 21px)" }}
                >
                  <User size={16} strokeWidth={1.8} />
                </span>
                <input
                  id="login-id"
                  type="text"
                  placeholder="Enter your assigned ID"
                  autoComplete="username"
                  className="login-input w-full h-full border-none outline-none rounded-full box-border"
                  style={{
                    background: "var(--input)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(11px, 1.11vw, 21px)",
                    padding: "0 clamp(34px, 3.33vw, 63px)",
                  }}
                />
              </div>
            </div>

            {/* ── Password Field ── */}
            <div
              className="flex flex-col"
              style={{
                gap: "clamp(6px, 0.78vh, 10px)",
                marginTop: "clamp(17px, 2.34vh, 31px)",
              }}
            >
              <div
                className="flex justify-between items-center"
                style={{ height: "clamp(16px, 1.95vh, 26px)" }}
              >
                <label
                  htmlFor="login-password"
                  className="font-medium leading-none"
                  style={{
                    fontSize: "clamp(10px, 0.97vw, 18px)",
                    color: "var(--muted)",
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="login-forgot font-medium bg-transparent border-none cursor-pointer p-0 transition-opacity duration-150"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(10px, 0.97vw, 18px)",
                    color:  "var(--muted)",
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <div
                className="relative flex items-center flex-shrink-0 rounded-full"
                style={{
                  height: "clamp(42px, 5.47vh, 73px)",
                  background: "var(--input)",
                }}
              >
                <span
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center opacity-40"
                  style={{ left: "clamp(13px, 1.11vw, 21px)" }}
                >
                  <Lock size={16} strokeWidth={1.8} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  className="login-input w-full h-full border-none outline-none rounded-full box-border"
                  style={{
                    background: "var(--input)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(11px, 1.11vw, 21px)",
                    padding: "0 clamp(34px, 3.33vw, 63px)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0 flex items-center transition-opacity duration-150 opacity-40 hover:opacity-70"
                  style={{ right: "clamp(13px, 1.11vw, 21px)" }}
                >
                  {showPassword ? (
                    <Eye size={18} strokeWidth={1.8} />
                  ) : (
                    <EyeOff size={18} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* ── Submit Button ── */}
            <div className="flex-shrink-0" style={{ marginTop: "clamp(36px, 4.69vh, 63px)" }}>
              <button
                type="submit"
                className="login-btn w-full border-none rounded-full cursor-pointer font-semibold uppercase tracking-[0.7px] transition-all duration-200 flex items-center justify-center active:scale-[0.985]"
                style={{
                  height: "clamp(45px, 5.86vh, 78px)",
                  fontSize: "clamp(10px, 0.97vw, 18px)",
                  fontFamily: "var(--font-sans)",
                  background: "var(--primary)",
                  color: "var(--card)",
                }}
              >
                Login
              </button>
            </div>

            {/* ── Footer ── */}
            <div
              className="flex items-center mt-auto flex-shrink-0 pl-[10px]"
              style={{
                gap: "clamp(6px, 1.11vw, 21px)",
                paddingTop: "clamp(12px, 1.95vh, 26px)",
                color: "var(--muted)",
              }}
            >
              <ShieldCheck size={16} strokeWidth={1.8} className="flex-shrink-0 opacity-50" />
              <span
                className="leading-[1.33]"
                style={{ fontSize: "clamp(9px, 0.83vw, 16px)" }}
              >
                Secured by TechGy Innovations. End-to-end encrypted connection.
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Minimal scoped styles for things Tailwind can't do with CSS vars */}
      <style>{`
        .login-input::placeholder {
          color: rgba(0, 0, 0, 0.4);
        }
        .login-btn:hover {
          background: #1e6aaa !important;
          box-shadow: 0 4px 20px rgba(39, 128, 196, 0.28);
        }
        .login-forgot:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}