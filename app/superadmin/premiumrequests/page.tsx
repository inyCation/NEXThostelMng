'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/main.scss';
import './style.scss';
import '@/styles/mediaQuery.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '@/lib/hooks';

interface Admin {
    _id: string;
    email: string;
    username: string;
    premiumApplied: boolean;
    premium: boolean
}

const Page = () => {

    const email = useAppSelector((state) => state.superAdminLoogedIn.superAdminEmail);

    useEffect(() => {
        if (!email) {
            window.location.replace('/login'); 
        }
    }, [email]);

    if (!email) {
       
        return <div>Redirecting...</div>;
    }


    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPremiumRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/superadmin/listpremiumrequests');
            if (response.status === 200) {
                setAdmins(response.data.premiumRequests);
            } else {
                console.error('Failed to fetch premium requests: Unexpected response status', response.status);
            }
        } catch (error) {
            console.error('Failed to fetch premium requests:', error);
            toast.error('Failed to fetch premium requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPremiumRequests();
    }, []);

    const deleteRequest = async (email: string) => {
        const confirmUpgrade = window.confirm('Are you sure you want to delete request of this user?');
        if (confirmUpgrade) {
            try {
                const response = await axios.post('/api/superadmin/listpremiumrequestsdelete', { email });
                if (response.status === 200) {
                    console.log(response.data.success);

                    toast.success(`User Request Deleted`);
                    fetchPremiumRequests();
                } else {
                    toast.error('Failed to Delete User Request');
                }
            } catch (error: any) {

                toast.error(`${error.response.data.error}`);
            }
        }
    }


    const handleUpgradeUser = async (userEmail: string, status: boolean) => {

        const confirmUpgrade = window.confirm('Are you sure you want to upgrade this user?');
        if (confirmUpgrade) {
            try {
                const response = await axios.post('/api/superadmin/upgrade', { email: userEmail, status });
                if (response.status === 200) {
                    console.log(response.data.success);

                    toast.success(`User Upgraded: ${response.data.success}`);
                    fetchPremiumRequests();
                } else {
                    toast.error('Failed to Upgrade user');
                }
            } catch (error: any) {

                toast.error(`${error.response.data.error}`);
            }
        }
    }

    return (
        <div className='premiumRequestsTablepage' >
            <Toaster />
            <h1>Premium Upgrade Requests</h1>

            {admins.length === 0 ? (
                <div>No premium requests found.</div>
            ) : (
                <table id='premiumRequestsTable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Premium Applied</th>
                            <th>Premium State</th>
                            <th>Delete Request</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin._id}>
                                <td>{admin._id}</td>
                                <td>{admin.email}</td>
                                <td>{admin.username}</td>
                                <td>{admin.premiumApplied ? 'Yes' : 'No'}</td>
                                <td>{admin.premium ? 'premium' : "non-premium"}</td>

                                <td>
                                    <button onClick={() => deleteRequest(admin.email)}>Delete</button>

                                </td>
                                <td>
                                    <button onClick={() => handleUpgradeUser(admin.email, true)}>Premium</button>
                                    <button onClick={() => handleUpgradeUser(admin.email, false)}>Non-Premium</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <button onClick={fetchPremiumRequests} disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </table>
            )}
        </div>
    );
};

export default Page;
