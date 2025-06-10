import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { addOffer, updateOffer } from "../../Store/Offers/offers";

export default function AddOffer({ onClose, selectedOffer, setSelectedOffer , allVendors }) {
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.offers);

  const [formValues, setFormValues] = useState({
    name: "",
    discount: "",
    ArName : '',
    // address: "",
    vendor_id: "",
    // location: "",
    description: "",
    ArDescription:"",
    photo: null,
  });


  const [errors, setErrors] = useState({});

  // Zod validation schema
  const offerSchema = z.object({
    name: z.string().nonempty("The name field is required."),
    ArName: z.string().nonempty("The name field is required."),
    discount: z
      .number()
      .min(1, "Discount must be at least 1%.")
      .max(99, "Discount must be at most 99%.")
      .refine(
        (val) => Number.isInteger(val),
        "Discount must be a whole number."
      ),
    // address: z.string().nonempty('The address field is required.'),
    vendor_id: z.string().nonempty("The place id field is required."),
    // location: z.string().nonempty('The location field is required.').url('Must be a valid URL.'),
    description: z.string().nonempty("The description field is required."),
    ArDescription: z.string().nonempty("The description field is required."),
    photo: z
    .instanceof(File, { message: "Photo must be an image." })
    .refine((file) => file?.type?.startsWith("image/"), "The photo must be a valid image file.")
    .optional(),
  });
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseInt(value, 10) || "" : value, // Parse discount as an integer
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({
        ...prev,
        photo: file,
      }));
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedOffer) {
        const validatedData = offerSchema.parse(formValues);

        const formData = new FormData();
        Object.entries(validatedData).forEach(([key, value]) => {
          if (key === "photo" && !(value instanceof File)) {         
            return;
          }
          
          formData.append(key, value);
        });

        dispatch(addOffer(formData))
          .unwrap()
          .then((response) => {
            console.log(response);
            
            setPhoto(null);
            setFormValues({});
            onClose();
          })
          .catch((error) => {
            console.error("Add offer failed:", error);
          });
      } else {
        if (!formValues.discount) {
          setErrors({ discount: "The discount field is required." });
          return;
        }

        const formData = new FormData();

        
        Object.entries(formValues).forEach(([key, value]) => {
          if (key === "photo" && !(value instanceof File)) {
            return;
          }
          formData.append(key, value);
        });
        

        dispatch(updateOffer({ id: selectedOffer.id, formData }))
          .unwrap()
          .then(() => {            
            setFormValues({});
            setPhoto(null);
            setSelectedOffer(null);
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
      photo: null,
    }));
    setPhoto(null);
  };

  useEffect(() => {
    if (selectedOffer) {
      setFormValues({
        name: selectedOffer.name || "",
        ArName: selectedOffer.ArName || "",
        discount: selectedOffer.discount.slice(0, 2) || 0,
        // address: selectedOffer.address || "",
        vendor_id: selectedOffer.vendor_id || "",
        // location: selectedOffer.location || "",
        description: selectedOffer.description || "",
        ArDescription: selectedOffer.ArDescription || "",
        photo: selectedOffer.photo || null,
      });
      setPhoto(selectedOffer.photo || null);
    } else {
      setFormValues({
        name: "",
        discount: "",
        ArName : '',
        // address: "",
        vendor_id: "",
        // location: "",
        description: "",
        ArDescription: "",
        photo: null,
      });
      setPhoto(null);
    }
  }, [selectedOffer]);
  

  const handleClose = () => {
    // Reset data when closing the form
    setFormValues({});
    setSelectedOffer(null);
    setPhoto(null);
    setErrors({});
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 mx-[0px!important]">
        <div className="bg-white w-[65%] rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">New Offer</h2>
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
              <div className="grid grid-cols-2 gap-4">
                {/* Left Section */}
                <div>
                <div className="name grid grid-cols-2 gap-2">
                  <div className="mb-2 flex flex-row items-center gap-1 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Name_EN:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        name="name"
                        // className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formValues.name}
                        onChange={handleChange}
                        className={`w-full p-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                      />
                      {errors.name && (
                        <div className="text-red-500 text-sm">
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2 flex flex-row items-center gap-1 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Name_Ar:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        name="ArName"
                        // className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formValues.ArName}
                        onChange={handleChange}
                        className={`w-full p-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                      />
                      {errors.ArName && (
                        <div className="text-red-500 text-sm">
                          {errors.ArName}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
                  <div className="mb-2 flex flex-row items-center gap-5 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Discount:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="number"
                        name="discount"
                        value={formValues.discount}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,2}$/.test(value)) {
                            // Limit to 2 digits
                            handleChange(e);
                          }
                        }}
                        max="99" // Ensures no value above 99
                        className={`w-full p-2 border ${
                          errors.discount ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                      />
                      {errors.discount && (
                        <div className="text-red-500 text-sm">
                          {errors.discount}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2 flex flex-row items-center gap-[33px] justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Vendors:
                    </label>
                    <div className="flex flex-col w-full">
                      <select
                        name="vendor_id"
                        value={formValues.vendor_id}
                        onChange={handleChange}
                        className={`w-full p-2 border ${
                          errors.vendor_id ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                      >
                        <option value="">Select Vendor</option>
                        {
                          allVendors.map((vendor) => (
                            <option key={vendor.id} value={vendor.id}>
                             {vendor.name} ({vendor.ArName})
                            </option>
                          ))
                        }
                      </select>

                      {errors.vendor_id && (
                        <div className="text-red-500 text-sm">
                          {errors.vendor_id}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="name grid grid-cols-1 gap-3">
                  
                  <div className="mt-2 flex flex-row items-start gap-1 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Description_EN:
                    </label>
                    <div className="flex flex-col w-full">
                      <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                      {errors.description && (
                        <div className="text-red-500 text-sm">
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-row items-start gap-1 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Description_Ar:
                    </label>
                    <div className="flex flex-col w-full">
                      <textarea
                        name="ArDescription"
                        value={formValues.ArDescription}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                      {errors.ArDescription && (
                        <div className="text-red-500 text-sm">
                          {errors.ArDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  </div>
                
                  {/* <div className="mb-2 flex flex-row items-center gap-5 justify-center">
                <label className="block text-sm font-medium text-gray-700">Address:</label>
                <div className='flex flex-col w-full'>

                <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                </div>
              </div>
              <div className='mb-2 flex flex-row items-center gap-5 justify-center'>
                <label className="block text-sm font-medium text-gray-700">Location:</label>
                <div className='flex flex-col w-full'>
                <input
                    type="text"
                    name="location"
                    value={formValues.location}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />

                  {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                </div>
              </div> */}
                </div>

                {/* Right Section */}
                <div className="flex flex-row items-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo:
                  </label>
                  <div className="flex items-center justify-center w-full mt-1">
                    {photo ? (
                      <div className="relative w-80 h-64 border border-gray-300 rounded-lg overflow-hidden">
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
                        className="flex flex-col items-center justify-center w-80 h-64 border border-gray-300 rounded-lg cursor-pointer"
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
                        {/* <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    /> */}
                        <div className="flex flex-col w-full">
                          <input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                          {formValues.photo && (
                            <div className="mt-2 text-sm">
                              Photo uploaded: {formValues.photo.name}
                            </div>
                          )}
                          {errors.photo && (
                            <div className="text-red-500 text-sm">
                              {errors.photo}
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
              </button>
            </div>
          </form>

          {/* Footer */}
        </div>
      </div>
    </>
  );
}
