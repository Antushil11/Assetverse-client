import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../../SocalLogin/SocalLogin";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxoisSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      // Debug email and password
      console.log("Registering:", data.email, data.password);

      // Make sure a photo is selected
      const profileImg = data.photo[0];
      if (!profileImg) {
        console.error("No profile image selected");
        return;
      }

      // 1️⃣ Register user with Firebase
      await registerUser(data.email, data.password);

      // 2️⃣ Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const res = await axios.post(image_API_URL, formData);
      const photoURL = res.data.data.url;

      // 3️⃣ Save employee to MongoDB
      const employeeInfo = {
        name: data.name,
        email: data.email,
        photoURL,
        role: "employee",
      };
      await axiosSecure.post("/employee", employeeInfo);
      console.log("✅ Employee saved in MongoDB");

      // 4️⃣ Save user in MongoDB users collection
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
      };
      await axiosSecure.post("/users", userInfo);

      // 5️⃣ Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      // 6️⃣ Navigate after success
      navigate(location.state || "/");
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-primary rounded shadow">
      <h3 className="text-3xl text-center">Employee Register</h3>
      <p className="text-center">Please </p>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Enter Your Name"
          />
          {errors.name && <p className="text-red-600">Name is required</p>}

          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
          />
          {errors.photo && <p className="text-red-600">Photo is required</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email pattern
            })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-600">Enter a valid email</p>
          )}


          
          {/* Date of Birth */}
        <label className="label">Date of Birth</label>
        <input
          type="date"
          {...register("dateOfBirth", { required: "Date of Birth is required" })}
          className="input"
        />
        {errors.dateOfBirth && (
          <p className="text-red-600">{errors.dateOfBirth.message}</p>
        )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8, // Must match your regex
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=<>])[A-Za-z\d@$!%*?&^#()_\-+=<>]{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 8 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password must have uppercase, lowercase, number, and special
              character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn bg-primary text-white mt-4 w-full py-2 px-4 rounded hover:bg-accent transition-colors">
            Register
          </button>
        </fieldset>
      </form>

      <p className="text-center mt-4">
        New HR Manager?{" "}
        <Link state={location.state} className="text-red-600 hover:text-secondary " to={"/hrregister"}>
          HR Manager Register
        </Link>
      </p>

      <SocalLogin />
    </div>
  );
};

export default Register;
