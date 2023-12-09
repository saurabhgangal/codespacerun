// ./app/app.js
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import registerRoutes from './routes/index.js';

const initialize = (app) => {
  // MongoDB URI
  const mongoDBURI = 'mongodb+srv://shettyaayu:CAw8PmtbGCabGGZN@cluster0.7yywkny.mongodb.net/MasterDb?retryWrites=true&w=majority';

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // MongoDB connection
  mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB Atlas at ${mongoDBURI}`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });

  // Event listeners for Mongoose connection
  const db = mongoose.connection;

  // Successfully connected
  db.on('connected', () => {
    console.log(`Connected to MongoDB Atlas at ${mongoDBURI}`);
  });

  // Connection error
  db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });

  // Disconnected
  db.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
  });

  // Register routes
  registerRoutes(app);
};

// Export the initialize function
export default initialize;
