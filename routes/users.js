 const express = require("express");
const { createUser } = require("../controllers/users");

 const router = express.Router();
//  //nie trzymamy logiki w routes/users.js
router.post("/", (req, res) => {
    try {
        const { name, age } = req.body;
        const user = createUser(name, age);
       return res.status(201).json(user);
     } catch {
        return res.status(500).send("something went wrong");     }
 });
 module.exports = router;
