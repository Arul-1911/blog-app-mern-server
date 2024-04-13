const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')

const dbConnect = async () => {
   try {
      await mongoose.connect(process.env.ATLAS_URI);
      console.log('DB connected succesfully')
   } catch (error) {
      console.log(error)
   }
}
dbConnect()

app.listen('8080', () => {
   console.log('server started at port 8080')
})