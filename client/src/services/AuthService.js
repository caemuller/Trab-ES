export default class AuthService {

    async login(params) {
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: params.username, password: params.password}),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response;

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async signup(params) {
        try {
            console.log('SIGNING UP USER: '+ params)
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: params.username, 
                    password: params.password, 
                    profile_description: "", 
                    gender: params.gender, 
                    birth_year: params.birth_year, 
                    cpf: params.cpf
                }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}