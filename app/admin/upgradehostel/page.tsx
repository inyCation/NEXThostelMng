"use client"
import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react'

const page = () => {

    const email = useAppSelector((state) => state.adminLoggedIn.adminEmail);

    useEffect(() => {
        if (!email) {
            window.location.replace('/login'); 
        }
    }, [email]);

    if (!email) {
        return <div>Redirecting...</div>;
    }



    return (
        <div>
            //initiate a axios post request to api/admin/ownerhostels with email 
            and 
        </div>
    )
}

export default page