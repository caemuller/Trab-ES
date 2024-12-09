import { useNavigate } from "react-router-dom";
import "../assets/css/menu.css";

function Menu() {
  const navigate = useNavigate();

  const goToCampaignList = () => navigate("/campaign-list");
  const goToUserProfile = () => navigate("/profile");
  const logout = () => navigate("/login");

  return (
    <nav className="menu-container">
      <div className="menu-logo">Voluntarie.se</div>
      <div className="menu-buttons">
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
