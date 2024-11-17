const Contact = require("../models/Contact");
const User = require("../models/User");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required details",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const contact = new Contact({
      user: user._id,
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });

    const createdContact = await contact.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { contacts: createdContact._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      contact: createdContact,
      message: "Contact created successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      error,
      message: "Internal server error, try again",
    });
  }
};

// Update an existing contact
exports.updateContact = async (req, res) => {
  try {
    const { contactId, firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the contact ID",
      });
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;
    if (email) contact.email = email;
    if (phoneNumber) contact.phoneNumber = phoneNumber;
    if (company) contact.company = company;
    if (jobTitle) contact.jobTitle = jobTitle;

    await contact.save();

    return res.status(200).json({
      success: true,
      contact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Get contact details by ID
exports.getContactDetails = async (req, res) => {
  try {
    const { contactId } = req.body;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the contact ID",
      });
    }

    const contact = await Contact.findById(contactId).populate({ path: "user" });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      contact,
      message: "Contact fetched successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Get all contacts for a user
exports.getAllContactDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const allContacts = await Contact.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      allContacts,
      message: "All contacts fetched successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user.id;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the contact ID",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { contacts: contactId },
      },
      { new: true }
    );

    await Contact.findByIdAndDelete(contactId);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};
