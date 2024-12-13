import { useNavigate } from "react-router-dom";
import "../assets/css/menu.css";
import AuthService from "../services/AuthService";
import { useEffect, useState } from "react";

function Menu() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  useEffect(() => {
    setIsAdmin(authService.isAdmin());
  }, []);

  const goToCampaignList = () => navigate("/campaign-list");
  const goToUserProfile = () => navigate("/profile");
  const logout = () => {
    localStorage.setItem("authData", null);
    navigate("/login");
  }

  return (
    <nav className="menu-container">
      <div className="menu-logo">Voluntarie.se</div>
      <div className="menu-buttons">
        {
          isAdmin ? 
          <button onClick={() => {navigate("/user-list")}} className="menu-button">
            Lista de Usuários
          </button>
          : <></>
        }
        <button onClick={goToCampaignList} className="menu-button">
          Lista de Campanhas
        </button>
        <button onClick={goToUserProfile} className="menu-button">
          Perfil do Usuário
        </button>
        <button onClick={logout} className="menu-button logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Menu;
