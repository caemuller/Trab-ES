import { useEffect, useState } from "react";
import UserService from "../services/UserService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Menu from "./Menu";
import AuthService from "../services/AuthService";

function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // Lista filtrada
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const userService = new UserService();
    const authService = new AuthService();



    useEffect(() => {
        const getUsers = async () => {
            const data = await userService.list();
            setUsers(data || []); 
            setFilteredUsers(data || []);
        };
  
        getUsers();
        setIsAdmin(authService.isAdmin());
    }, []);

    useEffect(() => {
      if (searchTerm.trim() === "") {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter((camp) =>
          camp.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }, [searchTerm, users]);

    return (
      <>
      <Menu/>
      <div className="content">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar usuário pelo nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="col g-15 cursor">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="card" key={user.user_id}>
                <div className="flex justify-content-space-between">
                  <h3>{user.name}</h3>
                  {
                    isAdmin ? 
                    <button className="delete-button" onClick={() => { userService.delete(user.user_id); }}>
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    : <></>
                  }
                </div>
                <p><strong>CPF:</strong> {user.cpf}</p>
                <p><strong>Gênero:</strong> {user.gender}</p>
                <p><strong>Ano de nascimento:</strong> {user.birth_date}</p>
                <p><strong>Descrição:</strong> {user.profile_description}</p>
              </div>
            ))
          ) : (
            <h1 className="no-data">Nenhum usuário encontrado.</h1>
          )}
          </div>
        </div>
      </div>
    </>
    );

}

export default UserList