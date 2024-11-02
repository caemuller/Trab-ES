import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {
    const [formData, setFormData] = useState({});
    const authService = new AuthService();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const login = async () => {
        try {

            let response = authService.login(formData);
            
            // TESTING
            response = {
                "status": 200
            }

            if (response.status == 200) {
                navigate("/campaign-list");
            } else {}

        } catch (error) {
            console.error('Failed to login', error);
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