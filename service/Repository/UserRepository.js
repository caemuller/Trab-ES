const { dbClient } = require("../dbConnection.js");
const { CampaignRepository } = require("./CampaignRepository.js");
const { ServiceRepository } = require("./ServiceRepository.js");

class UserRepository {
    static async getAll(){
        try{
            const allUsers = (await dbClient.query("select * from Users")).rows
            const formattedUsers = await Promise.all(allUsers.map(this.formatUserInformation));
            return formattedUsers
        }catch(err){
            throw new Error(`Failed to fetch all users from database: ${err}`)
        }
    }

    static async getById(user_id){
        try{
            const userData = (await dbClient.query(`select * from Users where user_id = ${user_id}`)).rows[0]
            const formattedUserData = this.formatUserInformation(userData)
            return  formattedUserData
        }catch(err){
            throw new Error(`Failed to fetch user with id=${user_id} from database: ${err}`)
        }
    }

    static async getPasswordByName(user_name){
        try{
            const query = `select password from Users where name = $1`
            const queryParams = [user_name]
            const userData = (await dbClient.query(query, queryParams)).rows[0]
            return  userData.password
        }catch(err){
            throw new Error(`Failed to fetch user ${user_name}'s password from database: ${err}`)
        }
    }

    static async create({name, password, profile_description, gender, birth_year, cpf}){
        try{
            const query = "INSERT INTO Users (name, password, profile_description, gender, birth_year, cpf) VALUES ($1, $2,$3, $4, $5, $6)"
            
            const values = [name, password, profile_description, gender, birth_year, cpf]
            const response = await dbClient.query(query, values)
            return response
        }catch(err){
            throw new Error(`Failed to create user named ${name} from database: ${err}`)
        }
    }

    static async formatUserInformation(user){
        const userOfferedServices = await ServiceRepository.getUserOfferedServices(user.user_id)
        const userEnrolledCampaigns = await CampaignRepository.getUserEnrolledCampaigns(user.user_id)
        const { password, ...userWithoutPassword } = user;
        const formattedUserInfo = {
            ...userWithoutPassword, 
            offered_services: userOfferedServices, 
            enrolledCampaigns: userEnrolledCampaigns,
        }
        return formattedUserInfo
    }

}

  (async () => {
     
  })();

module.exports = {UserRepository};