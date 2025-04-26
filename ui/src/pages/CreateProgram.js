import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Paper,
  Grid,
  FormHelperText
} from '@mui/material';
import { MedicalServices, Save, ArrowBack } from '@mui/icons-material';
import { createProgram } from '../services/apiService';
import { programValidation } from '../utils/validations';

export default function CreateProgram() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    description: '',
    errors: {},
    loading: false,
    success: false,
    error: null
  });

  const { name, description, errors, loading, success, error } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: ''
      }
    }));
  };

  const validate = () => {
    const validationErrors = programValidation({ name, description });
    setState(prev => ({ ...prev, errors: validationErrors }));
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await createProgram({ name, description });
      
      setState(prev => ({
        ...prev,
        loading: false,
        success: true,
        name: '',
        description: ''
      }));

      setTimeout(() => navigate('/programs'), 1500);
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message
      }));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/programs')}
            sx={{ mb: 2 }}
          >
            Back to Programs
          </Button>
          
          <Typography variant="h4" component="h1" gutterBottom>
            <MedicalServices sx={{ verticalAlign: 'middle', mr: 1 }} />
            Create Health Program
          </Typography>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error" onClose={() => setState(prev => ({ ...prev, error: null }))}>
              {error}
            </Alert>
          </Grid>
        )}

        {success && (
          <Grid item xs={12}>
            <Alert severity="success">
              Program created successfully! Redirecting...
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              name="name"
              label="Program Name *"
              margin="normal"
              value={name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading || success}
              inputProps={{
                maxLength: 50
              }}
            />

            <TextField
              fullWidth
              name="description"
              label="Description"
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description || `${description.length}/500 characters`}
              disabled={loading || success}
              inputProps={{
                maxLength: 500
              }}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                disabled={loading || success}
                sx={{ minWidth: 150 }}
              >
                {loading ? 'Saving...' : 'Save Program'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}