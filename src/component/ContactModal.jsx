import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { createContact } from '../service/apiUtils/contactAPIs';
import { useNavigate } from 'react-router-dom';

const ContactModal = ({ setIsModalOpen }) => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    
    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePhone = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleChangeCompany = (e) => {
        setCompany(e.target.value);
    }

    const handleChangeJobTitle = (e) => {
        setJobTitle(e.target.value);
    }

    const handleClickCancel = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setCompany("");
        setJobTitle("");
        setIsModalOpen(false);
    }

    const handleClickSave = async () => {
        const contactData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            company,
            jobTitle
        };
        
        const result = await createContact(contactData, token);
        if(result){
            setIsModalOpen(false);
            navigate("/dashboard");
        }
    }

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-xl'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>Add New Contact</h2>
                <IoIosCloseCircleOutline
                    className='text-2xl text-gray-500 cursor-pointer'
                    onClick={() => setIsModalOpen(false)}
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-600 mb-1'
                >
                    First Name
                </label>
                <input 
                    type='text'
                    id='firstName'
                    value={firstName}
                    onChange={handleChangeFirstName}
                    className='w-full p-2 border rounded-md focus:border-blue-500'
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-600 mb-1'
                >
                    Last Name
                </label>
                <input 
                    type='text'
                    id='lastName'
                    value={lastName}
                    onChange={handleChangeLastName}
                    className='w-full p-2 border rounded-md focus:border-blue-500'
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-600 mb-1'
                >
                    Email
                </label>
                <input 
                    type='email'
                    id='email'
                    value={email}
                    onChange={handleChangeEmail}
                    className='w-full p-2 border rounded-md focus:border-blue-500'
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='phoneNumber'
                    className='block text-sm font-medium text-gray-600 mb-1'
                >
                    Phone Number
                </label>
                <input 
                    type='text'
                    id='phoneNumber'
                    value={phoneNumber}
                    onChange={handleChangePhone}
                    className='w-full p-2 border rounded-md focus:border-blue-500'
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='company'
                    className='block text-sm font-medium text-gray-600 mb-1'
                >
                    Company
                </label>
                <input 
                    type='text'
                    id='company'
                    value={company}
                    onChange={handleChangeCompany}
                    className='w-full p-2 border rounded-md focus:border-blue-500'
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='jobTitle'
                    className='block text-sm font-medium text-gray-600 mb-1'
                >
                    Job Title
                </label>
                <input 
                    type='text'
                    id='jobTitle'
                    value={jobTitle}
                    onChange={handleChangeJobTitle}
                    className='w-full p-2 border rounded-md focus:border-blue-500'
                />
            </div>
            <div className='flex gap-2'>
                <button 
                    className='px-4 py-2 rounded-md font-semibold text-white bg-gray-500 hover:bg-gray-600'
                    onClick={handleClickCancel}
                >
                    Cancel
                </button>
                <button 
                    className='px-4 py-2 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600'
                    onClick={handleClickSave}
                >
                    Save
                </button>
            </div>
        </div>
    </div>
  )
}

export default ContactModal;
