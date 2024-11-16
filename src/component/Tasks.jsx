import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { getAllTasks } from '../service/apiUtils/taskAPIs';
import { useDispatch, useSelector } from 'react-redux';
import TaskModalEdit from './TaskModalEdit';

const Tasks = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { tasksList } = useSelector((state) => state.task);
  
  const [currTaskList, setCurrTaskList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showMoreList, setShowMoreList] = useState([]);

  const [taskModalEdit, setTaskModalEdit] = useState(false);
  const [taskModalEditId, setTaskModalEditId] = useState("");

  const handleClickShowMore = (idx) => {
    setShowMoreList((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };


  const handleClickFilter = (filterType) => {
    setFilter(filterType);
    if(filterType === 'All'){
      setCurrTaskList(tasksList);
      return;
    }
    const filteredTasks = tasksList.filter((task) => task.status === filterType);
    setCurrTaskList(filteredTasks)
  }

  useEffect(() => {
    const fetchTaskList = async () => {
      const fetchedTask = await getAllTasks(token, dispatch);
      
      if(fetchedTask) {
        setCurrTaskList(fetchedTask);
      }
    }
    
    fetchTaskList();
  }, [dispatch, token, taskModalEditId]);

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  }

  const isLength = (description) => {
    return stripHtmlTags(description).length > 80;
  }
  
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 w-11/12 mx-auto'>
        <div className='w-full flex gap-2'>
          <button
            className={`border rounded-md px-2 py-1 ${
            filter === "All" 
            ? "bg-blue-300" 
            : "bg-black bg-opacity-20 hover:text-white hover:scale-110 hover:bg-opacity-80 transition-all duration-200"}`}
            onClick={() => handleClickFilter("All")}
          >
            All Tasks
          </button>

          <button
            className={`border rounded-md px-2 py-1 ${
            filter === "In Progress" 
            ? "bg-blue-300" 
            : "bg-black bg-opacity-20 hover:text-white hover:scale-110 hover:bg-opacity-80 transition-all duration-200"}`}
            onClick={() => handleClickFilter("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`border rounded-md px-2 py-1 ${
            filter === "Pending" 
            ? "bg-blue-300" 
            : "bg-black bg-opacity-20 hover:text-white hover:scale-110 hover:bg-opacity-80 transition-all duration-200"}`}
            onClick={() => handleClickFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={`border rounded-md px-2 py-1 ${
            filter === "Completed" 
            ? "bg-blue-300" 
            : "bg-black bg-opacity-20 hover:text-white hover:scale-110 hover:bg-opacity-80 transition-all duration-200"}`}
            onClick={() => handleClickFilter("Completed")}
          >
            Completed
          </button>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <div className='flex w-full border-2 rounded-md py-1 gap-2 px-2 font-bold'>
            <div className='w-[20%]'>Title</div>
            <div className='w-[50%]'>Description</div>
            <div className='w-[20%] text-center'>Status</div>
            <div className='w-[10%] text-center'>Action</div>
          </div>

          <div className='w-full space-y-2'>
            {
              currTaskList.map((task, idx) => (
                <div
                  key={idx}
                  className='flex gap-2 border-2 w-full rounded-md py-1 px-2'
                >
                  <div className='w-[20%]'>
                    <Link to={`/task/${task._id}`}>
                      <p className=' hover:text-white hover:underline transition-all ease-in-out duration-200'>{task.title}</p>
                    </Link>
                  </div>
                  <div className='w-[50%]'>
                    {
                      !task?.description 
                      ? (
                        <p>...</p>
                      ) : (
                        <p>
                          {showMoreList[idx] || !isLength(task.description)
                            ? <div dangerouslySetInnerHTML={{__html: task.description}}/>
                            : `${stripHtmlTags(task.description).substring(0, 80)}...`
                          }
                          
                          {(isLength(task.description)) && (
                            <button 
                              onClick={() => handleClickShowMore(idx)}
                              className='text-xs text-white hover:text-teal-900'
                            >
                              {showMoreList[idx] ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </p>
                      )
                    }
                  </div>
                  <div className='w-[20%] flex flex-col justify-center items-center'>
                    <span
                      className={`border-2 max-w-max px-2 py-1 text-xs rounded-full ${
                      task.status === 'In Progress'
                      ? "bg-yellow-300" : task.status === 'Pending'
                      ? "bg-red-600" : "bg-green-500"}`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className='w-[10%] flex gap-2 justify-center items-center md:gap-10'>
                    <button
                      onClick={() => navigate(`/task/${task._id}`)}
                    >
                      <FiEdit2
                        className='text-white hover:text-teal-300 hover:scale-110 transition-all duration-200'
                      />
                    </button>
                    <button>
                      <RiDeleteBin6Line
                        onClick={() => {
                          setTaskModalEditId(task._id);
                          setTaskModalEdit(true);
                        }}
                        className='text-white hover:text-red-800 hover:scale-110 transition-all duration-200'
                      />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {
        taskModalEdit
        ? (
            <TaskModalEdit 
              taskId={taskModalEditId} 
              setTaskModalEdit={setTaskModalEdit} 
              setTaskModalEditId={setTaskModalEditId}
            />
        ): (
          <></>
        )
      }
    </div>
  )
}

export default Tasks