"use client"
import React, { useState, ChangeEvent } from 'react'
import { ref, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { storage } from '@/lib/firebasestorage';

const ImageUploadComp = () => {

    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Check if files exist and the first file is selected.
        if (e.target.files && e.target.files[0]) {
            // Set the selected image file to the state.
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (image) {
            const storageRef = ref(storage, `/images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image)


            uploadTask.on(
                "state_changed",
                (snapshot: UploadTaskSnapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);

                },
                error => {
                    console.log(error.message);
                },
                async () => {
                    console.log("Upload Complete");
                    const downloadURL = await getDownloadURL(storageRef);
                    console.log("Download URL:", downloadURL);

                }
            )
        }
    }




    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}> Upload </button>
        </div>
    )
}

export default ImageUploadComp