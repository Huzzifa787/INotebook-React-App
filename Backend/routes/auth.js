const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "mauzisagoodb$oy"

//Router 1 : Create  a User using POST :  /api/auth/createuser no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be atleast 5 char long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors then return Bad request and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status("400").json({success,
        errors: errors.array(),
      });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status("400")
          .json({ success, errors: "The user with this Email Already Exit " });
      }
      const salt = await bcyrpt.genSalt(10);
      const secPass = await bcyrpt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user : {
          id : user.id
        }
      }
      
      const authtoken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({ success, authtoken });

      // res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);


//Router 2 : Authenticate a User using POST :  /api/auth/login no login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can not be blank").exists()
  ],
  async (req, res) => {
    // If there are errors then return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status("400").json({success,
        errors: errors.array(),
      });
    }

    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status("500").json({error:"Plz enter correct creds"})
      }

      const pswdcompare = await bcyrpt.compare(password,user.password);

      if(!pswdcompare){
        return res.status("500").json({ error: "Plz enter correct creds" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success,authtoken });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  })

//Router 3 : Get a User Details using POST :  /api/auth/getuser Login required
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
       console.error(error.message);
       res.status(500).send("Internal Error Occured");
    }
  });

module.exports = router;
