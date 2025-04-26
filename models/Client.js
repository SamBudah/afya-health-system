class Client {
    constructor(id, firstName, lastName, email, phone, dateOfBirth) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.dateOfBirth = dateOfBirth;
      this.createdAt = new Date().toISOString();
    }
  
    toJson() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        dateOfBirth: this.dateOfBirth && {dateOfBirth: this.dateOfBirth},
        createdAt: this.createdAt
      };
    }
  }
  
  module.exports = Client;