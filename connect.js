  import { createRequire } from 'module';
  const require = createRequire(import.meta.url);
  const express = require("express");
  const app = express();
  var bodyParser = require("body-parser");
  const mongoose = require("mongoose");
  var cors = require('cors')
 
 
mongoose
  .connect(
    'mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/querylog'
  )
  .then(() => console.log("Connected!"))
  .catch((e) => console.log(e));
 
    const User = mongoose.model('User',{
        "name" : String,
        "email" : String,
        "phoneNumber" : String,
        "address" : String,
        "query" : String,
    })
  app.use(bodyParser.json())
  app.use(cors())
 
  app.post('/signup',(req,res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save().then((data,error) => console.log(error, data));
    return res.json({status:"Done", message:"User signup done"})
  })
 
  console.log('Server is listening on port 3000')
  app.listen(3000)