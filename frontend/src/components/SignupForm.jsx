import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { useGlobalContext } from "../context/Context";
import { signUp } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const { isAUthenticated, setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    //     alert("Signup Successful!");
    const response = await signUp(data);
    if (response) {
      const res = await response.json();
      console.log(res);
      setToken(res.token);
      navigate("/");
    } else {
      alert("Signup Failed!");
    }
  };
  return (
    <div className="max-w-lg mx-auto w-full bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Name
          </Label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.name ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <Label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700">
            Date of Birth
          </Label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              required: "Date of Birth is required",
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.dob ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.dob && (
            <p className="text-sm text-red-600 mt-1">{errors.dob.message}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <Label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700">
            Time of Birth
          </Label>
          <input
            type="time"
            id="time"
            {...register("time", {
              required: "Time is required",
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.time ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.time && (
            <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <Label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700">
            Gender
          </Label>
          <select
            id="gender"
            {...register("gender", {
              required: "Gender is required",
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.gender ? "border-red-500" : "border-gray-300"
            )}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <Label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700">
            State
          </Label>
          <input
            type="text"
            id="state"
            {...register("state", {
              required: "State is required",
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.state ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.state && (
            <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <Label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700">
            City
          </Label>
          <input
            type="text"
            id="city"
            {...register("city", {
              required: "City is required",
            })}
            className={clsx(
              "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors.city ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Password */}
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
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
