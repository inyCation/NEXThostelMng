'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/main.scss';
import './style.scss';
import '@/styles/mediaQuery.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '@/lib/hooks';
const Page = () => {
  const [loading, setLoading] = useState(false);
  const email = useAppSelector((state) => state.adminLoggedIn.adminEmail);
  useEffect(() => {
    if (!email) {
      window.location.replace('/login'); 
    }
  }, [email]);
  if (!email) {return <div>Redirecting...</div>;}
  const handleApplyForUpgrade = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/admin/applypremium', { email });
      if (response.status === 200) {
        toast.success('Upgrade request sent successfully. Super admin will review your request.');
      } else {
        toast.error('Failed to send upgrade request');
      }
    } catch (error) {
      toast.error('Error sending upgrade request');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="advertisement-page">
      <Toaster />
      <div className="content-section">
        <h1>Upgrade to Premium</h1>
        <p>
          As a premium member, your listed rooms will be featured prominently on our website, leading to more visibility and higher profits.
          Premium membership allows you to highlight your listings and attract more potential guests.
        </p>
        <h2>Why Upgrade to Premium?</h2>
        <p>
          <strong>1. Increased Visibility:</strong> Premium listings are shown at the top of search results, ensuring maximum exposure to potential guests.
        </p>
        <p>
          <strong>2. Featured Section:</strong> Your property will be included in the featured section, attracting more eyes and increasing booking rates.
        </p>
        <p>
          <strong>3. Advanced Analytics:</strong> Get access to advanced analytics tools to track your performance and optimize your listings.
        </p>
        <p>
          <strong>4. Priority Support:</strong> Enjoy priority customer support to resolve your queries and issues faster.
        </p>
      </div>
      <div className="testimonial-section">
        <h2>What Our Premium Members Say</h2>
        <div className="testimonial">
          <p>
            "Since upgrading to premium, our bookings have increased significantly. The featured section has really helped us stand out."
          </p>
          <span>- John Doe, Hostel Owner</span>
        </div>
        <div className="testimonial">
          <p>
            "The advanced analytics and priority support have been game-changers for us. Highly recommend the premium upgrade."
          </p>
          <span>- Jane Smith, Hotel Owner</span>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Upgrade?</h2>
        
        <button onClick={handleApplyForUpgrade} disabled={!email}>
          {loading ? 'Applying...' : 'Apply for Upgrade'}
        </button>
      </div>

      <div className="final-section">
        <h2>Don't Miss Out!</h2>
        <p>
          Upgrade your account now to take advantage of these exclusive benefits and drive more bookings to your property.
        </p>
        <p>
          If you have any questions, feel free to reach out to our support team. We're here to help you succeed!
        </p>
      </div>
    </div>
  );
};

export default Page;
