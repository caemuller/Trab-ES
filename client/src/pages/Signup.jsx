import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Signup() {
    const [formData, setFormData] = useState({
        "tipo": "0"
    });
    const navigate = useNavigate();
    const authService = new AuthService();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const signup = async () => {
        try {

            let response = authService.signup(formData);
            // TESTING
            response = {
                "status": 200
            };

            if (response.status == 200) {
                navigate("/login")
            }

        } catch (error) {
            console.error('Failed to signup', error);
        }
    }


    return <div className="flex align-items-center justify-content-center h-90-per">
        <div className=" black-border">
            <div>
                <h1>Cadastro</h1>
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
                    <p>Email:</p>
                </div>
                <div>
                    <input 
                        type="email"  
                        name="email"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <div>
                    <p>Tipo de cadastro:</p>
                </div>
                <div>
                    <select name="tipo" onChange={(e) => handleSelectChange('tipo', e.target.value)}>
                        <option value="0">Pessoa Física</option>
                        <option value="1">Empresa</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <p>CPF/CNPJ:</p>
                </div>
                <div>
                    <input 
                        type="text"  
                        name="cpf_cnpj"
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
                <div>
                    <p>Repita a senha:</p>
                </div>
                <div>
                    <input 
                        type="password"  
                        name="repeated_password"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <button onClick={signup}>Registrar</button>
            </div>
        </div>
    </div>
}

export default Signup;