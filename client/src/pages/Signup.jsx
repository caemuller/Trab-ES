import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import '../assets/css/main.css'

function Signup() {
    const [formData, setFormData] = useState({ 
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

    const handleCpfChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); 

        handleChange({
            target: {
                name: e.target.name,
                value: value
            }
        });
    };


    return <div className="page-container p-10-per m-bottom-320">
    <div className="form-container">
        <h1>Cadastro</h1>

        
        <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Digite seu nome de usuário"
            />
        </div>

        
        <div className="form-group">
            <label htmlFor="gender">Gênero:</label>
            <select
        id="gender"
        name="gender"
        onChange={(e) => handleSelectChange('gender', e.target.value)}
        defaultValue="" 
    >
        <option value="" disabled>Selecione o gênero</option> 
        <option value="male">Homem</option>
        <option value="female">Mulher</option>
        <option value="other">Outro</option>
    </select>
        </div>

        
        <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
                type="text"
                id="cpf"
                name="cpf"
                onChange={(e) => handleCpfChange(e)}  
                placeholder="Digite seu CPF"
    />
        </div>

        
        <div className="form-group">
            <label htmlFor="birth_year">Ano de Nascimento:</label>
            <select
        id="birth_year"
        name="birth_year"
        onChange={(e) => handleSelectChange("birth_year", e.target.value)}
        defaultValue="" 
    >
        <option value="" disabled>Selecione o ano</option> 
        {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - 18 - i;
            return (
                <option key={year} value={year}>
                    {year}
                </option>
            );
        })}
    </select>
        </div>

        <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Digite sua senha"
            />
        </div>

        <div className="form-group">
            <label htmlFor="repeated_password">Repita a senha:</label>
            <input
                type="password"
                id="repeated_password"
                name="repeated_password"
                onChange={handleChange}
                placeholder="Repita sua senha"
            />
        </div>

        
        <div className="form-group accept">
            <input
                type="checkbox"
                id="terms"
            />
            <label htmlFor="terms">Aceitar os</label>
            <a href="#">termos de uso</a>
        </div>

        <div>
            <button className="submit-button" onClick={signup}>
                Registrar
            </button>
        </div>
    </div>
</div>
}

export default Signup;