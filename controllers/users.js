const { User } = require("../models/user.js");
const createUser = (name, age) => {
     user = new User(name, age);
     return user;
    
 };
 module.exports = { createUser };