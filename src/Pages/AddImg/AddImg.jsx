import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/UseAuth";

const AddImg = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();
    const {user}=useAuth();
    const [axiosSecure] = UseAxiosSecure();
  console.log(user)
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setUploadProgress(0);
    
        const {
         imgages
        } = data;

    
        const imageFiles = data.images;
        const imageUrls = [];
    
        // Upload images
        for (let i = 0; i < imageFiles.length; i++) {
          const formData = new FormData();
          formData.append("image", imageFiles[i]);
    
          const res = await fetch(imageHostingUrl, {
            method: "POST",
            body: formData,
          });
    
          const imgResponse = await res.json();
          if (imgResponse.success) {
            imageUrls.push(imgResponse.data.display_url);
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to upload image. Please try again.",
              timer: 3000,
            });
            setIsSubmitting(false);
            return;
          }
    
          setUploadProgress(((i + 1) / imageFiles.length) * 100);
        }  
        const post = {         
          images: imageUrls,
          postedIn: new Date(),
          authorName: user?.displayName,
          authorEmail:user?.email
        };
    
        try {
         
    
          const response = await fetch(
            "https://pixventory.vercel.app/images",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"},
              body: JSON.stringify(post),
            }
          );
    
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Image added successfully!",
              showConfirmButton: false,
              timer: 3000,
            });
            navigate("/");
            reset();
          } else {
            const errorResponse = await response.json();
            console.error("Server response:", errorResponse);
            throw new Error("Failed to add Image. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            text: error.message,
            timer: 3000,
          });
        } finally {
          setIsSubmitting(false);
          setUploadProgress(0);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen pt-16 ">
           <Helmet>
                <title>Pixventory | Add Imgs</title>
            </Helmet>
            <div className="">
                <h1 className="text-3xl pt-6 text-gray-500 text-center">Please Insert Your Data</h1>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form   onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Images</span>
                            </label>
                            <input type="file"  {...register("images", { required: true })} placeholder="password" multiple className="input input-bordered pt-2" required />
                        </div>
                        <div className="form-control mt-6">
                        <input
              className="border border-accent rounded-full px-4 py-2 w-full text-white bg-accent hover:bg-white hover:text-accent cursor-pointer hover:outline outline-accent"
              type="submit"
              value={isSubmitting ? "Submitting..." : "Submit"}
              disabled={isSubmitting}
            />
                        </div>
                    </form>
                </div>
            </div>
            {isSubmitting && (
        <div className="fixed z-50 bg-white -top-4 min-h-screen w-full flex items-center justify-center mt-4 px-10">
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full "
              style={{ width: `${uploadProgress}%` }}
            ></div>

            <h1 className="text-center text-lg pt-2">
              Uploading {uploadProgress}%
            </h1>
          </div>
        </div>
      )}
        </div>
    )
}

export default AddImg