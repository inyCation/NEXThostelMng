"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './HostelRoomAddForm.scss';
import { ref, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { storage } from '@/lib/firebasestorage';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '@/lib/hooks';

import bgImg from "@/assets/home/loginBg.svg"
import Image from 'next/image'
interface FormData {
  title: string;
  price: string;
  description: string;
  capacity: string;
  location: string;
  pincode: string;
  amenities: string[];
  imageURLs: string[];
  owner: string;
}
const HostelAddForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    description: '',
    capacity: '',
    location: '',
    pincode: '',
    amenities: [],
    imageURLs: [],
    owner: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const ownerEmail = useAppSelector((state) => state.adminLoggedIn.adminEmail)
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
    const capacity = parseInt(formData.capacity, 10);
    if (capacity <= 0) {
      toast.error('Person Capacity Cannot Be Negative or Zero.');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return;
    }
    if (!formData.price.trim()) {
      toast.error('Price is required.');
      return;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      toast.error('Price must be a valid number and cannot be negative.');
      return;
    } 
    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return;
    }
    if (!formData.capacity.trim()) {
      toast.error('Capacity is required.');
      return;
    } else if (isNaN(parseInt(formData.capacity))) {
      toast.error('Capacity must be a valid number.');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required.');
      return;
    }
    if (!formData.pincode.trim()) {
      toast.error('Pincode is required.');
      return;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode.');
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
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          imageURLs: downloadURLs,
          owner: ownerEmail,
        };
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
                  location: '',
                  pincode: '',
                  amenities: [],
                  imageURLs: [],
                  owner: ''
                });
                return <b>{res.data.message}</b>
              },
              error: (err) => <b>{err.response!.data.error}</b>,
            }
          );
        } catch (error: any) {
          toast.error(error.message);
        }
        return updatedFormData;
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="hostel_add_form">
        <div className="bg">
          <Image src={bgImg} fill={true} alt='bgImg' className={'image'} />
        </div>
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
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Enter Pincode"
            value={formData.pincode}
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
          <button type="submit" className='submit'>Add Hostel Room</button>
        </form>
      </div>
    </>

  );
};

export default HostelAddForm;
