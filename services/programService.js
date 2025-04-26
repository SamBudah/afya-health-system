const { db } = require('../config/firebase');
const HealthProgram = require('../models/HealthProgram');

class ProgramService {
  async getAllPrograms() {
    const snapshot = await db.collection('programs').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async createProgram(programData) {
    const program = new HealthProgram(
      null,
      programData.name,
      programData.description
    );
    
    const docRef = await db.collection('programs').add(program.toJson());
    return { id: docRef.id, ...program.toJson() };
  }
}

module.exports = new ProgramService();