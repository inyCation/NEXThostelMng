'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/main.scss';
import './style.scss';
import '@/styles/mediaQuery.scss';
import toast, { Toaster } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAppSelector } from '@/lib/hooks';

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;

}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
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






  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/superadmin/listallusers');
      if (response.status === 200) {
        setUsers(response.data.users);
      } else {
        console.error('Failed to fetch users: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const downloadBookingsAsPDF = () => {
    const input = document.getElementById('userTable');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgHeight = (canvas.height * 208) / canvas.width;
        pdf.addImage(imgData, 0, 0, 208, imgHeight);
        pdf.save('users.pdf');
      });
    } else {
      toast.error('Error generating PDF');
    }
  };


  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await axios.post('/api/superadmin/deleteuser', { email: userId, typeofuser: "user" });
        if (response.status === 200) {
          toast.success('User deleted successfully');
          fetchUsers();
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  };

  return (
    <div className='listUsersPage'>
      <Toaster />
      <h1>List of Users</h1>

      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <table id='userTable'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className='downloadBtn' onClick={downloadBookingsAsPDF}>Download as PDF</button>
        </table>
      )}
    </div>
  );
};

export default Page;
