import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Signup() {
    const [formData, setFormData] = useState({ //initial values
        name: '',
        password: '',
        profile_description: '',
        gender: 'male',
        birth_year: '2006',
        cpf: ''
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
            {/* <div>
                <div>
                    <p>Tipo de cadastro:</p>
                </div>
                <div>
                    <select name="tipo" onChange={(e) => handleSelectChange('tipo', e.target.value)}>
                        <option value="0">Pessoa Física</option>
                        <option value="1">Empresa</option>
                    </select>
                </div>
            </div> */}
             <div>
                <div>
                    <p>Genero:</p>
                </div>
                <div>
                    <select name="gender" onChange={(e) => handleSelectChange('gender', e.target.value)}>
                        <option value="male">Homem</option>
                        <option value="female">Mulher</option>
                        <option value="other">Outro</option>
                    </select>
                </div>
            </div> 
            <div>
                <div>
                    <p>CPF:</p>
                </div>
                <div>
                    <input 
                        type="text"  
                        name="cpf"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <div>
                    <p>Ano de Nascimento:</p>
                </div>
                <div>
                    
                <select name="birth_year" onChange={(e) => handleSelectChange("birth_year", e.target.value)}>
                    {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() -18 - i;
                        return <option key={year} value={year}>{year}</option>;
                    })}
                </select>
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