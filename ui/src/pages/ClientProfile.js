import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Grid // Added Grid import
} from '@mui/material';
import { Person, Email, Phone, Cake, MedicalServices, ArrowBack } from '@mui/icons-material';
import { fetchClientById } from '../services/apiService'; // Updated import

export default function ClientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetchClientById(id); // Using the new service function
        setClientData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load client data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientData();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!clientData) return <Typography>Client not found</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
          {clientData.client.firstName.charAt(0)}{clientData.client.lastName.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h4">
            {clientData.client.firstName} {clientData.client.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Client ID: {id}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} /> Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography>{clientData.client.email || 'Not provided'}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography>{clientData.client.phone || 'Not provided'}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Cake sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography>
                {clientData.client.dateOfBirth || 'Date of birth not provided'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <MedicalServices sx={{ mr: 1 }} /> Enrolled Programs
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {clientData.programs.length > 0 ? (
              <List>
                {clientData.programs.map(program => (
                  <ListItem key={program.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <MedicalServices />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={program.name}
                      secondary={program.description}
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                This client is not enrolled in any programs
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}