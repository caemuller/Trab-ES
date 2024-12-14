class ServicesService {
    //todos os serviços
    async list() {
        try {
            const response = await fetch('http://localhost:8080/services');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }

    // serviços associados a um usuário específico
    async getUserServices(user_id) {
        try {
            const response = await fetch(`http://localhost:8080/users/${user_id}/services`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
}

const servicesService = new ServicesService();
export default servicesService;
