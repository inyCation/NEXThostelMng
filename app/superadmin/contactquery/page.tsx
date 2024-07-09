'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/main.scss';

import "./style.scss"

import '@/styles/mediaQuery.scss';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAppSelector } from '@/lib/hooks';

interface Contact {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

const Page = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);

    const email = useAppSelector((state) => state.superAdminLoogedIn.superAdminEmail);

    useEffect(() => {
        if (!email) {
            window.location.replace('/login');
        }
    }, [email]);

    if (!email) {

        return <div>Redirecting...</div>;
    }




    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/superadmin/contact');
            if (response.status === 200) {
                setContacts(response.data.contacts);
            } else {
                console.error('Failed to fetch contacts: Unexpected response status', response.status);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);


    const handleDeleteUser = async (messageId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Contact Query?');
        if (confirmDelete) {
            try {
                const response = await axios.post('/api/superadmin/contactdelete', { messageId });
                if (response.status === 200) {
                    toast.success('Contact Query deleted successfully');
                    fetchContacts();
                } else {
                    toast.error('Failed to delete Query');
                }
            } catch (error) {
                toast.error('Error deleting Contact Query');
            }
        }

    }

    const downloadBookingsAsPDF = () => {
        const input = document.getElementById('contactTable');
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgHeight = (canvas.height * 208) / canvas.width;
                pdf.addImage(imgData, 0, 0, 208, imgHeight);
                pdf.save('ContactsQuery.pdf');
            });
        } else {
            toast.error('Error generating PDF');
        }
    };

    return (
        <div className='contactQueryPage'>
            <h1>Contact Queries </h1>
            {loading ? (
                <div>Loading...</div>
            ) : contacts.length === 0 ? (
                <div>No contacts found.</div>
            ) : (
                <table id='contactTable'>
                    <thead>
                        <tr>
                            <th>Message ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td>{contact._id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>{new Date(contact.createdAt).toLocaleString()}</td>
                                <td><button onClick={() => handleDeleteUser(contact._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <button onClick={fetchContacts} disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button className='downloadBtn' onClick={downloadBookingsAsPDF}>Download as PDF</button>
                </table>
            )}
        </div>
    );
};

export default Page;
