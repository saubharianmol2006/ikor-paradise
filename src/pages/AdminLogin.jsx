import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (username === "admin" && password === "Admin@123") {
      localStorage.setItem("ikorAdminLoggedIn", "true");
      navigate("/admin");
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-overlay"></div>

      <div className="admin-login-card">

        {/* BRAND */}
        <div className="admin-brand">
          <div className="admin-brand-icon">IK</div>

          <h1>IKOR</h1>
          <h2>PARADISE</h2>

          <p>HOTEL • BANQUET • RESTAURANT</p>
        </div>

        <div className="admin-login-divider"></div>

        {/* HEADING */}
        <div className="admin-login-heading">
          <h3>Welcome Back</h3>
          <p>Sign in to Hotel Management</p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="admin-login-form">

          {/* USERNAME */}
          <div className="admin-input-group">
            <label>USERNAME</label>

            <div className="admin-input-wrapper">

              <span className="admin-input-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />

            </div>
          </div>

          {/* PASSWORD */}
          <div className="admin-input-group">
            <label>PASSWORD</label>

            <div className="admin-input-wrapper">

              <span className="admin-input-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c5 0 8.5 3.2 10 7-0.5 1.3-1.2 2.5-2.2 3.5" />
                    <path d="M6.1 6.1C4.1 7.3 2.7 9.1 2 12c1.5 3.8 5 7 10 7 1.6 0 3-.3 4.3-.9" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>

            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="admin-login-error">
              <span className="error-icon">!</span>
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="admin-login-button"
          >
            SIGN IN TO DASHBOARD

            <span className="login-arrow">→</span>
          </button>

        </form>

        {/* SECURITY */}
        <div className="admin-login-footer">
          <span className="security-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
              />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </span>

          <p>Authorized Hotel Staff Only</p>
        </div>

        {/* BACK */}
        <button
          className="back-to-website"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;