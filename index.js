const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

//ROUTE IMPORTS
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js')

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
dbConnect(); //calling db conection function

//USAGE OF ROUTES
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);



//LISTENING PORT
app.listen('8080', () => {
   console.log('server started at port 8080')
})