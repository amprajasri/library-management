import express, { request, response } from 'express';
import {PORT,mongoDBUrl} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';
import booksroutes from './routes/booksroutes.js';
import cors from 'cors'
import UserModel from './models/user.js';


const app= express();
app.use(express.json()); //allows express to use json body middleware for parsing request body
app.use(cors());


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books',booksroutes)
app.post('/Register',async(req,res)=>{
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await UserModel.findOne({ username });
    
    if (existingUser) {
      // If user exists, send a specific response
      return res.status(400).json({ message: 'Username already exists' });
    }

    // If username is unique, create the new user
    const newUser = await UserModel.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
})

app.post("/Login",(req,res)=>{
  const {username,password} = req.body
  UserModel.findOne({username:username})
  .then(user=>{
    if(!user)
      {return res.json({status:400,message:'user not found',data:null})}

    if(user.password===password){
      res.json({status:200,message:"success",data:user})
    } else{
      res.json({status:400,message:"the password is incorrect",data:null})
    }
  })
  .catch(err => {
    // Handle any database errors
    console.error(err);
    res.status(500).json('Server error');
  });
})

mongoose
  .connect(mongoDBUrl)
  .then(() =>{
    console.log('connected successfully to database');
    app.listen(PORT,()=>{
        console.log('listening at the port:'+PORT);
    });
    
  })
  .catch((error)=>{
    console.log(error)

  })
  export default app




