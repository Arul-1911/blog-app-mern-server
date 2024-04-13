const router = require("express").Router();
const User = require("../models/Users");
const post = require('../models/Post');
const bcrypt = require("bcrypt");



//UPDATE
router.put("/:id", async (req, res) => {
   if(req.body.userId === req.params.id ){
         if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
         }
      try {
         const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
         },{new:true});
         res.status(200).json(updateUser)
      } catch (error) {
         res.status(500).json(error);
      }
   } else {
      res.status(401).json('Pls update Your account only')
   }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
   const user = await User.findById(req.params.id)
   if(!user) {
       res.status(500).json('User not found')
      }
    try {
      await post.deleteMany({username: user.username})
      await User.findByIdAndDelete(req.params.id)
       res.status(200).json('user Deleted succesfully');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("Pls delete Your account only");
  }
});

//GET ONLY USER
router.get('/:id', async (req,res) => {
   try {
      const user = await User.findById(req.params.id);
      const {password, ...others} = user._doc;
      res.status(200).json(others)
   } catch (error) {
      res.status(500).json(error);
   }
})

module.exports = router;
