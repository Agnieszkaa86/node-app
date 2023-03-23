const { User } = require("../models/user.js");
const createUser = (id, name, age) => {
     user = new User(id, name, age);
     return user;
    
 };
 module.exports = { createUser };