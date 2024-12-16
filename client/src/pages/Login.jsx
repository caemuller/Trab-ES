import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar mensagem de erro
    const authService = new AuthService();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const login = async () => {
        setErrorMessage(""); 

        try {
            
            const response = await authService.login(formData);
            
            if (response.ok) {
                localStorage.setItem("authData", JSON.stringify(response.data));
                navigate("/campaign-list");
            } else {
                setErrorMessage("Usuário ou senha inválidos");
            }

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErrorMessage("Erro de login. Por favor, tente novamente.");
        }
    }


    return <div className="page-container">
    <div className="form-container">
        <div className="font-serif">
            <h1>Voluntarie.se</h1>
        </div>

        <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input 
                type="text"  
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Digite seu usuário"
                className="form-input"
            />
        </div>

        <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input 
                type="password"  
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="form-input"
            />
        </div>

        {errorMessage && (
            <div className="error-message">
                <p>{errorMessage}</p>
            </div>
        )}

        <div className="form-footer">
            <p>Não tem uma conta? <a href="/sign-up">Registre-se</a></p>
            <button onClick={login} className="submit-button">Login</button>
        </div>
    </div>
</div>
}

export default Login;