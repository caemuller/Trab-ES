const {dbClient} = require("../dbConnection.js");
//const {UserModel} = require("./UserModel.js");

class CampaignModel {
    static async getAll(){
        try{
            const allCampaigns = (await dbClient.query("select * from Campaigns")).rows
            const formattedCampaigns = await Promise.all(allCampaigns.map((campaign) =>  this.formatCampaignData(campaign)));
            return formattedCampaigns
        }catch(err){
            throw new Error(`Failed to fetch all campaigns from database: ${err}`)
        }
    }

    static async get(campaign_id){
        try{
            const campaignData = (await dbClient.query(`select * from Campaigns where campaign_id = ${campaign_id}`)).rows[0]
            return await this.formatCampaignData(campaignData)
        }catch(err){
            throw new Error(`Failed to fetch campaign with id=${campaign_id} from database: ${err}`)
        }
    }

    static async create({name, description, creator_id, requested_service_id}){
        try{
            const query = `INSERT INTO Campaigns(name, description, creator_id, requested_service_id) VALUES ($1, $2, $3, $4)`
            const values = [name, description, creator_id, requested_service_id]
            const response = await dbClient.query(query, values)
            return response
        }catch(err){
            throw new Error(`Failed to create campaign named ${name} in database: ${err}`)
        }
    }

    static async getCampaignCreatorData(campaign_id){
        const query = `
            SELECT users.user_id, users.name 
            FROM campaigns 
            JOIN users ON (campaigns.creator_id = users.user_id)
            WHERE campaign_id = $1
        `;
        const queryParams = [campaign_id]
        try {
            const campaignCreator = (await dbClient.query(query, queryParams)).rows[0];
            return campaignCreator;
        } catch (err) {
            throw new Error(`Failed to fetch campaign creator from database: ${err}`);
        }
    }
    static async getUserEnrolledCampaigns(user_id){
        const query = `
            SELECT campaigns.campaign_id, campaigns.name, campaigns.description 
            FROM users 
            JOIN enrollments ON (enrollments.volunteer_id = users.user_id)
            JOIN campaigns USING(campaign_id)
            WHERE user_id = $1
        `;
        const queryParameters = [user_id];
        try {
            const userCampaigns = (await dbClient.query(query, queryParameters)).rows;
            return userCampaigns;
        } catch (err) {
            throw new Error(`Failed to fetch enrolled campaigns for user with id=${user_id} from database: ${err}`);
        }
    }

    static async formatCampaignData(campaign){
        const campaignCreatorData = await this.getCampaignCreatorData(campaign.campaign_id)
         return {
            ...campaign,
            creator: campaignCreatorData
         }
    }
}

(async () => {
   // console.log(await CampaignModel.getCampaignCreatorData(6))
    
})();
module.exports = {CampaignModel};