import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../../SocalLogin/SocalLogin";
import axios from "axios";

const HrRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser,updateUserProfile  } = useAuth();

  const location = useLocation()
  const navigate = useNavigate()
  console.log("register",location )

  const handleRegistrationHr = (data) => {
    

    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(image_API_URL, formData)
        .then(res =>{
            console.log( 'after image upload',res.data.data.url)
             //update user profile
            const userProfile ={
              displayName: data.name,
              photoURL: res.data.data.url,


            }
            updateUserProfile(userProfile)
            .then(() =>{
              console.log('user profile upadte ')
              navigate(location.state || '/')
            })
            .catch(error => console.log(error))

           
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h3 className="text-3xl text-center">Welcome</h3>
      <p className="text-center">Please Register</p>
      <form onSubmit={handleSubmit(handleRegistrationHr)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Enter Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Name is Required</p>
          )}

         

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
            {/* Company Name */}
          <label className="label">Company Name</label>
          <input
            type="text"
            {...register("companyname", { required: true })}
            className="input"
            placeholder="Company Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Company Name is Required</p>
          )}

           {/*Company  Photo */}
          <label className="label">Company Photo</label>

          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Enter Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Photo is Required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=<>])[A-Za-z\d@$!%*?&^#()_\-+=<>]{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password must have uppercase Pascal, a lowercase coparent, a
              number, and a spot characte
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-primary text-white mt-4 w-full py-2 px-4 rounded hover:bg-accent transition-colors">
            Register
          </button>
        </fieldset>
        {/* <p>
          Already have a account{" "}
          <Link state={location.state} className="text-secondary" to={"/login"}>
            Login
          </Link>
        </p> */}
      </form>
      <SocalLogin></SocalLogin>
    </div>
  );
};

export default HrRegister;
