import express, { request, response } from 'express';
import {PORT,mongoDBUrl} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';
import booksroutes from './routes/booksroutes.js';
import cors from 'cors'

const app= express();
app.use(express.json()); //allows express to use json body middleware for parsing request body
app.use(cors());


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books',booksroutes)

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




