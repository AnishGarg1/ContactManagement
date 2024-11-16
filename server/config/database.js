const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connect Successful"))
    .catch((error) => {
        console.log("DB connect failed");
        console.log("Error:", error);
        process.exit(1);
    })
}