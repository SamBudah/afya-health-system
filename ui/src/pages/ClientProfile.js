import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  CircularProgress
} from '@mui/material';
import { MedicalServices, Person, Email, Phone, Cake } from '@mui/icons-material';

export default function ClientProfile({ clientId }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/enrollments/client/${clientId}`);
        setClient(res.data);
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clientId]);

  if (loading) return <CircularProgress />;
  if (!client) return <Typography>Client not found</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
        {client.client.firstName} {client.client.lastName}
      </Typography>

      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemText 
            primary="Email" 
            secondary={client.client.email} 
            secondaryTypographyProps={{ sx: { display: 'flex', alignItems: 'center' } }}
          />
          <Email color="action" />
        </ListItem>
        
        <ListItem>
          <ListItemText 
            primary="Phone" 
            secondary={client.client.phone || 'Not provided'} 
          />
          <Phone color="action" />
        </ListItem>
        
        <ListItem>
          <ListItemText 
            primary="Date of Birth" 
            secondary={client.client.dateOfBirth || 'Not provided'} 
          />
          <Cake color="action" />
        </ListItem>
      </List>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        <MedicalServices sx={{ verticalAlign: 'middle', mr: 1 }} />
        Enrolled Programs
      </Typography>
      
      {client.programs.length > 0 ? (
        <List>
          {client.programs.map(program => (
            <ListItem key={program.id}>
              <Chip 
                label={program.name} 
                color="primary" 
                sx={{ mr: 2 }} 
              />
              <ListItemText secondary={program.description} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No program enrollments</Typography>
      )}
    </Box>
  );
}