import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { login } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setToken } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      if (res.ok) {
        const { token } = await res.json();
        console.log(res);
        setToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg px-4 py-3">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.email ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.password ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
