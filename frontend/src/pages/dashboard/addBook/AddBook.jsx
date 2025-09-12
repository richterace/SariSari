import React from 'react'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import SelectField from './SelectField';
import Swal from 'sweetalert2';
import { useAddItemMutation } from '../../../redux/features/items/itemsApi';


const AddBook = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddItemMutation()
  const [imageFileName, setimageFileName] = useState('')


  // const uploadImageToCloudinary = async (file) => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', 'your_upload_preset'); // Set this up in your Cloudinary dashboard

  //     const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
  //         method: 'POST',
  //         body: formData,
  //     });

  //     const data = await res.json();
  //     return data.secure_url; // This is the image URL you can use
  //     };

  // use the above method when you want to deal with dynamic uploading.

  const onSubmit = async (data) => {

    const newBookData = {
      ...data,
      coverImage: imageFileName
    }
    try {

      const result = await Swal.fire({
        title: "Add the book?",
        text: "Are you sure you want to add this book?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!"
      });

      if (result.isConfirmed) {
        await addBook(newBookData).unwrap();
        Swal.fire("Added!", "Book added successfully!", "success");
        reset();
        setimageFileName('')
        setimageFile(null);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again.")
    }

  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'snacks', label: 'Snacks' },
            { value: 'condiments', label: 'Condiments' },
            { value: 'alcohol', label: 'Alcohol' },
            { value: 'softdrinks', label: 'Softdrinks' },
            { value: 'canned', label: 'Canned' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}

        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}

        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook
