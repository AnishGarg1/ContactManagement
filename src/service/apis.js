const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth Endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
}

// Task Endpoints
export const taskEndpoints = {
    CREATE_TASK_API: BASE_URL + "/task/createTask",
    GET_TASK_API: BASE_URL + "/task/getTask",
    GET_ALL_TASKS_API: BASE_URL + "/task/getAllTasks",
    UPDATE_TASK_API: BASE_URL + "/task/updateTask",
    DELETE_TASK_API: BASE_URL + "/task/deleteTask",
}