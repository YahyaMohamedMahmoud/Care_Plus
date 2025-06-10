import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { doctorSpecial, doctorTitle } from "../../Store/Vendors/vendorsData";
import Select from "react-select";
import { addVendor, updateVendor } from "../../Store/Vendors/vendors";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import {
  fetchArea,
  fetchCities,
  fetchCountries,
} from "../../Store/Origins/origins";

export default function AddVendor({
  onClose,
  selectedVendor,
  setSelectedVendor,
}) {
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const { loading } = useSelector((state) => state.vendors);
  const { countries, cities, area } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const [formValues, setFormValues] = useState({
    name: "",
    ArName: "",
    email: "",
    password: "",
    phone1: "",
    phone2: "",
    phone3: "",
    place_id: 0,
    city_id: 0,
    address: "",
    ArAddress: "",
    description: "",
    ArDescription: "",
    location: "",
    country_id: 0,
    area_id: 0,
    photo: null,
  });
  const [errors, setErrors] = useState({});

  const vendorSchema = z.object({
    name: z.string().nonempty("name_En field is required."),
    ArName: z.string().nonempty("name_Ar field is required."),
    email: z
      .string()
      .email("Invalid email address.")
      .nonempty("Email field is required."),
    password: z.string().nonempty("The password field is required."),
    description: z.string().nonempty("The description field is required."),
    ArDescription: z.string().nonempty("The description field is required."),
    address: z.string().nonempty("Address_en field is required."),
    ArAddress: z.string().nonempty("Address_ar field is required."),
    location: z
      .string()
      .url("Must be a valid URL.")
      .nonempty("The location field is required.")
      .refine((value) => value.startsWith("https://www.google.com/maps/"), {
        message: "Google Maps URLs are required.",
      }),
    place_id: z.string().nonempty("The place field is required."),
    country_id: z.number().min(1, { message: "Country is required" }),
    phone1: z.string().min(1, { message: "Phone_1 is required" }),
    phone2: z.string().optional(),
    phone3: z.string().optional(),
    doctor_title_id: z
      .number()
      .min(1, { message: " doctor_title is required" })
      .optional(),
    doctor_specialization_id: z
      .number()
      .min(1, { message: "doctor_specialization is required" })
      .optional(),
    city_id: z.number().min(1, { message: "City is required" }),
    area_id: z.number().min(1, { message: "Area is required" }),
    photo: z
      .instanceof(File, { message: "Photo must be an image." })
      .refine(
        (file) => file?.type?.startsWith("image/"),
        "Photo must be an image."
      )
      .nullable()
      .optional(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    if (name === "place_id") {
      setSelectedPlace(value);
    }
    if (name === "country_id") {
      setSelectedCountry(value);
    }
  };

  const handleSpecializationChange = (option) => {
    setSelectedSpecialization(option);
    setFormValues((prev) => ({
      ...prev,
      doctor_specialization_id: option ? option.value : "", // Update form data
    }));
  };

  const handleTitleChange = (option) => {
    setSelectedTitle(option);
    setFormValues((prev) => ({
      ...prev,
      doctor_title_id: option ? option.value : "", // Update form data
    }));
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;

    setSelectedCountry(countryId);
    setSelectedCity("");
    if (!cities[countryId]) {
      dispatch(fetchCities({ countryId }));
    }
    setFormValues((prev) => ({
      ...prev,
      country_id: Number(countryId),
    }));
  };

  const handleAreaChange = (selectedOption) => {
    const cityId = selectedOption?.value || "";
    setSelectedCity(cityId);
    setSelectedArea("");

    if (cityId && !area[cityId]) {
      dispatch(fetchArea({ citeId: cityId }));
    }

    // Update form values
    setFormValues((prev) => ({
      ...prev,
      city_id: Number(cityId),
    }));
  };

  const doctorData = doctorSpecial.map((item) => ({
    value: item.id,
    label: item.name + `( ${item.ArabSpecialization})`,
  }));

  const doctorTitleData = doctorTitle.map((item) => ({
    value: item.id,
    label: item.name + `( ${item.ArabTitle})`,
  }));

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
      if (!selectedVendor) {
        const validatedData = vendorSchema.parse(formValues);

        const formData = new FormData();
        Object.entries(validatedData).forEach(([key, value]) => {
          if (key === "photo" && !(value instanceof File)) {
            return;
          }
          formData.append(key, value);
        });
        dispatch(addVendor(formData))
          .unwrap()
          .then((response) => {
            console.log("Vendor added successfully:", response); // Success log
            setPhoto(null);
            setFormValues({});
            onClose();
          })
          .catch((error) => {
            console.error("Add vendor failed:", error); // Error log
          });
      }
      const formData = new FormData();

      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          formData.append(key, value);
        } else if (key !== "photo" && value != null) {
          formData.append(key, value);
        }
      });

      dispatch(updateVendor({ id: selectedVendor.id, formData }))
        .unwrap()
        .then((response) => {
          console.log("Vendor updated successfully:", response);
          setFormValues({});
          setPhoto(null);
          setSelectedVendor(null);
          onClose();
        })
        .catch((error) => {
          console.error("Update vendor failed:", error);
        });
    } catch (validationError) {
      if (validationError.errors && Array.isArray(validationError.errors)) {
        const fieldErrors = {};
        validationError.errors.forEach((error) => {
          if (error.path && error.message) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
        console.log("Validation errors:", fieldErrors);
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
    if (selectedVendor) {
      setFormValues({
        name: selectedVendor.name || "",
        ArName: selectedVendor.ArName || "",
        email: selectedVendor.email || "",
        password: selectedVendor.password || "",
        phone1: selectedVendor.phone1 || "",
        phone2: selectedVendor.phone2 || "",
        phone3: selectedVendor.phone3 || "",
        place_id: selectedVendor.place_id || 0,
        city_id: selectedVendor.city_id || 0,
        address: selectedVendor.address || "",
        ArAddress: selectedVendor.ArAddress || "",
        description: selectedVendor.description || "",
        ArDescription: selectedVendor.ArDescription || "",
        location: selectedVendor.location || "",
        photo: selectedVendor.photo || "",
        area_id: selectedVendor.area_id || 0,
        country_id: selectedVendor.country_id || 0,
      });
      setPhoto(selectedVendor.photo || null);
      setSelectedPlace(selectedVendor.place_id);
      setSelectedCountry(selectedVendor.country_id);
      setSelectedSpecialization(
        doctorData.find(
          (spec) => spec.value === selectedVendor.doctor_specialization_id
        ) || null
      );
      setSelectedTitle(
        doctorTitleData.find(
          (title) => title.value === selectedVendor.doctor_title_id
        ) || null
      );
      setSelectedCity(selectedVendor.city_id || "");
      setSelectedArea(selectedVendor.area_id || "");
    } else {
      setFormValues({
        name: "",
        ArName: "",
        email: "",
        password: "",
        phone1: "",
        phone2: "",
        phone3: "",
        place_id: 0,
        city_id: 0,
        area_id: 0,
        address: "",
        ArAddress: "",
        description: "",
        ArDescription: "",
        location: "",
        country_id: 0,
        photo: null,
      });
      setPhoto(null);
      setSelectedPlace(null);
      setSelectedSpecialization(null);
      setSelectedTitle(null);
      setSelectedCountry("");
      setSelectedArea("");
      setSelectedCity("");
    }
  }, [selectedVendor]);

  const handleClose = () => {
    setFormValues({});
    setSelectedVendor(null);
    setPhoto(null);
    setErrors({});
    onClose();
  };

  const handleAreaChange2 = (selectedOption) => {
    const areaId = selectedOption?.value || "";
    console.log(areaId);

    setSelectedArea(areaId);
    setFormValues((prev) => ({
      ...prev,
      area_id: Number(areaId),
    }));
  };

  useEffect(() => {
    if (selectedCountry && selectedArea) {
      dispatch(fetchCities({ countryId: selectedCountry }));
      dispatch(fetchArea({ citeId: selectedCity }));
    }
  }, [selectedCountry, selectedArea, dispatch]);


  console.log(selectedVendor);
  

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center  justify-center bg-black bg-opacity-50 mx-[0px!important]">
         <div
      className={`bg-white w-[68%] rounded-lg shadow-lg ${
        Object.keys(errors).length || selectedVendor ? "h-[95vh] overflow-y-auto" : "h-auto"
      }`}
    >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">New Vendor</h2>
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
                  {/* Name */}
                  <div className="name grid grid-cols-2 gap-3">
                    <div className="mb-2 flex flex-row items-center gap-2 justify-center">
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
                          className={`w-full p-2 border rounded-md`}
                        />
                        {errors.name && (
                          <div className="text-red-500 text-xs">
                            {errors.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-2 flex flex-row items-center gap-2 justify-center">
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
                          className={`w-full p-2 border rounded-md`}
                        />
                        {errors.ArName && (
                          <div className="text-red-500 text-xs">
                            {errors.ArName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="mb-2 flex flex-row items-center gap-9 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="email"
                        name="email"
                        // className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formValues.email}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md`}
                      />
                      {errors.email && (
                        <div className="text-red-500 text-xs">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Password */}
                  <div className="mb-2 flex flex-row items-center gap-3 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="password"
                        name="password"
                        // className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formValues.password}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md`}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-xs">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="mb-2 flex flex-row items-center gap-9 justify-center">
                    <label className="block text-sm w-[15%] font-medium text-gray-700">
                      Phone1:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="tel"
                        name="phone1"
                        // className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formValues.phone1}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md`}
                      />
                      {errors.phone1 && (
                        <div className="text-red-500 text-xs">
                          {errors.phone1}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Phone 2 && Phone 3*/}
                  <div className="name grid grid-cols-2 gap-3">
                    <div className="mb-2 flex flex-row items-center gap-2 justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone2:
                      </label>
                      <div className="flex flex-col w-full">
                        <input
                          type="tel"
                          name="phone2"
                          value={formValues.phone2}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md`}
                        />
                        {errors.phone2 && (
                          <div className="text-red-500 text-xs">
                            {errors.phone2}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-2 flex flex-row items-center gap-2 justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone3:
                      </label>
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          name="phone3"
                          value={formValues.phone3}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md`}
                        />
                        {errors.phone3 && (
                          <div className="text-red-500 text-xs">
                            {errors.phone3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Places */}
                  <div className="mb-2 flex flex-row items-center gap-[31px] justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Places:
                    </label>
                    <div className="flex flex-col w-full">
                      <select
                        name="place_id"
                        value={formValues.place_id}
                        onChange={handleChange}
                        className={`w-full p-2 border  rounded-md`}
                      >
                        <option value="" className={`text-gray-300`}>
                          Select Place
                        </option>
                        <option value="1">Hospitals - مستشفيات</option>
                        <option value="2">Doctor - طبيب</option>
                        <option value="3">Pharmacies - صيدليات</option>
                        <option value="4">Laboratories - معامل</option>
                        <option value="5">Radiology Center - مراكز أشعة</option>
                        <option value="6">Optics - مراكز بصريات</option>
                      </select>

                      {errors.place_id && (
                        <div className="text-red-500 text-xs">
                          {errors.place_id}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Doctor specialization */}
                  {(selectedPlace == "2" || selectedPlace == 2) && (
                    <div className="mb-2 flex flex-row items-center gap-[31px] justify-center">
                      <label className="block text-sm font-medium w-[60%] text-gray-700">
                        Doctor Specialization
                      </label>
                      <div className="flex flex-col w-full">
                        <Select
                          options={doctorData}
                          value={selectedSpecialization}
                          onChange={handleSpecializationChange}
                          placeholder="Search..."
                          isClearable
                          name="doctor_specialization_id"
                          className="w-full rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                  {/* Doctor Title */}
                  {(selectedPlace == "2" || selectedPlace == 2) && (
                    <div className="mb-2 flex flex-row items-center gap-[31px] justify-center">
                      <label className="block text-sm font-medium w-[60%] text-gray-700">
                        Doctor Title
                      </label>
                      <div className="flex flex-col w-full">
                        <Select
                          options={doctorTitleData}
                          value={selectedTitle}
                          onChange={handleTitleChange}
                          placeholder="Search..."
                          isClearable
                          name="doctor_title_id"
                          className="w-full rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                  {/* Country */}
                  <div className="mb-2 flex flex-row items-center gap-[22px] justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Country:
                    </label>
                    <div className="flex flex-col w-full">
                      <select
                        name="country_id"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className={`w-full p-2 border rounded-md`}
                      >
                        <option value="" className={`text-gray-300`}>
                          Select Country
                        </option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.EngName} ({country.name})
                          </option>
                        ))}
                      </select>

                      {errors.country_id && (
                        <div className="text-red-500 text-xs">
                          {errors.country_id}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCountry && (
                    <div className="mb-2 flex flex-row items-center gap-[42px] justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Cities
                      </label>
                      <div className="flex flex-col w-full">
                        <Select
                          options={cities[selectedCountry]?.map((city) => ({
                            value: city.id,
                            label: `${city.name} (${city.ArabName})`,
                          }))}
                          value={
                            selectedCity
                              ? cities[selectedCountry]
                                  ?.map((city) => ({
                                    value: city.id,
                                    label: `${city.name} (${city.ArabName})`,
                                  }))
                                  .find(
                                    (option) => option.value === selectedCity
                                  )
                              : null
                          }
                          onChange={handleAreaChange}
                          placeholder="Search City..."
                          isClearable
                          name="city_id"
                          className="w-full rounded-md cursor-pointer"
                        />

                        {errors.city_id && (
                          <div className="text-red-500 text-xs">
                            {errors.city_id}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCity && (
                    <div className="mb-2 flex flex-row items-center gap-[42px] justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Area
                      </label>
                      <div className="flex flex-col w-full">
                        <Select
                          options={area[selectedCity]?.map((area) => ({
                            value: area.id,
                            label: `${area.EnArea} (${area.ArArea})`,
                          }))}
                          value={
                            selectedArea
                              ? area[selectedCity]
                                  ?.map((area) => ({
                                    value: area.id,
                                    label: `${area.EnArea} (${area.ArArea})`,
                                  }))
                                  .find(
                                    (option) => option.value === selectedArea
                                  )
                              : null
                          }
                          onChange={handleAreaChange2}
                          placeholder="Search Area..."
                          isClearable
                          name="area_id"
                          className="w-full rounded-md cursor-pointer"
                        />

                        {errors.area_id && (
                          <div className="text-red-500 text-xs">
                            {errors.area_id}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  <div className="name grid grid-cols-2 gap-2">
                    <div className="mb-2 flex flex-row items-center gap-1 justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Address_EN:
                      </label>
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          name="address"
                          value={formValues.address}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md`}
                        />
                        {errors.address && (
                          <div className="text-red-500 text-xs">
                            {errors.address}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-2 flex flex-row items-center gap-1 justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Address_Ar:
                      </label>
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          name="ArAddress"
                          value={formValues.ArAddress}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md`}
                        />
                        {errors.ArAddress && (
                          <div className="text-red-500 text-xs">
                            {errors.ArAddress}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Location */}
                  <div className="mb-2 flex flex-row items-center gap-5 justify-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Location:
                    </label>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        name="location"
                        value={formValues.location}
                        onChange={handleChange}
                        className={`w-full p-2 border  rounded-md`}
                      />

                      {errors.location && (
                        <div className="text-red-500 text-xs">
                          {errors.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col">
                  <div className="flex flex-row items-start w-full space-x-16">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo:
                    </label>
                    <div className="flex items-center justify-start w-full mt-1">
                      {photo ? (
                        <div className="relative w-[58%] h-52 border border-gray-300 rounded-lg overflow-hidden">
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
                          className="flex flex-col items-center justify-center w-[58%] h-52 border border-gray-300 rounded-lg cursor-pointer"
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
                  <div className="name grid grid-row-2 gap-3">
                    <div className="mt-2 flex flex-row items-start gap-1 justify-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Description_EN:
                      </label>
                      <div className="flex flex-col w-full">
                        <textarea
                          name="description"
                          value={formValues.description}
                          onChange={handleChange}
                          rows="2"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                        {errors.description && (
                          <div className="text-red-500 text-xs">
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
                          rows="2"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                        {errors.ArDescription && (
                          <div className="text-red-500 text-xs">
                            {errors.ArDescription}
                          </div>
                        )}
                      </div>
                    </div>
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
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                disabled={loading}
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
