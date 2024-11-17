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
            
            if (response.status == 200) {
                navigate("/home");
            } else if (response.status == 401) {
                setErrorMessage("Usuário ou senha inválidos");
            }

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErrorMessage("Erro de login. Por favor, tente novamente.");
        }
    }


    return <div className="flex align-items-center justify-content-center h-90-per">
            <div className=" black-border">
                <div className="font-serif">
                    <h1>Voluntarie.se</h1>
                </div>
                <div>
                    <div>
                        <p>Usuário:</p>
                    </div>
                    <div>
                        <input 
                            type="text"  
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Senha:</p>
                    </div>
                    <div>
                        <input 
                            type="password"  
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {errorMessage && (
                    <div className="error-message">
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    </div>
                )}
                <div>
                    <p>Não tem uma conta? <a href="/sign-up">Registre-se</a></p>
                </div>
                <div>
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </div>
}

export default Login;