import express from 'express';
import mongoose from 'mongoose';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// Memory store for tracking session choices before name entry or when Mongo is offline
const memoryVisitors = new Map();

// Helper to check if Mongo is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// POST /api/visitor/session - Initialize session in memory
router.post('/session', async (req, res) => {
  try {
    const { sessionId, vercelUrl, name } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    // Only create MongoDB document if name is already provided
    if (name && name.trim() && isMongoConnected()) {
      let visitor = await Visitor.findOne({ sessionId });
      if (!visitor) {
        visitor = new Visitor({
          sessionId,
          name: name.trim(),
          vercelUrl: vercelUrl || '',
          choices: [],
          interactions: [{
            page: 1,
            action: 'SESSION_START',
            timestamp: new Date()
          }]
        });
        await visitor.save();
      }
      return res.status(200).json({ success: true, db: 'mongodb', visitor });
    } else {
      if (!memoryVisitors.has(sessionId)) {
        memoryVisitors.set(sessionId, {
          sessionId,
          name: name ? name.trim() : '',
          vercelUrl: vercelUrl || '',
          choices: [],
          interactions: [{ page: 1, action: 'SESSION_START', timestamp: new Date() }],
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return res.status(200).json({ success: true, db: 'memory', visitor: memoryVisitors.get(sessionId) });
    }
  } catch (error) {
    console.error('Session API Error:', error.message);
    res.status(500).json({ error: 'Server error handling session' });
  }
});

// POST /api/visitor/interaction - Save name & selected options to MongoDB Atlas
router.post('/interaction', async (req, res) => {
  try {
    const { sessionId, page, action, selectedOption, name, vercelUrl, completed } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    // Get or update memory cache
    let memVisitor = memoryVisitors.get(sessionId) || {
      sessionId,
      name: '',
      vercelUrl: vercelUrl || '',
      choices: [],
      interactions: [],
      completed: false,
      createdAt: new Date()
    };

    if (name && name.trim()) memVisitor.name = name.trim();
    if (vercelUrl) memVisitor.vercelUrl = vercelUrl;
    if (completed !== undefined) memVisitor.completed = Boolean(completed);

    if (page && action) {
      memVisitor.interactions.push({
        page: Number(page),
        action: String(action),
        selectedOption: selectedOption !== undefined ? selectedOption : null,
        timestamp: new Date()
      });
    }

    if (selectedOption && typeof selectedOption === 'string' && selectedOption.trim()) {
      const optionStr = selectedOption.trim();
      if (!memVisitor.choices.includes(optionStr)) {
        memVisitor.choices.push(optionStr);
      }
    }

    memVisitor.updatedAt = new Date();
    memoryVisitors.set(sessionId, memVisitor);

    // Save to MongoDB ONLY if name exists
    const activeName = (name && name.trim()) || memVisitor.name;

    if (activeName && isMongoConnected()) {
      let visitor = await Visitor.findOne({ sessionId });
      if (!visitor) {
        visitor = new Visitor({
          sessionId,
          name: activeName,
          vercelUrl: memVisitor.vercelUrl || vercelUrl || '',
          choices: memVisitor.choices || [],
          interactions: memVisitor.interactions || [],
          completed: memVisitor.completed
        });
      } else {
        visitor.name = activeName;
        if (memVisitor.vercelUrl) visitor.vercelUrl = memVisitor.vercelUrl;
        if (completed !== undefined) visitor.completed = Boolean(completed);

        if (selectedOption && typeof selectedOption === 'string' && selectedOption.trim()) {
          const optionStr = selectedOption.trim();
          if (!visitor.choices.includes(optionStr)) {
            visitor.choices.push(optionStr);
          }
        }

        if (page && action) {
          visitor.interactions.push({
            page: Number(page),
            action: String(action),
            selectedOption: selectedOption !== undefined ? selectedOption : null,
            timestamp: new Date()
          });
        }
      }

      await visitor.save();
      return res.status(200).json({ success: true, db: 'mongodb', visitor });
    }

    return res.status(200).json({ success: true, db: 'memory', visitor: memVisitor });
  } catch (error) {
    console.error('Interaction API Error:', error.message);
    res.status(500).json({ error: 'Server error logging interaction' });
  }
});

export default router;
