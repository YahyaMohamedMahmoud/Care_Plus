import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { addBanner, updateBanner } from "../../Store/Slider/slider";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

export default function AddSlider({ onClose , setSelectedBanner , selectedBanner}) {
  const [photo, setPhoto] = useState(null);
  const { loading } = useSelector((state) => state.banners);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    banner: null,
  });

  const bannerSchema = z.object({
    banner: z
      .instanceof(File, { message: "Photo must be an image." })
      .refine((file) => file?.type?.startsWith("image/"), "The photo must be a valid image file.")
      .refine((file) => !!file, { message: "Banner is required." }),
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({
        ...prev,
        banner: file,
      }));
      setPhoto(URL.createObjectURL(file));
    }
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!selectedBanner) {
          const validatedData = bannerSchema.parse(formValues);
  
          const formData = new FormData();
          Object.entries(validatedData).forEach(([key, value]) => {
            if (key === "banner" && !(value instanceof File)) {         
              return;
            }
            
            formData.append(key, value);
          });
  
          dispatch(addBanner(formData))
            .unwrap()
            .then((response) => {
            //   console.log(response,"ugiug");
              
              setPhoto(null);
              setFormValues({});
              onClose();
            })
            .catch((error) => {
              console.error("Add offer failed:", error);
            });
        } else {
          const formData = new FormData();
  
          
          Object.entries(formValues).forEach(([key, value]) => {
            if (key === "banner" && !(value instanceof File)) {
              return;
            }
            formData.append(key, value);
          });
          
  
          dispatch(updateBanner({ id: selectedBanner.id, formData }))
            .unwrap()
            .then(() => {            
              setFormValues({});
              setPhoto(null);
              setSelectedBanner(null);
              onClose();
            })
            .catch((error) => {
              console.error("Update offer failed:", error);
            });
        }
      } catch (validationError) {
        if (validationError.errors && Array.isArray(validationError.errors)) {
          const fieldErrors = {};
          validationError.errors.forEach((error) => {
            if (error.path && error.message) {
              fieldErrors[error.path[0]] = error.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          console.error("Unexpected validation error:", validationError);
        }
      }
    };



  const handlePhotoDelete = () => {
    setFormValues((prev) => ({
      ...prev,
      banner: null,
    }));
    setPhoto(null);
  };


  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
      if (selectedBanner) {
        setFormValues({
          banner: selectedBanner.banner || null,
        });
        setPhoto(selectedBanner.banner || null);
      } else {
        setFormValues({
          banner: null,
        });
        setPhoto(null);
      }
    }, [selectedBanner]);

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 mx-[0px!important]">
        <div className="bg-white w-[25%] rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">Add Banner</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <div className="">
                <div className="flex flex-row items-start">
                  <div className="flex items-center justify-center w-full mt-1">
                    {photo ? (
                      <div className="relative w-80 h-52 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={photo}
                          alt="Uploaded Preview"
                          className="object-cover w-full h-full"
                        />
                        <button
                          className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-3 text-md"
                          onClick={handlePhotoDelete}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-80 h-52 border border-gray-300 rounded-lg cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-[100%] h-[20%] mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col w-full">
                          <input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            required
                          />
                          {/* {formValues.banner && (
                            <div className="mt-2 text-sm">
                              Photo uploaded: {formValues.banner.name}
                            </div>
                          )} */}
                          {errors.banner && (
                               <div className="text-red-500 text-sm">
                                 {errors.banner}
                               </div>
                             )}
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t">
              <button
                className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="submit"
                   disabled={loading}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {loading ? "Saving..." : "Save"}
                {/* Save */}
              </button>
            </div>
          </form>

          {/* Footer */}
        </div>
      </div>
    </>
  );
}
