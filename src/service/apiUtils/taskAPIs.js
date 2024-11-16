import toast from "react-hot-toast";
import { apiConnect } from "../apiConnect";
import { taskEndpoints } from "../apis";
import { setTasksList } from "../../redux/slices/taskSlice";

const {
    CREATE_TASK_API,
    GET_TASK_API,
    GET_ALL_TASKS_API,
    UPDATE_TASK_API,
    DELETE_TASK_API,
} = taskEndpoints;

export const createTask = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            CREATE_TASK_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("CREATE TASK API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.task;
        toast.success("Task Created Successfully")
    } catch (error) {
        console.log("CREATE TASK API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const getTask = async (taskId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            GET_TASK_API,
            {
                taskId,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET TASK API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response.data.message);
            throw new Error("Error");
        }
        result = response.data.task;
    } catch (error) {
        console.log("GET TASK API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllTasks = async (token, dispatch) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "GET",
            GET_ALL_TASKS_API, 
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("GET ALL TASKS API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.allTasks;
        dispatch(setTasksList(result));
    } catch (error) {
        console.log("GET ALL TASKS API Error:", error);
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId);
    return result;
}

export const updateTask = async (data, token, dispatch) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "PUT",
            UPDATE_TASK_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("UPDATE TASK API RESPONSE.....", response);

        if(!response.data.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        result = response.data.task;
        // dispatch(setTasksList(result?.data?.tasksList));
        toast.success("Task Updated");
    } catch (error) {
        console.log("EDIT TASK API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteTask = async (taskId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "DELETE",
            DELETE_TASK_API,
            {taskId},
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("DELETE TASK API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        toast.success("Task deleted");
    } catch (error) {
        console.log("DELETE TASK API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
}