import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { getContact, updateContact } from "../service/apiUtils/contactAPIs";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
    const { contactId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [currContact, setCurrContact] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    // Editable state for all fields
    const [editedFirstName, setEditedFirstName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedCompany, setEditedCompany] = useState("");
    const [editedJobTitle, setEditedJobTitle] = useState("");

    const handleChange = (setter, value, originalValue) => {
        setter(value);
        setIsUpdated(value.trim() !== originalValue);
    };

    const handleClickCancel = () => {
        setEditedFirstName(currContact.firstName);
        setEditedLastName(currContact.lastName);
        setEditedPhone(currContact.phoneNumber);
        setEditedEmail(currContact.email);
        setEditedCompany(currContact.company);
        setEditedJobTitle(currContact.jobTitle);
        setIsUpdated(false);
    };

    const handleClickSave = async () => {
        const updatedContact = {
            firstName: editedFirstName,
            lastName: editedLastName,
            phoneNumber: editedPhone,
            email: editedEmail,
            company: editedCompany,
            jobTitle: editedJobTitle,
        };

        const result = await updateContact({ contactId, ...updatedContact }, token, dispatch);
        if (result) {
            setCurrContact(result);
            navigate("/dashboard");
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        const fetchContact = async () => {
            const result = await getContact(contactId, token);
            if (result) {
                setCurrContact(result);
                setEditedFirstName(result.firstName);
                setEditedLastName(result.lastName);
                setEditedPhone(result.phoneNumber);
                setEditedEmail(result.email);
                setEditedCompany(result.company);
                setEditedJobTitle(result.jobTitle);
            }
        };
        fetchContact();
    }, [contactId, token]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-8 animate-fadeIn">
            {/* Name */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={editedFirstName}
                        className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none"
                        onChange={(e) =>
                            handleChange(setEditedFirstName, e.target.value, currContact.firstName)
                        }
                        placeholder="First Name"
                        autoFocus
                    />
                    <input
                        type="text"
                        value={editedLastName}
                        className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none"
                        onChange={(e) =>
                            handleChange(setEditedLastName, e.target.value, currContact.lastName)
                        }
                        placeholder="Last Name"
                    />
                </div>
                <CiEdit className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700 transition-all" />
            </div>

            {/* Phone */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input
                    type="text"
                    value={editedPhone}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleChange(setEditedPhone, e.target.value, currContact.phoneNumber)}
                    placeholder="Phone Number"
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                    type="email"
                    value={editedEmail}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleChange(setEditedEmail, e.target.value, currContact.email)}
                    placeholder="Email"
                />
            </div>

            {/* Company */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                <input
                    type="text"
                    value={editedCompany}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleChange(setEditedCompany, e.target.value, currContact.company)}
                    placeholder="Company"
                />
            </div>

            {/* Job Title */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                <input
                    type="text"
                    value={editedJobTitle}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleChange(setEditedJobTitle, e.target.value, currContact.jobTitle)}
                    placeholder="Job Title"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
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
    );
};

export default Contact;
