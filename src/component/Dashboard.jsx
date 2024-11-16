import React, { useState } from 'react'
import Tasks from './Tasks';
import { IoMdAddCircleOutline } from "react-icons/io"
import TaskModal from './TaskModal';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    // const [taskList, setTaskList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

  return (
    <div className='w-full relative'>
        <div className={`w-full`}>
            <div className='flex items-center justify-between mb-5 mt-5 px-5 md:w-11/12 mx-auto'>
                <p className='text-xl font-bold text-white'>Hello, {`${user.firstName} ${user.lastName}`}</p>
                <div 
                    className='flex items-center gap-1 cursor-pointer hover:text-white  hover:scale-110 transition-all duration-200 relative group'
                    onClick={() => setIsModalOpen(true)}
                >
                    <p className='relative z-10'>
                        Create Task
                    </p>
                    <IoMdAddCircleOutline
                        className='text-xl'
                    />
                    <span className='absolute left-1/2 bottom-0 h-[2px] bg-white transition-all duration-300 w-0 group-hover:w-full transform -translate-x-1/2'></span>
                </div>
            </div>
            
            <Tasks/>
        </div>

        {isModalOpen
        ? (
            <TaskModal setIsModalOpen={setIsModalOpen}/>
        ): (
            <></>
        )}
    </div>
  )
}

export default Dashboard