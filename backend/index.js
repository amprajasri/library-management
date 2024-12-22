import express from 'express';
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';
import booksroutes from './routes/booksroutes.js';
import cors from 'cors';
import UserModel from './models/user.js';

const app = express();


// Helper function to create a regex pattern for Vercel domains
const createVercelUrlPattern = (projectName) => {
  return new RegExp(`^https://${projectName}(?:-[a-z0-9]+)?\.vercel\.app$`);
};

// CORS Configuration with dynamic origin checking
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Define patterns for your frontend URLs
    const allowedPatterns = [
      // Match any deployment of your frontend project
      createVercelUrlPattern('library-management-frontend'),
      // Match any deployment of your development project
      createVercelUrlPattern('library-management-frontend-git'),
      // Add localhost for development
      /^http:\/\/localhost:/
    ];

    // Check if the origin matches any of the allowed patterns
    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions)); // Use CORS with specified options
app.use(express.json()); // Allows express to use JSON body middleware for parsing request body
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.timeout = 120000
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      error: 'CORS error',
      message: 'Origin not allowed',
      origin: req.headers.origin
    });
  } else {
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});
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

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('Connected successfully to database');
    app.listen(PORT, () => {
      console.log('Listening at the port: ' + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;