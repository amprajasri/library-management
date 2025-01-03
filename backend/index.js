import express from 'express';
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';
import booksroutes from './routes/booksroutes.js';
import cors from 'cors';
import UserModel from './models/user.js';

const app = express();
app.use(cors())
app.use(express.json()); // Allows express to use JSON body middleware for parsing request body

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome To MERN Stack Tutorial'); // Changed status code to 200
});

app.use('/books', booksroutes);

app.post('/Register', async (req, res) => {
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
});

app.post("/Login", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'User not found', data: null });
      }

      if (user.password === password) {
        res.status(200).json({ message: "Success", data: user });
      } else {
        res.status(400).json({ message: "The password is incorrect", data: null });
      }
    })
    .catch(err => {
      // Handle any database errors
      console.error(err);
      res.status(500).json('Server error');
    });
});

let serverStarted = false;

mongoose
  .connect(mongoDBUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('Connected successfully to database');
    if (!serverStarted) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        serverStarted = true;
      });
    }
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
export default app;