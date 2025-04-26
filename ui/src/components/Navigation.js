import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton
} from '@mui/material';
import {
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Afya Health System
        </Typography>
        
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/" 
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/register" 
            startIcon={<PersonAddIcon />}
          >
            Register Client
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/search" 
            startIcon={<SearchIcon />}
          >
            Search Clients
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/enroll" 
            startIcon={<MedicalServicesIcon />}
          >
            Program Enrollment
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}