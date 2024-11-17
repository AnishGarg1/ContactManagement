const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth Endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
}

// Contact Endpoints
export const contactEndpoints = {
    CREATE_CONTACT_API: BASE_URL + "/contact/createContact",
    GET_CONTACT_API: BASE_URL + "/contact/getContact",
    GET_ALL_CONTACTS_API: BASE_URL + "/contact/getAllContacts",
    UPDATE_CONTACT_API: BASE_URL + "/contact/updateContact",
    DELETE_CONTACT_API: BASE_URL + "/contact/deleteContact",
}