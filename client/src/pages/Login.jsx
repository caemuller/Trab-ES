import { useState } from "react";
import AuthService from "../services/AuthService";

function Login() {
    const [formData, setFormData] = useState({});

    const authService = new AuthService();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const login = async () => {
        try {

            let response = authService.login(formData);up


        } catch (error) {
            console.error('Failed to login', error);
        }
    }


    return <div>
        <div>
            <div>
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