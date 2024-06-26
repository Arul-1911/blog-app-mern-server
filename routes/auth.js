const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require("bcrypt");


//REGISTER
router.post('/register', async (req,res) => {
   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
         username:req.body.username,
         email:req.body.email,
         password:hashedPassword
      });

      const user = await newUser.save();
      res.status(200).json('New user Registered succesfully');

   } catch (error) {
      res.status(500).json(error)
   }
})

//LOGIN
router.post('/login', async (req,res) => {
   try {
      const user = await User.findOne({username:req.body.username});
      if (!user) {
        return res.status(400).json("Wrong username or password");
      }

      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        return res.status(400).json("Wrong username or password");
      }

      const {password,...others} = user._doc;
      res.status(200).json({message:'logged in succesfully', user:others});
   } catch (error) {
      res.status(500).json(error)
   }
})


module.exports = router;