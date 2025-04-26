class HealthProgram {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.createdAt = new Date().toISOString();
    }
  
    toJson() {
      return {
        name: this.name,
        description: this.description,
        createdAt: this.createdAt
      };
    }
  }
  
  module.exports = HealthProgram;