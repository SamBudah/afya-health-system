import { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  TextField, 
  Box, 
  Typography,
  Alert
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function RegisterClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth?.toISOString().split('T')[0]
      };

      await axios.post('/api/clients', payload);
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: null
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register New Client</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Client registered successfully!</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          label="First Name *"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Last Name *"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Email *"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        
        <DatePicker
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(newValue) => setFormData({...formData, dateOfBirth: newValue})}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          size="large" 
          sx={{ mt: 3 }}
        >
          Register Client
        </Button>
      </Box>
    </Box>
  );
}