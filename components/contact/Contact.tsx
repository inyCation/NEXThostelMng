"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import bgImg from "@/assets/home/loginBg.svg"
import './ContactForm.scss';
const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validateEmail = (email: string) => {
            return emailValidationPattern.test(email);
        };
        if (!validateEmail(formData.email)) {
            setResponseMessage('Please enter a valid email address.');
            return;
        }
        try {
            const response = await axios.post('/api/user/contact', formData);
            setResponseMessage(response.data.message);
            setFormData({
                name: '',
                email: '',
                message: ''
            })
        } catch (error: any) {
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className='contactUsPage'>
            <div className="bg">
                <Image src={bgImg} fill={true} alt='bgImg' className={'image'} />
            </div>
            <div className="contact-form-container">
                <h2 >Contact Us</h2>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default ContactForm;
