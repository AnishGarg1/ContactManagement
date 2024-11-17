const express = require("express");
const { createContact, deleteContact, getAllContactDetails, getContactDetails, updateContact } = require("../controllers/Contact");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/createContact", auth, createContact);
router.post("/getContact", auth, getContactDetails);
router.put("/updateContact", auth, updateContact);
router.get("/getAllContacts", auth, getAllContactDetails);
router.delete("/deleteContact", auth, deleteContact);

module.exports = router;