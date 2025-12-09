import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocalLogin from "../SocalLogin/SocalLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const {signInUser} = useAuth()

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
    .then(result =>{
        console.log(result)
        
    })
    .catch(error =>{
        console.log(error)
    })
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h3 className="text-3xl text-center">Welcome back</h3>
        <p className="text-center">Please Login</p>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is Required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              {" "}
              Password must be 6 characters or longer
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to AssetVerse <Link className="text-secondary"  to={'/register'}>Register</Link></p>
      </form>
      <SocalLogin></SocalLogin>
    </div>
  );
};

export default Login;
