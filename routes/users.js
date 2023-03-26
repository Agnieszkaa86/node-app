 const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/users");
const { userSchema } = require("../models/user");

const router = express.Router();

// pobieramy wszystkich
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch {
    // a moze by ta wiadomosc przechowac jakos globalnie ?
    return res.status(500).send("Something went wrong");
  }
});

// pobieramy usera by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // walidacja poprawnosci id !!!
    if (id.length !== 24) {
      return res.status(400).send("Wrong id provided");
    }
    // po walidacji wywowałac
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// usuwanie usera
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  try {
    await deleteUser(id);
    return res.status(204).send();
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

// Tworzymy usera
router.post("/", async (req, res) => {
  // odpalamy walidacje
  // const { error } = userSchema.validate(req.body);
  // if (error) {
  //   // jesli mamy blad walidacji to powiadamiamy uzytkownika
  //   return res.status(400).send(error.details[0].message);
  // }
  try {
    // mozemy wykonac destructure bo nasze body jest zwalidowane
    const { name, age } = req.body;
    // tworzymy usera
    const user = await createUser(name, age);
    //console.log("new user", user);
    // zwracamy nowo utworzonego usera
    return res.status(200).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  if (id.length !== 24) {
    return res.status(400).send("Wrong id provided");
  }
  const { error } = userSchema.validate(req.body);
  if (error) {
    // jesli mamy blad walidacji to powiadamiamy uzytkownika
    return res.status(400).send(error.details[0].message);
  }

  try {
    const updatedUser = await updateUser(id, req.body);
    return res.status(200).send(updatedUser);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
