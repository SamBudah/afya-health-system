import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPrograms } from '../services/apiService';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  Alert,
  Chip
} from '@mui/material';
import { MedicalServices, Add } from '@mui/icons-material';

export default function ProgramsList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        setPrograms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          <MedicalServices sx={{ verticalAlign: 'middle', mr: 1 }} />
          Health Programs
        </Typography>
        <Button 
          component={Link} 
          to="/create-program" 
          variant="contained" 
          startIcon={<Add />}
        >
          New Program
        </Button>
      </Box>

      {location.state?.success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {location.state.success}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading programs...</Typography>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List>
          {programs.map(program => (
            <ListItem key={program.id} divider>
              <ListItemText
                primary={program.name}
                secondary={program.description}
              />
              <Chip label={`ID: ${program.id}`} variant="outlined" />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}