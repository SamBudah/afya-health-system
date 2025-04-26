const express = require('express');
const router = express.Router();
const programService = require('../services/programService');

// Create a health program
router.post('/', async (req, res) => {
  try {
    const program = await programService.createProgram(req.body);
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await programService.getAllPrograms();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;