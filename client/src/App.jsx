import {HelmetProvider, Helmet} from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CampaignList from './pages/CampaignList';
import Home from './pages/Home';
import Profile from './pages/Profile';


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
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;