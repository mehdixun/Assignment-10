import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter.";
    if (!/\d/.test(password)) return "Password must have a number.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(formData.password);
    if (error) return toast.error(error);

    try {
      await createUser(formData.email, formData.password, formData.name, formData.photo);
      toast.success("✅ Registration successful!");
      setFormData({ name: "", email: "", password: "", photo: "" });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("❌ Registration failed!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("✅ Registered with Google!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("❌ Google sign-in failed!");
    }
  };

  return (
    <div className="card mt-10 mb-20 w-full max-w-sm mx-auto bg-base-100 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL (optional)"
            value={formData.photo}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn w-full bg-indigo-500 text-white hover:bg-indigo-700 transition hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-bold hover:underline">
            Sign in
          </Link>
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full mt-4 bg-white text-black border border-gray-300"
        >
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
