import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user } = useAuth();
  console.log(user);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      phone: user?.phone || "",
      company: user?.company || "",
    },
  });


  const [profilePic, setProfilePic] = useState(user?.photoURL || null);

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Profile is update",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="mb-4 text-center">
        <img
          src={profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name")}
            className="w-full border p-2 rounded"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Phone</label>
          <input
            {...register("phone")}
            className="w-full border p-2 rounded"
            placeholder="Your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            value={user.email || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Current Company</label>
          <input
            value={user.company || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <button type="submit" className="w-full bg-primary text-white p-2 ">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
