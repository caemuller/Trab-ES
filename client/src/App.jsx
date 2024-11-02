import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CampaignList from './pages/CampaignList';

import './assets/css/main.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/campaign-list" element={<CampaignList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;