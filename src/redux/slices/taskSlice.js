import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    // task: null,
    tasksList: [],
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // setTask(state, action) {
        //     state.task = action.payload;
        // },
        setTasksList(state, action) {
            state.tasksList = action.payload;
        },
    }
})

export const { setLoading, setTask, setTasksList } = taskSlice.actions;
export default taskSlice.reducer;