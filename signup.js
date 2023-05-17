const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // assuming you have a user model defined

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // create a new user object
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10), // hash the password with bcrypt
    });

    // save the user to the database
    await newUser.save();

    // return the user object
    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;