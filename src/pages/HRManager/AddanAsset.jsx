import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import useAuth from "../../hooks/useAuth";

const AddanAsset = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { productQuantity: 1 },
  });

  const axioSecure = useAxoisSecure();
  const quantity = useWatch({ control, name: "productQuantity" });

  useEffect(() => {
    if (user?.email) {
      setValue("hrEmail", user.email);
    }
  }, [user, setValue]);

  const handleAddAsset = (data) => {
    const assetImg = data.productImage[0];
    const formData = new FormData();
    formData.append("image", assetImg);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

    axios.post(image_API_URL, formData).then((res) => {
      const imageUrl = res.data.data.url;

      const newAsset = {
        name: data.productName,
        image: imageUrl,
        type: data.productType,
        quantity: parseInt(data.productQuantity, 10),
        availableQuantity: parseInt(data.productQuantity, 10),
        dateAdded: new Date(),
        hrEmail: data.hrEmail,
        companyName: data.companyName,
      };

      Swal.fire({
        title: "Save Asset?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          axioSecure.post("/parcels", newAsset).then(() => {
            Swal.fire("Saved!", "Asset added successfully", "success");
          });
        }
      });
    });
  };

  const changeQuantity = (delta) => {
    const newQuantity = Math.max(1, (quantity || 1) + delta);
    setValue("productQuantity", newQuantity);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-black">
      <h2 className="text-3xl font-bold mb-6">Add an Asset</h2>

      <form onSubmit={handleSubmit(handleAddAsset)} className="space-y-4">
        <input
          type="hidden"
          {...register("hrEmail", { required: true })}
        />

        <div>
          <label className="label">Company Name</label>
          <input
            type="text"
            {...register("companyName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.companyName && (
            <span className="text-red-500">Company Name is required</span>
          )}
        </div>

        <div>
          <label className="label">Product Name</label>
          <input
            type="text"
            {...register("productName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.productName && (
            <span className="text-red-500">Product Name is required</span>
          )}
        </div>

        <div>
          <label className="label">Product Image</label>
          <input
            type="file"
            {...register("productImage", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.productImage && (
            <span className="text-red-500">Product Image is required</span>
          )}
        </div>

        <div>
          <label className="label">Product Type</label>
          <select
            {...register("productType", { required: true })}
            className="select select-bordered w-full"
            defaultValue="Returnable"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
          {errors.productType && (
            <span className="text-red-500">Product Type is required</span>
          )}
        </div>

        <div>
          <label className="label">Product Quantity</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => changeQuantity(-1)}
            >
              -
            </button>

            <input
              type="number"
              {...register("productQuantity", { required: true, min: 1 })}
              className="input input-bordered w-20 text-center"
            />

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => changeQuantity(1)}
            >
              +
            </button>
          </div>

          {errors.productQuantity && (
            <span className="text-red-500">Enter a valid quantity</span>
          )}
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full text-black"
          value="Save Asset"
        />
      </form>
    </div>
  );
};

export default AddanAsset;
