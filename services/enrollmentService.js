const { db } = require('../config/firebase');

class EnrollmentService {
  async enrollClient(clientId, programId) {
    const enrollmentData = {
      clientId,
      programId,
      enrolledAt: new Date().toISOString()
    };
    
    await db.collection('enrollments').add(enrollmentData);
    return enrollmentData;
  }

  async getClientEnrollments(clientId) {
    const snapshot = await db.collection('enrollments')
      .where('clientId', '==', clientId)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getClientProfile(clientId) {
    const clientDoc = await db.collection('clients').doc(clientId).get();
    if (!clientDoc.exists) {
      throw new Error('Client not found');
    }
    
    const enrollments = await this.getClientEnrollments(clientId);
    const programIds = enrollments.map(e => e.programId);
    
    const programs = await Promise.all(
      programIds.map(async programId => {
        const programDoc = await db.collection('programs').doc(programId).get();
        return { id: programDoc.id, ...programDoc.data() };
      })
    );
    
    return {
      client: { id: clientDoc.id, ...clientDoc.data() },
      programs
    };
  }
}

module.exports = new EnrollmentService();