import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, fetchCountries, postArea } from "../../Store/Origins/origins";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { updateArea } from "../../Store/Area/area";

export default function AddArea({ onClose , selectedArea , setSelectedArea }) {

    const dispatch = useDispatch();
    
    const { countries ,  cities , postStatus} = useSelector((state) => state.countries);
    const [isEditMode, setIsEditMode] = useState(false);
  
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [formData, setFormData] = useState({
      EnArea: "",
      ArArea: "",
    });
  
    useEffect(() => {
      dispatch(fetchCountries());
    }, [dispatch]);
  
  const handleCountryChange = (e) => {
      const countryId = e.target.value;
      setSelectedCountry(countryId);
      setSelectedCity('');
      if (!cities[countryId]) {
        dispatch(fetchCities({ countryId }));
      }
    };
  
    const handleCityChange = (e) => {
      setSelectedCity(e.target.value);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
      
    //   if (!formData.EnArea || !formData.ArArea) {
    //     toast.error("All fields are required.");
    //     return;
    //   }
    //   const data = {
    //     ...formData,
    //     city_id: selectedCity,
    //     country_id: selectedCountry,
    //   };
    //   dispatch(postArea(data)).then((action) => {
    //     if (action.type === 'area/postArea/fulfilled') {
    //       setFormData({
    //         EnArea: "",
    //         ArArea: "",
    //       });
    //       setSelectedCountry("");
    //       setSelectedCity("");
    //       onClose();
    //     }
    //   });
    // };
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Validate form values (you can replace this with your validation logic or schema)
        if (!formData.EnArea || !formData.ArArea) {
          throw new Error("Both English and Arabic Area names are required.");
        }
    
        if (!selectedCountry) {
          throw new Error("Please select a country.");
        }
    
        if (!selectedCity) {
          throw new Error("Please select a city.");
        }
    
        const validatedData = {
          ...formData,
          city_id: selectedCity,
          country_id: selectedCountry,
        };
    
        // Create FormData object to handle any potential file uploads in the future
        const formDataObj = new FormData();
        Object.entries(validatedData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });
    
        if (!selectedArea) {
          // Add new area
          dispatch(postArea(formDataObj))
            .unwrap()
            .then((response) => {
              console.log("Area added successfully:", response);
    
              // Reset form values
              setFormData({ EnArea: "", ArArea: "" });
              setSelectedCountry("");
              setSelectedCity("");
              onClose();
            })
            .catch((error) => {
              console.error("Add area failed:", error);
            });
        } else {
          // Update existing area
          dispatch(updateArea({ id: selectedArea.id, formData: formDataObj }))
            .unwrap()
            .then(() => {
              console.log("Area updated successfully");
    
              // Reset form values
              setFormData({ EnArea: "", ArArea: "" });
              setSelectedCountry("");
              setSelectedCity("");
              setSelectedArea(null);
              onClose();
            })
            .catch((error) => {
              console.error("Update area failed:", error);
            });
        }
      } catch (error) {
        // Handle validation errors
        console.error("Validation error:", error);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    };
    
    
    const resetForm = () => {
      setFormData({
        EnArea: "",
        ArArea: "",
      });
      setSelectedCountry("");
      setSelectedCity("");
      setSelectedArea(null);
      setIsEditMode(false);
    };
    
    const handleClose = () => {
      setFormData({});
      resetForm();
      onClose();
    };

    useEffect(() => {
      if (selectedCountry && selectedArea) {
        dispatch(fetchCities({ countryId: selectedCountry }));
      }
    }, [selectedCountry, selectedArea, dispatch]);

    useEffect(() => {
      if (selectedArea) {
        setFormData({
          EnArea: selectedArea.EnArea || "",
          ArArea: selectedArea.ArArea || "",
        });
        setSelectedCountry(selectedArea.country_id || "");
        setSelectedCity(selectedArea.city_id || "");
      } else {
        setFormData({
          EnArea: "",
          ArArea: "",
        });
        setSelectedCountry("");
        setSelectedCity("");
      }
    }, [selectedArea]);

  return (
   <>
     <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 mx-[0px!important]">
        <div className="bg-white w-[40%] p-5 rounded-lg shadow-lg">
             <div className="flex items-center justify-between py-2">
               <h1 className="text-lg font-bold">Add Area</h1>
                      <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        <IoMdClose />
                      </button>
                    </div>

          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <div>
                {/* Country */}
                <div className="mb-2 flex flex-row items-center gap-[26px] justify-center">
                  <label className="block text-sm font-medium w-[10%] text-gray-700">
                    Country:
                  </label>
                  <div className="flex flex-col w-full">
                    <select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      name="country_id"
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
                  </div>
                </div>

                {/* Cities */}

                <div className="mb-2 flex flex-row items-center gap-[7px] justify-center">
                  <label className="block text-sm font-medium w-[15%] text-gray-700">
                    Cities
                  </label>
                  <div className="flex flex-col w-full">
                    <select
                      value={selectedCity}
                      name="city_id"
                      onChange={handleCityChange}
                      className={`w-full p-2 border rounded-md`}
                    >
                      <option value="" className={`text-gray-300`}>
              Select City
            </option>
            {cities[selectedCountry]?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} ({city.ArabName})
              </option>
            ))}
                    </select>
                  </div>
                </div>

                {/* Origins */}
                <div className="mb-2 flex flex-row items-center gap-5 justify-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Area_EN:
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      name="EnArea"
                      value={formData.EnArea}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md`}
                    />
                  </div>
                </div>

                <div className="mb-2 flex flex-row items-center gap-5 justify-center">
                  <label className="block text-sm font-medium text-gray-700">
                  Area_AR:
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      name="ArArea"
                      value={formData.ArArea}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4">
            <button
                className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={handleClose}
              >
                Close
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                 {postStatus === 'loading' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>

        </div>
      </div>
   </>
  )
}
