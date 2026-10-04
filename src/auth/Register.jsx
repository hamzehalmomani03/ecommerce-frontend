import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register(name, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-label">CREATE ACCOUNT</p>

          <h1>Register</h1>

          <p>
            Create an account to start shopping with us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;