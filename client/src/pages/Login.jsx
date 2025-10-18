import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginUser } from "../apicalls/auth";
import { login } from "../redux/Auth/Auth";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Username or Phone cannot be empty" })
    .min(3, {
      message: "Username or Phone must be at least 6 characters long",
    }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at maximum 20 characters long" }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (user) => {
    setLoading(true);

    const response = await loginUser(user);

    if (response?.success) {
      localStorage.setItem("token", response.token);
      dispatch(login(response.user));
      setLoading(false);
      toast.success(response.message);
      navigate("/dashboard");
    } else {
      setLoading(false);
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-emerald-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-emerald-500 text-white font-bold text-2xl rounded-xl flex items-center justify-center shadow-sm">
              ₵
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to your{" "}
            <span className="text-emerald-600 font-medium">Cash-Tracker</span>{" "}
            account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Identifier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username or Phone
            </label>
            <input
              type="text"
              placeholder="john.doe"
              {...register("identifier")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none text-gray-800 placeholder-gray-400 transition-all"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              {...register("password")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none text-gray-800 placeholder-gray-400 transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
