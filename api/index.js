import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import visitorRoutes from '../backend/routes/visitor.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../backend/.env') });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serverless DB connection caching
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      const db = await mongoose.connect(MONGODB_URI);
      isConnected = db.connections[0].readyState === 1;
      console.log('Serverless MongoDB connected.');
    } catch (err) {
      console.error('Serverless DB Error:', err.message);
    }
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes (supports both /api/visitor and serverless /visitor paths)
app.use('/api/visitor', visitorRoutes);
app.use('/visitor', visitorRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date()
  });
});

export default app;
