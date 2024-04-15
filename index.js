const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

//ROUTE IMPORTS
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const postRoute = require('./routes/posts.js');
const categoryRoute = require('./routes/categories.js');
const path = require('path');

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname,'/images')))


//CONNECTION DB
const dbConnect = async () => {
   try {
      await mongoose.connect(process.env.ATLAS_URI);
      console.log('DB connected succesfully')
   } catch (error) {
      console.log(error)
   }
}
dbConnect(); //calling db conection function;

//STORING IMAGES USING MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//USAGE OF ROUTES
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);



//LISTENING PORT
app.listen('8080', () => {
   console.log('server started at port 8080')
})