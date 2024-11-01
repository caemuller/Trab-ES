export default class AuthService {

    async login(params) {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async signup(params) {
        try {
            const response = await fetch('http://localhost:8080/api/sign-up', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
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