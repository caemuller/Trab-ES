import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

function Profile() {
  // Estado para armazenar as informações do usuário
  const [user, setUser] = useState({
    name: "",
    email: "",
    profile_description: "",
    gender: "",
    birth_year: "",
    offered_services: [],
  });

  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData")); 
    const userId = authData.user_id;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChangeServices = () => {
    // LÓGICA DE ALTERAR SERVIÇOS
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Menu />
      <div className="content">
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          <div className="profile-body">
            <h2>Informações do Usuário</h2>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Descrição:</strong> {user.profile_description}</p>
            <p><strong>Gênero:</strong> {user.gender}</p>
            <p><strong>Ano de nascimento:</strong> {user.birth_year}</p>
            <p><strong>Serviços:</strong> {user.offered_services.join(", ") || "Nenhum serviço cadastrado"}</p>
          </div>

          {/* Botão para editar o perfil */}
          <Link to="/edit-profile">
            <button className="profile-button">Editar Meu Perfil</button>
          </Link>

          <button className="profile-button" onClick={handleChangeServices}>
            Alterar Meus Serviços
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
