import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  TextField, 
  List, 
  ListItem, 
  Typography,
  Box,
  ListItemText,
  Divider
} from '@mui/material';

export default function SearchClients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.get(`/api/clients/search?q=${searchTerm}`);
      setResults(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Search Clients</Typography>
      
      <TextField
        fullWidth
        label="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      
      {loading && <Typography>Searching...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      
      <List>
        {results.map((client) => (
          <div key={client.id}>
            <ListItem 
              key={client.id}
              component={Link}
              to={`/client/${client.id}`}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemText
                primary={`${client.firstName} ${client.lastName}`}
                secondary={`Email: ${client.email}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
        
        {!loading && results.length === 0 && searchTerm && (
          <Typography sx={{ mt: 2 }}>No clients found</Typography>
        )}
      </List>
    </Box>
  );
}