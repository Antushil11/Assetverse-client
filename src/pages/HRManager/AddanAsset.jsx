import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Building2, 
  Package, 
  Image as ImageIcon, 
  Hash, 
  ArrowLeft,
  Loader2,
  Box,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AddanAsset = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: { productQuantity: 1 },
  });

  const quantity = useWatch({ control, name: "productQuantity" });

  useEffect(() => {
    if (user?.email) {
      setValue("hrEmail", user.email);
    }
  }, [user, setValue]);

  const handleAddAsset = async (data) => {
    try {
      const assetImg = data.productImage[0];
      const formData = new FormData();
      formData.append("image", assetImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

      const res = await axios.post(image_API_URL, formData);
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

      const confirmResult = await Swal.fire({
        title: "Confirm New Asset",
        text: "Are you sure you want to add this asset to your inventory?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Add Asset",
        confirmButtonColor: "#4F46E5",
      });

      if (confirmResult.isConfirmed) {
        await axiosSecure.post("/parcels", newAsset);
        Swal.fire({
          icon: "success",
          title: "Asset Added",
          text: "The new asset has been successfully added to your inventory.",
          showConfirmButton: false,
          timer: 2000
        });
        navigate("/HR-Manager/Asset-List");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add asset. Please try again.", "error");
    }
  };

  const changeQuantity = (delta) => {
    const newQuantity = Math.max(1, (quantity || 1) + delta);
    setValue("productQuantity", newQuantity);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link 
          to="/HR-Manager/Asset-List"
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New Asset</h1>
          <p className="text-gray-500 font-medium">Expand your inventory with new equipment or resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleAddAsset)} className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
              <input type="hidden" {...register("hrEmail", { required: true })} />

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Building2 size={14} /> Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  {...register("companyName", { required: true })}
                  className={`w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 transition-all font-bold ${
                    errors.companyName ? "focus:ring-red-200" : "focus:ring-primary/20"
                  }`}
                />
                {errors.companyName && <span className="text-xs text-red-500 font-bold ml-2">This field is required</span>}
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Package size={14} /> Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. MacBook Pro M3"
                  {...register("productName", { required: true })}
                  className={`w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 transition-all font-bold ${
                    errors.productName ? "focus:ring-red-200" : "focus:ring-primary/20"
                  }`}
                />
                {errors.productName && <span className="text-xs text-red-500 font-bold ml-2">This field is required</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Type */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Layers size={14} /> Product Type
                  </label>
                  <select
                    {...register("productType", { required: true })}
                    className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                  >
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                  </select>
                </div>

                {/* Product Quantity */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Hash size={14} /> Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => changeQuantity(-1)}
                      className="w-12 h-14 bg-gray-100 rounded-xl flex items-center justify-center font-black hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      {...register("productQuantity", { required: true, min: 1 })}
                      className="flex-grow bg-gray-50 border-0 rounded-2xl px-4 py-4 text-center outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black"
                    />
                    <button
                      type="button"
                      onClick={() => changeQuantity(1)}
                      className="w-12 h-14 bg-gray-100 rounded-xl flex items-center justify-center font-black hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <ImageIcon size={14} /> Product Image
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    {...register("productImage", { required: true })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl px-8 py-10 flex flex-col items-center justify-center gap-4 group-hover:border-primary/50 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-primary shadow-sm transition-all">
                      <PlusCircle size={28} />
                    </div>
                    <p className="text-sm font-bold text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                {errors.productImage && <span className="text-xs text-red-500 font-bold ml-2">Please select an image</span>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Save Asset <ArrowRight size={24} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <Box className="absolute -right-4 -bottom-4 opacity-10" size={120} />
            <h4 className="text-xl font-black mb-4">Inventory Tip</h4>
            <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">
              Assign high-value items as "Returnable" to ensure they are tracked and collected when an employee leaves the company.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-widest mb-1">Quick Fact</p>
              <p className="text-sm font-bold">Standardized naming helps in faster reporting and tracking.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="text-lg font-black text-gray-900 mb-4">Live Preview</h4>
            <div className="w-full aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 text-gray-300">
              <ImageIcon size={48} />
              <p className="text-xs font-bold">No image selected</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddanAsset;

