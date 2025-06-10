import React, { useState } from 'react';
import image from "../../img/user.jpg";
import { AiFillEdit } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addTeamMember } from '../../Store/Teams/teams';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddTeamTarget() {
  const navigate = useNavigate();
  
  const schema = z.object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    photo: z
    .instanceof(File)
    .refine(file => file && file.type.match(/image\/(jpeg|png|jpg|gif|svg)/))
    .optional(),
  });

  const dispatch = useDispatch();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); 

  // Form state
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    photo: null,
    facebook:'',
    linkedin:''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Errors state
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && !imageUploaded) {
      setFormValues((prev) => ({
        ...prev,
        photo: file,
      }));
      setImagePreview(null);
      setImageUploaded(true);
    }
  };
  
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = schema.safeParse(formValues);

    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('first_name', formValues.first_name);
    formData.append('last_name', formValues.last_name);
    formData.append('email', formValues.email);
    formData.append('phone', formValues.phone);
    formData.append('facebook', formValues.facebook);
    formData.append('linkedin', formValues.linkedin);
    formData.append('password', formValues.password);
    formData.append('role', formValues.role);
    formData.append('photo', formValues.photo);

    dispatch(addTeamMember(formData)); 
    toast.success('Team member added successfully!');
    setTimeout(() => {
      navigate('/teams');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Add Team Member</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Profile Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            
            {/* Profile Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <div className="relative w-52 mx-auto">
                <img
                  src={imagePreview || formValues.photo ? URL.createObjectURL(formValues.photo) : image} // Preview image or default// Preview image or default // Default or selected image
                  alt="Profile"
                  className="rounded-full w-52 h-52"
                />
                <div className="absolute bottom-[15px] right-[20px] flex justify-center space-x-2">
                  <label className="bg-[#2697E0] w-full flex items-center justify-center text-center p-2 text-white rounded-full cursor-pointer hover:bg-[#1d8ad3]">
                    <AiFillEdit />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*"
                      name="photo"
                    />
                  </label>
                </div>
              </div>
                  {/* {errors.photo && <p className="text-red-500 text-sm text-center">{errors.photo}</p>} */}
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder='First Name'
                value={formValues.first_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                  placeholder='Last Name'
                value={formValues.last_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                  placeholder='Email'
                value={formValues.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                  placeholder='Phone'
                value={formValues.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

                {/* Facebook */}
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
           <input
              type="url"
              name='facebook'
              onChange={handleChange}
              placeholder="Enter Facebook URL"
              className="w-full border border-gray-300 rounded-md p-2"
            />

          </div>

          {/* LinkedIn */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
            <input
              type="url"
              name='linkedin'
              onChange={handleChange}
              placeholder="Enter LinkedIn URL"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

          </div>

          {/* Permissions Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Permissions</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
          </div>

        </div>

        <div className="mt-6">
          <button type="submit" className="bg-blue-500 w-40 py-3 text-white px-4 rounded-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
