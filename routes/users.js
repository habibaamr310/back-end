const express = require("express");
const { getUsers } = require("../contollers/users")
const { addUsers } = require("../contollers/users");
const { getSingleUser } = require("../contollers/users");
const { Login } = require("../contollers/auth/auth");
const { Signup } = require("../contollers/auth/auth");


const router = express.Router();

// router.route("/").get(getUsers).post(addUsers);
// router.route("/:Id").get(getSingleUser);

router.route("/Signup").post(Signup)
router.route("/Login").post(Login);


module.exports = {
  router,
}