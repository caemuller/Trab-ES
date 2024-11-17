import { useNavigate } from "react-router-dom"; // Biblioteca de roteamento

function Home() {
  const navigate = useNavigate();

  const goToCampaignList = () => navigate("/campaign-list");
  const goToUserProfile = () => navigate("/profile");
  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Voluntarie.se</h1>
      <div className="home-buttons">
        <button onClick={goToCampaignList} className="home-button">
          Lista de Campanhas
        </button>
        <button onClick={goToUserProfile} className="home-button">
          Perfil do Usuário
        </button>
        <button onClick={logout} className="home-button logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;