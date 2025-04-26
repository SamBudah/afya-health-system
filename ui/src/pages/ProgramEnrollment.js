import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  FormHelperText,
  Avatar,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { MedicalServices, People, ListAlt } from '@mui/icons-material';
import { fetchClients, fetchPrograms, createEnrollment } from '../services/apiService';

export default function ProgramEnrollment() {
  const [state, setState] = useState({
    clients: [],
    programs: [],
    selectedClient: '',
    selectedProgram: '',
    loading: false,
    success: false,
    error: null
  });

  const {
    clients,
    programs,
    selectedClient,
    selectedProgram,
    loading,
    success,
    error
  } = state;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const [clientsData, programsData] = await Promise.all([
        fetchClients(),
        fetchPrograms()
      ]);
      setState(prev => ({
        ...prev,
        clients: clientsData,
        programs: programsData,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Failed to load required data',
        loading: false
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedProgram) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await createEnrollment({
        clientId: selectedClient,
        programId: selectedProgram
      });

      setState(prev => ({
        ...prev,
        success: true,
        selectedClient: '',
        selectedProgram: '',
        loading: false
      }));

    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Failed to complete enrollment',
        loading: false
      }));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        <MedicalServices sx={{ mr: 1, verticalAlign: 'middle' }} />
        Client Program Enrollment
      </Typography>

      {state.error && (
        <Alert severity="error" onClose={() => setState(prev => ({ ...prev, error: null }))} sx={{ mb: 3 }}>
          {state.error}
        </Alert>
      )}

      {state.success && (
        <Alert severity="success" onClose={() => setState(prev => ({ ...prev, success: false }))} sx={{ mb: 3 }}>
          Enrollment successful! You can now enroll another client.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>
                <People sx={{ mr: 1, verticalAlign: 'middle' }} />
                Select Client
              </InputLabel>
              <Select
                value={state.selectedClient}
                onChange={(e) => setState(prev => ({ ...prev, selectedClient: e.target.value }))}
                label={
                  <>
                    <People sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Select Client
                  </>
                }
                required
                disabled={state.loading || state.clients.length === 0}
              >
                <MenuItem value="" disabled>
                  <ListItemAvatar>
                    <Avatar>
                      <People />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Select a client" secondary="Choose from registered clients" />
                </MenuItem>
                {state.clients.map(client => (
                  <MenuItem key={client.id} value={client.id}>
                    <ListItemAvatar>
                      <Avatar>
                        {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${client.firstName} ${client.lastName}`}
                      secondary={`ID: ${client.id}`}
                    />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Select which client to enroll in a program
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>
                <ListAlt sx={{ mr: 1, verticalAlign: 'middle' }} />
                Select Program
              </InputLabel>
              <Select
                value={state.selectedProgram}
                onChange={(e) => setState(prev => ({ ...prev, selectedProgram: e.target.value }))}
                label={
                  <>
                    <ListAlt sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Select Program
                  </>
                }
                required
                disabled={state.loading || state.programs.length === 0}
              >
                <MenuItem value="" disabled>
                  <ListItemAvatar>
                    <Avatar>
                      <ListAlt />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Select a program" secondary="Available health programs" />
                </MenuItem>
                {state.programs.map(program => (
                  <MenuItem key={program.id} value={program.id}>
                    <ListItemAvatar>
                      <Avatar>
                        {program.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={program.name}
                      secondary={program.description.substring(0, 30) + '...'}
                    />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Select a health program for enrollment
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<MedicalServices />}
              disabled={state.loading || !state.selectedClient || !state.selectedProgram}
              fullWidth
              sx={{ mt: 2 }}
            >
              {state.loading ? <CircularProgress size={24} /> : 'Enroll Client'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}