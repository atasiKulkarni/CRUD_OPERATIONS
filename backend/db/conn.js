require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_CONNECTION_URL;

if (!MONGO_URI) {
    console.error("MONGO_CONNECTION_URL is missing in .env file!");
    process.exit(1); // Stop server if no MongoDB URI
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Successfully connected to MongoDB Atlas!"))
.catch(err => {
    console.error("Unable to connect to MongoDB Atlas!");
    console.error(err);
    process.exit(1); // Stop server on DB connection failure
});

module.exports = mongoose;
