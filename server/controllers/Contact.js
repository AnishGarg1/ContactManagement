const Contact = require("../models/Contact");
const User = require("../models/User");

exports.createContact = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
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
      title,
      description,
      status: "In Progress",
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
      contact,
      message: "Contact created successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// update contact
exports.updateContact = async (req, res) => {
    try {
        const { contactId, title, description, status } = req.body;
        
        if(!contactId){
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }

        const contact = await Contact.findById(contactId);
        if(!contact){
            return res.statusa(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        if(title){
            contact.title = title;
        }
        if(description){
            contact.description = description;
        }
        if(status){
            contact.status = status;
        }

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
}

// get contact details
exports.getContactDetails = async (req, res) => {
    try {
        const { contactId } = req.body;

        if(!contactId){
            return res.status(400).json({
                success: false,
                message: "Please fill details",
            });
        }

        const contact = await Contact.findById(contactId).populate({path: "user"});

        contact.user.password = undefined;

        if(!contact){
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
}

// get user's all contact
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
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// delete contact
exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user.id;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
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
