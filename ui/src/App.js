import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import RegisterClient from './pages/RegisterClient';
import SearchClients from './pages/SearchClients';
import ClientProfile from './pages/ClientProfile';
import ProgramEnrollment from './pages/ProgramEnrollment';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<RegisterClient />} />
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/search" element={<SearchClients />} />
          <Route path="/client/:id" element={<ClientProfile />} />
          <Route path="/enroll" element={<ProgramEnrollment />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;