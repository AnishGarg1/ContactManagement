import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { CiEdit } from "react-icons/ci";
import { getContact, updateContact } from '../service/apiUtils/contactAPIs';
import { useDispatch, useSelector } from 'react-redux';

const Contact = () => {
    const { contactId } = useParams();
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const [currContact, setCurrContact] = useState({});

    const [iSEditTitle, setIsEditTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDesc, setEditedDesc] = useState("")
    const [editedStatus, setEditedStatus] = useState("");

    // Saving changes and keep track of chnage
    const [isUpdated, setIsUpdated] = useState(false);

    const handleEditTitle = (e) => {
        setEditedTitle(e.target.value);

        if(e.target.value.trim() !== "" && e.target.value.trim() !== currContact.title){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }

    const handleEditDescription = (value) => {
        setEditedDesc(value);

        if(value.trim() !== "<p><br></p>" && value !== currContact.description){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }

    const handleEditStatus = (e) => {
        setEditedStatus(e.target.value);

        if(e.target.value.trim() !== "" && e.target.value !== currContact.status){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }


    const handleClickCancel = () => {
        setIsEditTitle(false);
        setEditedTitle(currContact.title);
        setEditedDesc(currContact.description);
        setEditedStatus(currContact.status);
        setIsUpdated(false);
    }

    const handleClickSave = async () => {
        const updatedContact = {
            ...currContact,
            title: editedTitle,
            description: editedDesc,
            status: editedStatus,
        }
        
        const result = await updateContact({contactId, ...updatedContact}, token, dispatch);
        if(result){
            setCurrContact(result);
            navigate("/dashboard");
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        const fetchContact = async () => {
            const result = await getContact(contactId, token);
            if(result){
                setCurrContact(result);
                
                setEditedTitle(result.title);
                setEditedDesc(result.description);
                setEditedStatus(result.status);
            }
        }

        fetchContact();
    }, [contactId, token])

  return (
    <div className='p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-8 animate-fadeIn'>
        <div className='flex justify-between items-center mb-4'>
            {iSEditTitle ? (
                <input
                    type='text'
                    value={editedTitle}
                    className='text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none'
                    onChange={(e) => handleEditTitle(e)}
                    onBlur={() => setIsEditTitle(false)}
                    autoFocus
                    placeholder='Type the contact name here...'
                />
            ) : (
                <h1
                    className='text-2xl font-bold text-gray-800 cursor-pointer'
                    onClick={() => setIsEditTitle(true)}
                >
                    {editedTitle || "Type the contact name here..."}
                </h1>
            )}
            <CiEdit 
                className='text-2xl text-gray-500 cursor-pointer hover:text-gray-700 transition-all'
                onClick={() => setIsEditTitle(true)}
            />
        </div>
            
        <div className='mb-4'>
            <label 
                htmlFor='status'
                className='block text-sm font-medium text-gray-600 mb-1'
            >
                Title Status
            </label>
            <select 
                id='status'
                value={editedStatus}
                onChange={(e) => handleEditStatus(e)}
                className='w-full p-2 border rounded-md focus:border-blue-500'
            >
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
        </div>

        <div className='mb-6'>
            <ReactQuill
                value={editedDesc}
                placeholder='Type description here...'
                onChange={(value) => handleEditDescription(value)}
                className='border rounded-md'
            />
        </div>

        <div className='flex gap-2'>
            <button 
                className={`px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 ${
                    isUpdated ? "bg-green-500 hover:bg-green-600" : "bg-green-300 cursor-not-allowed"
                }`}
                disabled={!isUpdated}
                onClick={handleClickCancel}
            >
                Cancel
            </button>
            <button 
                className={`px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 ${
                    isUpdated ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"
                }`}
                disabled={!isUpdated}
                onClick={handleClickSave}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default Contact