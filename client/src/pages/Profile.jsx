
function Profile() {

    const handleChangeServices = () => {
      // LÓGICA DE ALTERAR SERVIÇOS
    };
  
    return (
      <div className="profile-container">
        <div className="profile-header">
  
          <h1 className="profile-name">Nome do Usuário</h1>
          <p className="profile-email">email@usuario.com</p>
        </div>
        <div className="profile-body">
          <h2>Informações Usuário</h2>
          <p><strong>Nome:</strong> placeholder</p>
          <p><strong>Descrição:</strong> placeholder </p>
          <p><strong>Gênero:</strong> placeholder</p>
          <p><strong>Ano de nascimento:</strong> placeholder</p>
          <p><strong>Serviços:</strong> placeholder</p>
          
        </div>
        <button className="profile-button" onClick={handleChangeServices}>
          Alterar Meus Serviços
        </button>
      </div>
    );
  }
  
  export default Profile;