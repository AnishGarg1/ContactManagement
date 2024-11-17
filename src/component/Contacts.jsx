import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { getAllContacts } from "../service/apiUtils/contactAPIs";
import { useDispatch, useSelector } from "react-redux";
import ContactModalEdit from "./ContactModalEdit";

const Contacts = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { contactsList } = useSelector((state) => state.contact);

  const [currContactList, setCurrContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactModalEdit, setContactModalEdit] = useState(false);
  const [contactModalEditId, setContactModalEditId] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10); // Show 10 contacts per page

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickEdit = (contactId) => {
    navigate(`/contact/${contactId}`);
  };

  const handleDelete = (contactId) => {
    setContactModalEditId(contactId);
    setContactModalEdit(true);
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchContactList = async () => {
      const fetchedContacts = await getAllContacts(token, dispatch);
      if (fetchedContacts) {
        setCurrContactList(fetchedContacts);
      }
    };

    fetchContactList();
  }, [dispatch, token]);

  const filteredContacts = currContactList.filter((contact) => {
    return (
      (contact.name &&
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.email &&
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.phone &&
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.company &&
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.jobTitle &&
        contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-11/12 mx-auto">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, email, phone, company or job title"
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col w-full gap-2 mt-4">
          <div className="flex w-full border-2 rounded-md py-1 gap-2 px-2 font-bold">
            <div className="w-[20%]">Name</div>
            <div className="w-[20%]">Email</div>
            <div className="w-[20%]">Phone</div>
            <div className="w-[20%]">Company</div>
            <div className="w-[20%]">Job Title</div>
            <div className="w-[10%] text-center">Action</div>
          </div>

          <div className="w-full space-y-2">
            {currentContacts.map((contact) => (
              <div
                key={contact._id}
                className="flex gap-2 border-2 w-full rounded-md py-1 px-2"
              >
                <div className="w-[20%]">
                  <Link to={`/contact/${contact._id}`}>
                    <p className="hover:text-white hover:underline transition-all ease-in-out duration-200">
                      {contact.name ||
                        `${contact.firstName} ${contact.lastName}`}
                    </p>
                  </Link>
                </div>
                <div className="w-[20%]">
                  <p>{contact.email}</p>
                </div>
                <div className="w-[20%]">
                  <p>{contact.phoneNumber}</p>
                </div>
                <div className="w-[20%]">
                  <p>{contact.company}</p>
                </div>
                <div className="w-[20%]">
                  <p>{contact.jobTitle}</p>
                </div>
                <div className="w-[10%] flex gap-2 justify-center items-center">
                  <button onClick={() => handleClickEdit(contact._id)}>
                    <FiEdit2 className="text-white hover:text-teal-300 hover:scale-110 transition-all duration-200" />
                  </button>
                  <button onClick={() => handleDelete(contact._id)}>
                    <RiDeleteBin6Line className="text-white hover:text-red-800 hover:scale-110 transition-all duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePaginationChange(index + 1)}
                className={`px-4 py-2 mx-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-300"
                    : "bg-black bg-opacity-20 hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {contactModalEdit && (
        <ContactModalEdit
          contactId={contactModalEditId}
          setContactModalEdit={setContactModalEdit}
          setContactModalEditId={setContactModalEditId}
        />
      )}
    </div>
  );
};

export default Contacts;
