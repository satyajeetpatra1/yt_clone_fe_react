import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { setUser } from "../redux/slices/authSlice";
import YTLogo from "../assets/Youtube_logo.png";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      // store token
      localStorage.setItem("token", res.data.token);

      // store user in redux + localStorage
      dispatch(setUser(res.data.user));

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded shadow">
        <span className="font-bold text-lg flex gap-x-3 justify-center w-fit mx-auto">
          <img
            src={YTLogo}
            height={40}
            width={40}
            className="mx-auto my-auto"
            alt="YTlogo"
          />
          <span className="my-auto">YouTube</span>
        </span>
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Continue to YouTube
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
