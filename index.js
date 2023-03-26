const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = require('./routes/routes');


const { connectDatabase } = require("./startup/database.js");

connectDatabase();
const app = express();

 app.use(express.json());

 app.use(router);




const port = 3000;
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});