const {dbClient} = require("../dbConnection.js");
const {UserModel} = require("./UserModel.js");

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

    static async formatCampaignData(campaign){
        const campaignCreatorData = await UserModel.get(campaign.creator_id)
         return {
            ...campaign,
            creator: campaignCreatorData
         }
    }
}

(async () => {
})();
module.exports = {CampaignModel};