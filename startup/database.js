const mongoose = require("mongoose");

const dbPath = "mongodb + srv://agnieszkajanowska86:Awxjaw895bGRjtfv@cluster0.pju1vou.mongodb.net/?retryWrites=true&w=majority"

    module.exports = async function () {
        await mongoose
            .connect(dbPath)
            .then(() => console.log("Connected to mongo db"))
            .catch((err) => console.log("error to connect db" + err));
    };