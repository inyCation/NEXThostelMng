"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './HostelRoomAddForm.scss';
import { ref, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { storage } from '@/lib/firebasestorage';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  title: string;
  price: string;
  description: string;
  capacity: string;
  amenities: string[];
  imageURLs: string[];
}

const HostelAddForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    description: '',
    capacity: '',
    amenities: [],
    imageURLs: [],
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setImages(fileList);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amenities' ? value.split(',').map((item) => item.trim()) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please select at least one image.');
      return;
    }

    try {
      const uploadTasks = images.map((image) => {
        const storageRef = ref(storage, `/images/${image.name}`);
        return uploadBytesResumable(storageRef, image);
      });

      const uploadSnapshots = await Promise.all(uploadTasks);

      const downloadURLs = await Promise.all(
        uploadSnapshots.map(async (uploadSnapshot) => {
          const downloadURL = await getDownloadURL(uploadSnapshot.ref);
          return downloadURL;
        })
      );

      // console.log('Images uploaded successfully:', downloadURLs);

      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          imageURLs: downloadURLs,
        };

        // console.log('Form data after setting imageURLs:', updatedFormData);

        try {
          const signup = async () => {
            return await axios.post('/api/hostel/addhostelroom', { ...updatedFormData })
          }


          toast.promise(
            signup().then((res) => {
              return res;
            }).catch((err) => {
              throw err;
            }),
            {
              loading: 'Adding Hostel in Progress',
              success: (res) => {

                setFormData({
                  title: '',
                  price: '',
                  description: '',
                  capacity: '',
                  amenities: [],
                  imageURLs: [],
                });
                return <b>{res.data.message}</b>
              },
              error: (err) => <b>{err.response!.data.error}</b>,
            }
          );
        } catch (error: any) {
          toast.error(error.message);
        }

        // Now you can use the updated formData for your submission
        // console.log('Form submitted with data:', updatedFormData);

        return updatedFormData;
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="hostel_add_form">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <textarea
          name="amenities"
          placeholder="Amenities (Separate by comma)"
          value={formData.amenities.join(', ')}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleChangeImage} multiple />
        <button type="submit">Add Hostel Room</button>
      </form>
    </div>
  );
};

export default HostelAddForm;
