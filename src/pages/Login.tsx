import { useState } from "react";
import logo from "@/assets/glc-logo.svg";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <style>{`
        .login-root {
          position: fixed;
          inset: 0;
          background: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
         font-family: var(--font-sans);
        }
        .login-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: clamp(831px, 81.18vw, 1542px);
          gap: clamp(67px, 6.74vw, 128px);   /* 97/1440 = 6.74vw */
        }
        .login-logo-side {
          flex: 0 0 clamp(372px, 36.32vw, 690px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-logo-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .login-card {
          flex: 0 0 clamp(388px, 38.13vw, 725px);
          height: clamp(460px, 59.86vh, 800px);
          background: var(--card);
          box-shadow: 0px 1px 3.5px rgba(0,0,0,0.06);
          border-radius: clamp(22px, 2.22vw, 42px);     /* 32/1440 */
          padding: clamp(39px, 5.08vh, 68px) clamp(34px, 3.33vw, 63px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          /* Card internally uses flex — this ensures footer always visible */
        }
        .text-heading {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(24px, 2.5vw, 47px);
          line-height: 1.11;
          letter-spacing: -0.9px;
          color: var(--foreground);
          margin: 0 0 clamp(10px, 1.37vh, 18px);
          flex-shrink: 0;
          text-align: left
        }
        .text-body {
          font-size: clamp(11px, 1.11vw, 21px);
          font-weight: 400;
          line-height: 1.625;
          color: var(--muted-foreground);
          margin: 0 0 clamp(28px, 3.71vh, 50px);
          flex-shrink: 0;
            text-align: left
        }
        .login-form {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.78vh, 10px);
        }
        .login-field + .login-field {
          margin-top: clamp(17px, 2.34vh, 31px);   /* 24/1024 */
        }

        .login-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: clamp(16px, 1.95vh, 26px);        /* 20/1024 */
        }
        .login-label {
          font-weight: 500;
          font-size: clamp(10px, 0.97vw, 18px);
          color: var(--muted-foreground);
          line-height: 1;
        }
        .login-forgot {
          font-weight: 500;
          font-size: clamp(10px, 0.97vw, 18px);
          color: var(--primary-foreground);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          transition: color 0.15s;
        }
        .login-forgot:hover {
  color: var(--primary);
}
        .login-input-wrap {
          position: relative;
          height: clamp(42px, 5.47vh, 73px);
          background:var(--input);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .login-input {
          width: 100%;
          height: 100%;
          background:var(--input);
          border: none;
          outline: none;
          padding: 0 clamp(34px, 3.33vw, 63px);
          font-family: inherit;
          font-size: clamp(11px, 1.11vw, 21px);
          color: var(--foreground);
          border-radius: inherit;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: rgba(0,0,0,0.4); }

        .login-icon-left {
          position: absolute;
          left: clamp(13px, 1.11vw, 21px);
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.4;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        .login-icon-right {
          position: absolute;
          right: clamp(13px, 1.11vw, 21px);
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.4;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: opacity 0.15s;
        }
        .login-icon-right:hover { opacity: 0.7; }

        /*
          Button spacer: 48px top → 48/1024 = 4.69vh  MIN=36  MAX=63
          Button height: 60px → 60/1024 = 5.86vh  MIN=45  MAX=78
          Font: 14px → 0.97vw
        */
        .login-btn-wrap {
          margin-top: clamp(36px, 4.69vh, 63px);
          flex-shrink: 0;
        }
        .login-btn {
          width: 100%;
          height: clamp(45px, 5.86vh, 78px);
          background: var(--primary);
          color: var(--card);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 600;
          font-size: clamp(10px, 0.97vw, 18px);
          letter-spacing: 0.7px;
          text-transform: uppercase;
          transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-btn:hover {
          background: #1e6aaa;
          box-shadow: 0 4px 20px rgba(39,128,196,0.28);
        }
        .login-btn:active { transform: scale(0.985); }
        .login-footer {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.11vw, 21px);
          margin-top: auto;          
          padding-top: clamp(12px, 1.95vh, 26px);
          flex-shrink: 0;
          padding-left:10px;
        }
        .login-footer-text {
          font-size: clamp(9px, 0.83vw, 16px);
          line-height: 1.33;
          color: rgba(0,0,0,0.4);
        }

        @media (max-width: 1200px) {
          .login-wrapper {
            width: 85vw;
            gap: clamp(40px, 5vw, 80px);
          }
        }

        /* ── Below 1024px: vertical stack, allow scroll ── */
        @media (max-width: 1023px) {
          .login-root {
            position: static;
            min-height: 100vh;
            overflow: auto;
            padding: 48px 20px;
            align-items: flex-start;
          }
          .login-wrapper {
            flex-direction: column;
            width: 100%;
            max-width: 440px;
            gap: 28px;
            margin: 0 auto;
          }
          .login-logo-side {
            flex: none;
            width: 100%;
            max-width: 240px;
            margin: 0 auto;
          }
          .login-card {
            flex: none;
            width: 100%;
            height: auto;
            padding: 32px 24px;
            border-radius: 22px;
          }
          .text-heading        { font-size: 24px; }
          .text-body     { font-size: 14px; margin-bottom: 20px; }
          .login-label,
          .login-forgot       { font-size: 13px; }
          .login-input        { font-size: 14px; }
          .login-input-wrap   { height: 48px; }
          .login-btn          { height: 50px; font-size: 12px; }
          .login-btn-wrap     { margin-top: 24px; }
          .login-footer       { margin-top: 20px; padding-top: 0; }
          .login-footer-text  { font-size: 11px; }
        }
      `}</style>

            <div className="login-root">
                <div className="login-wrapper">

                    {/* ── Logo ── */}
                    <div className="login-logo-side">
                        <img src={logo} alt="Green Land Capital" className="login-logo-img" />
                    </div>

                    {/* ── Card ── */}
                    <div className="login-card">

                        <h1 className="text-heading">Role Manager Login</h1>
                        <p className="text-body">
                            Secure access for authorised role managers.<br /> Please authenticate to continue.
                        </p>

                        <div className="login-form">

                            {/* Login ID */}
                            <div className="login-field">
                                <div className="login-label-row">
                                    <label className="login-label" htmlFor="login-id">Login ID</label>
                                </div>
                                <div className="login-input-wrap">
                                    <span className="login-icon-left">
                                        <User size={16} strokeWidth={1.8} />
                                    </span>
                                    <input
                                        id="login-id"
                                        type="text"
                                        className="login-input"
                                        placeholder="Enter your assigned ID"
                                        autoComplete="username"
                                    />
                                </div>
                            </div>
                            <div className="login-field">
                                <div className="login-label-row">
                                    <label className="login-label" htmlFor="login-password">Password</label>
                                    <button className="login-forgot" type="button">Forgot Password?</button>
                                </div>
                                <div className="login-input-wrap">
                                    <span className="login-icon-left">

                                        <Lock size={16} strokeWidth={1.8} />
                                    </span>
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        className="login-input"
                                        placeholder="Enter Password"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        className="login-icon-right"
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <Eye size={18} strokeWidth={1.8} />

                                        ) : (
                                            <EyeOff size={18} strokeWidth={1.8} />

                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="login-btn-wrap">
                                <button className="login-btn" type="submit">Login</button>
                            </div>
                            <div className="login-footer">
                                <ShieldCheck size={16} strokeWidth={1.8} />

                                <span className="login-footer-text">
                                    Secured by TechGy Innovations. End-to-end encrypted connection.
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}