const mongoose = require("mongoose");

const dbPath = process.env.MONGO_SECRET;

if (!dbPath) {
    console.log("No db secret");
};

    const connectDatabase= async ()=> {
        await mongoose
            .connect(dbPath)
            .then(() => console.log("Connected to mongo db..."))
            .catch((err) => console.log("error to connect db" + err));
};
module.exports = { connectDatabase };