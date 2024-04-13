const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');

//ROUTE IMPORTS
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const postRoute = require('./routes/posts.js');
const categoryRoute = require('./routes/categories.js');

//MIDDLEWARES
app.use(express.json())


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
  destination: function (req, file, cb) {
    cb(null, "Images");
  },filename:(req,file,cb) => {
   cb(null,'sample-name')
  }
});

const upload = multer({storage:storage});
app.post('/api/upload', upload.single('file'),(req,res) => {
   res.status(200).json('img has been uploaded')
})

//USAGE OF ROUTES
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);



//LISTENING PORT
app.listen('8080', () => {
   console.log('server started at port 8080')
})