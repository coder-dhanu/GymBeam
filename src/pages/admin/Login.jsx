import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      localStorage.setItem("isAdmin", "true"); // Still using this for breadcrumbing the ProtectedRoute for now
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-5">
      <div className="bg-bg-sec p-10 rounded-lg shadow-2xl w-full max-w-md border border-white/5">
        <h2 className="text-4xl italic font-heading mb-8 text-center">
          ADMIN <span className="text-primary">LOGIN</span>
        </h2>

        {error && (
          <div className="bg-primary/20 border border-primary text-primary px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[1px] text-text-sec">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@gymbeam.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-colors duration-300 focus:border-primary font-body"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[1px] text-text-sec">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-colors duration-300 focus:border-primary font-body"
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white px-6 py-4 text-base font-semibold uppercase rounded transition-colors w-full mt-2.5 shadow-[0_0_20px_rgba(233,33,80,0.3)]"
          >
            LOGIN TO DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
