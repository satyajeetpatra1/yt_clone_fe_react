import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);
      toast.success(res.data.message || "Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Continue to YouTube
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded bg-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded bg-transparent"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded bg-transparent"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create account
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
