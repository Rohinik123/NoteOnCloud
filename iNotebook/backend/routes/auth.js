const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

//-----ROUTE 1 :-------------CREATING A USER USING POST "/api/auth/signup". No login requires

router.post(
  "/signup",
  [
    body("name", "Please enater a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //-------------IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //--------CHECK WEATHER THE USER WITH TYPED EMAIL ALREADY EXIST--------------
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists.",
        });
      }

      //----------CREATING A SECURE PASSWORD FUNCTION FOR PASSWORD---
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //------------CREATE A NEW USER---------------
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: { id: user.id },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      // res.json(user);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

//---------ROUTE 2 :----------AUTHENTICATE A USER USING POST "/api/auth/login". No login requires
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password canno't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //-------------IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ err: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          err: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: { id: user.id },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

//---------ROUTE 3 :----------FOR GETTING LOGGEDIN USER DETAILS "/api/auth/getuser". login requires
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});
module.exports = router;
