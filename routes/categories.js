const router = require("express").Router();
const Category = require('../models/Category')

//POST CATEGORY
router.post('/', async (req,res) => {
   const newcat = new Category(req.body);
   try {
      const saveCat = await newcat.save();
      res.status(200).json(saveCat);
   } catch (error) {
      res.status(500).json(error);
   }
})

//GET ALL CATEGORIES
router.get('/', async (req,res) => {
  try {
      const getCat = await Category.find();
      res.status(200).json(getCat)
  } catch (error) {
       res.status(500).json(error);
  }
})

module.exports = router;