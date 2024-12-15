export default class EnrollmentService {
    async create(campaign_id, volunteer_id) {
        try {
            const response = await fetch(`http://localhost:8080/enrollment`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    campaign_id, 
                    volunteer_id
                })
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async delete(campaign_id, volunteer_id) {
        try {
            const response = await fetch(`http://localhost:8080/enrollment`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    campaign_id, 
                    volunteer_id
                })
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