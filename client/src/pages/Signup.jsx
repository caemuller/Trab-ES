import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import '../assets/css/main.css'
import Notification from "./Notification";


function Signup() {
    const [formData, setFormData] = useState({ 
        name: '',
        password: '',
        profile_description: '',
        gender: 'male',
        birth_year: '2006',
        cpf: '',
        accepted_terms: false
    });

    const navigate = useNavigate();
    const authService = new AuthService();
    const [notification, setNotification] = useState({ message: '', isVisible: false });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        });
    };

    const hideNotification = () => {
        setNotification({ message: '', isVisible: false });
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const validateCpf = (cpf) => {
        var value=true;
        //edit cpf in case of 000.000.000-00
        cpf = cpf.replace(/[^\d]+/g,'');
        if(cpf == '') return false;
        if (cpf.length !== 11) {
            value=false;
        }
        return value;
    };
        // if (cpf.length !== 11) return false;
        // let sum = 0;
        // let remainder;
        // for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        // remainder = (sum * 10) % 11;
        // if (remainder === 10 || remainder === 11) remainder = 0;
        // if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        // sum = 0;
        // for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        // remainder = (sum * 10) % 11;
        // if (remainder === 10 || remainder === 11) remainder = 0;
        // if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        // return true;
    // };
    const handleSignupError = (message) => {
        setNotification({ message, isVisible: true });
    };

    const validateForm = () => {
        if (!formData.username) {
            handleSignupError('Nome de usuário é obrigatório');
            throw new Error('Validation error');
        }
        if (!validateCpf(formData.cpf)) {
            handleSignupError('CPF inválido');
            throw new Error('Validation error');
        }
        if (!validateBirthYear(formData.birth_year)) {
            handleSignupError('Ano de nascimento inválido');
            throw new Error('Validation error');
        }
        if (!validatePassword(formData.password)) {
            handleSignupError('Senha deve ter pelo menos 8 caracteres');
            throw new Error('Validation error');
        }
        if (formData.password !== formData.repeated_password) {
            handleSignupError('Senhas não conferem');
            throw new Error('Validation error');
        }
        if (!formData.accepted_terms) {
            handleSignupError('Você deve aceitar os termos de uso');
            throw new Error('Validation error');
        }
        return true;
    };

    const validateBirthYear = (birthYear) => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        return age >= 18 && age <= 100;
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const validate_signup = 
        formData?.username?.length === 0 || 
        formData?.password?.length === 0 || 
        formData?.cpf?.length === 0 || 
        formData?.birth_year?.length === 0 ||
        !validateCpf(formData.cpf) ||
        !validateBirthYear(formData.birth_year) ||
        !validatePassword(formData.password);



    const signup = async () => {
        try {


            // if (formData?.password.length == 0) {
            //     setNotification({ message: 'Validation Error', isVisible: true });
            //     throw new Error("Validation error");
            // }

            validateForm();

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
                id="accepted_terms"
                name="accepted_terms"
                onChange={handleCheckboxChange}
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
    <Notification 
        message={notification.message} 
        isVisible={notification.isVisible} 
        onClose={hideNotification} 
    />
</div>
}

export default Signup;