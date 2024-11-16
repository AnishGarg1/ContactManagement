import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { CiEdit } from "react-icons/ci";
import { getTask, updateTask } from '../service/apiUtils/taskAPIs';
import { useDispatch, useSelector } from 'react-redux';

const Task = () => {
    const { taskId } = useParams();
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const [currTask, setCurrTask] = useState({});

    const [iSEditTitle, setIsEditTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDesc, setEditedDesc] = useState("")
    const [editedStatus, setEditedStatus] = useState("");

    // Saving changes and keep track of chnage
    const [isUpdated, setIsUpdated] = useState(false);

    const handleEditTitle = (e) => {
        setEditedTitle(e.target.value);

        if(e.target.value.trim() !== "" && e.target.value.trim() !== currTask.title){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }

    const handleEditDescription = (value) => {
        setEditedDesc(value);

        if(value.trim() !== "<p><br></p>" && value !== currTask.description){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }

    const handleEditStatus = (e) => {
        setEditedStatus(e.target.value);

        if(e.target.value.trim() !== "" && e.target.value !== currTask.status){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }


    const handleClickCancel = () => {
        setIsEditTitle(false);
        setEditedTitle(currTask.title);
        setEditedDesc(currTask.description);
        setEditedStatus(currTask.status);
        setIsUpdated(false);
    }

    const handleClickSave = async () => {
        const updatedTask = {
            ...currTask,
            title: editedTitle,
            description: editedDesc,
            status: editedStatus,
        }
        
        const result = await updateTask({taskId, ...updatedTask}, token, dispatch);
        if(result){
            setCurrTask(result);
            navigate("/dashboard");
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        const fetchTask = async () => {
            const result = await getTask(taskId, token);
            if(result){
                setCurrTask(result);
                
                setEditedTitle(result.title);
                setEditedDesc(result.description);
                setEditedStatus(result.status);
            }
        }

        fetchTask();
    }, [taskId, token])

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
                    placeholder='Type the task name here...'
                />
            ) : (
                <h1
                    className='text-2xl font-bold text-gray-800 cursor-pointer'
                    onClick={() => setIsEditTitle(true)}
                >
                    {editedTitle || "Type the task name here..."}
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

export default Task