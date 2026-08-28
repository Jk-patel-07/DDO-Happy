import express from 'express';
import mongoose from 'mongoose';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// Memory fallback store for when MongoDB is connecting/offline
const memoryVisitors = new Map();

// Helper to check if Mongo is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// POST /api/visitor/session - Initialize or retrieve visitor session
router.post('/session', async (req, res) => {
  try {
    const { sessionId, vercelUrl } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    if (isMongoConnected()) {
      let visitor = await Visitor.findOne({ sessionId });
      if (!visitor) {
        visitor = new Visitor({
          sessionId,
          vercelUrl: vercelUrl || '',
          interactions: [{
            page: 1,
            action: 'SESSION_START',
            timestamp: new Date()
          }]
        });
        await visitor.save();
      } else if (vercelUrl && !visitor.vercelUrl) {
        visitor.vercelUrl = vercelUrl;
        await visitor.save();
      }
      return res.status(200).json({ success: true, db: 'mongodb', visitor });
    } else {
      if (!memoryVisitors.has(sessionId)) {
        memoryVisitors.set(sessionId, {
          sessionId,
          name: '',
          vercelUrl: vercelUrl || '',
          interactions: [{ page: 1, action: 'SESSION_START', timestamp: new Date() }],
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return res.status(200).json({ success: true, db: 'memory_fallback', visitor: memoryVisitors.get(sessionId) });
    }
  } catch (error) {
    console.error('Session API Error:', error.message);
    res.status(500).json({ error: 'Server error handling session' });
  }
});

// POST /api/visitor/interaction - Record interaction
router.post('/interaction', async (req, res) => {
  try {
    const { sessionId, page, action, selectedOption, name, vercelUrl, completed } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    if (isMongoConnected()) {
      let visitor = await Visitor.findOne({ sessionId });
      if (!visitor) {
        visitor = new Visitor({ sessionId });
      }

      if (name) visitor.name = name.trim();
      if (vercelUrl) visitor.vercelUrl = vercelUrl;
      if (completed !== undefined) visitor.completed = Boolean(completed);

      if (page && action) {
        visitor.interactions.push({
          page: Number(page),
          action: String(action),
          selectedOption: selectedOption !== undefined ? selectedOption : null,
          timestamp: new Date()
        });
      }

      await visitor.save();
      return res.status(200).json({ success: true, db: 'mongodb', visitor });
    } else {
      let visitor = memoryVisitors.get(sessionId) || {
        sessionId,
        name: '',
        vercelUrl: vercelUrl || '',
        interactions: [],
        completed: false,
        createdAt: new Date()
      };

      if (name) visitor.name = name.trim();
      if (vercelUrl) visitor.vercelUrl = vercelUrl;
      if (completed !== undefined) visitor.completed = Boolean(completed);

      if (page && action) {
        visitor.interactions.push({
          page: Number(page),
          action: String(action),
          selectedOption: selectedOption !== undefined ? selectedOption : null,
          timestamp: new Date()
        });
      }

      visitor.updatedAt = new Date();
      memoryVisitors.set(sessionId, visitor);
      return res.status(200).json({ success: true, db: 'memory_fallback', visitor });
    }
  } catch (error) {
    console.error('Interaction API Error:', error.message);
    res.status(500).json({ error: 'Server error logging interaction' });
  }
});

export default router;
