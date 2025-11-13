import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const { signInWithGoogle, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email Login Handler
  const handleEmailLogin = (e) => {
    e.preventDefault();
    loginUser(formData.email, formData.password)
      .then(() => {
        toast.success("🎉 Login successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Login Error:", err);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  // Google Login Handler
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("🎉 Login successful!");
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        console.error("❌ Google Sign-in Error:", error);
        toast.error("Google sign-in failed.");
      });
  };

  return (
    <div className="card mt-10 mb-20 w-full max-w-sm mx-auto bg-base-100 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Login</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-indigo-500 text-white hover:bg-indigo-700 transition hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link className="text-indigo-500 font-bold hover:underline" to="/register">
            Register
          </Link>
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn w-full mt-4 bg-white text-black border border-gray-300 flex items-center justify-center gap-2 hover:scale-105 transition"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="M0 0H512V512H0z" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
