export default class CampaignService {
    async list() {
        try {
            const response = await fetch('http://localhost:8080/campaigns');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async delete(campaign_id) {
        try {
            const response = await fetch(`http://localhost:8080/campaigns/${campaign_id}`, {
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
    
    async save(formData) {
        try {
            const response = await fetch('http://localhost:8080/campaigns', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async approve(campaign_id) {
        try {
            const response = await fetch(`http://localhost:8080/campaigns/${campaign_id}`, {
                method: 'PUT',
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