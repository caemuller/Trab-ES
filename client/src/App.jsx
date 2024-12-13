import {HelmetProvider, Helmet} from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CampaignList from './pages/CampaignList';
import UserList from './pages/UserList';
import Home from './pages/Menu';
import Profile from './pages/Profile';
import UserPage from "./pages/UserPage";


import './assets/css/main.css';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Voluntarie.se</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/campaign-list" element={<CampaignList />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/edit-profile" element={<UserPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;