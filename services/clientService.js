const { db } = require('../config/firebase');
const Client = require('../models/Client');

class ClientService {
  async getAllClients() {
    const snapshot = await db.collection('clients').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getClientById(clientId) {
    const doc = await db.collection('clients').doc(clientId).get();
    if (!doc.exists) {
      throw new Error('Client not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async createClient(clientData) {
    const client = new Client(
      null,
      clientData.firstName,
      clientData.lastName,
      clientData.email,
      clientData.phone,
      clientData.dateOfBirth
    );
    
    const docRef = await db.collection('clients').add(client.toJson());
    return { id: docRef.id, ...client.toJson() };
  }

  async searchClients(searchTerm) {
    const snapshot = await db.collection('clients').get();
    const allClients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return allClients.filter(client => 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

module.exports = new ClientService();