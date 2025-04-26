const express = require('express');
const router = express.Router();
const enrollmentService = require('../services/enrollmentService');

// Enroll client in program
router.post('/', async (req, res) => {
  try {
    const { clientId, programId } = req.body;
    if (!clientId || !programId) {
      return res.status(400).json({ message: 'clientId and programId are required' });
    }
    const enrollment = await enrollmentService.enrollClient(clientId, programId);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get client profile with programs
router.get('/client/:clientId', async (req, res) => {
  try {
    const profile = await enrollmentService.getClientProfile(req.params.clientId);
    res.json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;