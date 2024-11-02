export default class CampaignService {
    async list() {
        try {
            const response = await fetch('http://localhost:8080/api/campaign-list');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}