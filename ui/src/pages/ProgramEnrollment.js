import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { MedicalServices, Group } from '@mui/icons-material';

export default function ProgramEnrollment() {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientsRes, programsRes] = await Promise.all([
          axios.get('/api/clients'),
          axios.get('/api/programs')
        ]);
        setClients(clientsRes.data);
        setPrograms(programsRes.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/enrollments', {
        clientId: selectedClient,
        programId: selectedProgram
      });
      setSuccess(true);
      setSelectedClient('');
      setSelectedProgram('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        <Group sx={{ verticalAlign: 'middle', mr: 1 }} />
        Program Enrollment
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Enrollment successful!</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 600 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Client</InputLabel>
          <Select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            label="Select Client"
            required
          >
            {clients.map(client => (
              <MenuItem key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Program</InputLabel>
          <Select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            label="Select Program"
            required
          >
            {programs.map(program => (
              <MenuItem key={program.id} value={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          startIcon={<MedicalServices />}
        >
          Enroll Client
        </Button>
      </Box>
    </Box>
  );
}