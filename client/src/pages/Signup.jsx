import { useState } from "react";
import AuthService from "../services/AuthService";

function Signup() {
    const [formData, setFormData] = useState({
        "tipo": "0"
    });

    const authService = new AuthService();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (name, value) => {
        console.log(name);
        console.log(value);
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };

    const signup = async () => {
        try {

            let response = authService.signup(formData);


        } catch (error) {
            console.error('Failed to signup', error);
        }
    }


    return <div>
        <div>
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