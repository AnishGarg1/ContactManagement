import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    // contact: null,
    contactsList: [],
}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // setContact(state, action) {
        //     state.contact = action.payload;
        // },
        setContactsList(state, action) {
            state.contactsList = action.payload;
        },
    }
})

export const { setLoading, setContact, setContactsList } = contactSlice.actions;
export default contactSlice.reducer;