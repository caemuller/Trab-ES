export default class UserService {
    async list() {
        try {
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async delete(user_id) {
        try {
            const response = await fetch(`http://localhost:8080/users/${user_id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                }
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