import toast from "react-hot-toast";
import { apiConnect } from "../apiConnect";
import { contactEndpoints } from "../apis";
import { setContactsList } from "../../redux/slices/contactSlice";

const {
    CREATE_CONTACT_API,
    GET_CONTACT_API,
    GET_ALL_CONTACTS_API,
    UPDATE_CONTACT_API,
    DELETE_CONTACT_API,
} = contactEndpoints;

export const createContact = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            CREATE_CONTACT_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("CREATE CONTACT API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.contact;
        toast.success("Contact Created Successfully")
    } catch (error) {
        console.log("CREATE CONTACT API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const getContact = async (contactId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            GET_CONTACT_API,
            {
                contactId,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET CONTACT API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response.data.message);
            throw new Error("Error");
        }
        result = response.data.contact;
    } catch (error) {
        console.log("GET CONTACT API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllContacts = async (token, dispatch) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "GET",
            GET_ALL_CONTACTS_API, 
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("GET ALL CONTACTS API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.allContacts;
        dispatch(setContactsList(result));
    } catch (error) {
        console.log("GET ALL CONTACTS API Error:", error);
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId);
    return result;
}

export const updateContact = async (data, token, dispatch) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "PUT",
            UPDATE_CONTACT_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("UPDATE CONTACT API RESPONSE.....", response);

        if(!response.data.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        result = response.data.contact;
        // dispatch(setContactsList(result?.data?.contactsList));
        toast.success("Contact Updated");
    } catch (error) {
        console.log("EDIT CONTACT API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteContact = async (contactId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "DELETE",
            DELETE_CONTACT_API,
            {contactId},
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("DELETE CONTACT API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        toast.success("Contact deleted");
    } catch (error) {
        console.log("DELETE CONTACT API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
}