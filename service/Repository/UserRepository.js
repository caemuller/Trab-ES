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

    static async getUserByPasswordAndName(user_name, password){
        try{
            const query = `SELECT u.*, JSON_AGG(s.service_name) as services
                            FROM Users as u 
                            LEFT JOIN VolunteerServices AS vs ON vs.volunteer_id = u.user_id
                            LEFT JOIN Services as s ON s.service_id = vs.service_id
                            WHERE u.name = $1 and u.password = $2
                            GROUP BY u.user_id`
            const queryParams = [user_name, password]
            const userData = (await dbClient.query(query, queryParams)).rows[0]
            return  userData;
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

    static async delete(user_id){
        try{
            const query = `DELETE FROM users WHERE user_id = $1`
            const query_params = [user_id]
            const response = await dbClient.query(query, query_params)
            return response
        }catch(err){
            throw new Error(`Failed to delete user with id=${user_id} in database: ${err}`)
        }
    }

    static async addServicesToUser(user_id, services){
        try{
            const deleteQuery = "DELETE FROM VolunteerServices WHERE volunteer_id = $1;"
            const valuesDelete = [user_id]
            await dbClient.query(deleteQuery, valuesDelete)

            const query = `INSERT INTO VolunteerServices (volunteer_id, service_id)
                            SELECT ${user_id} AS volunteer_id, s.service_id
                            FROM Services AS s
                            WHERE s.service_name in (${services.map(s => {return `'${s}'`;}).join(',')})
                            `
            const response = await dbClient.query(query)
            return response
        }catch(err){
            throw new Error(`Failed to create user service: ${err}`)
        }
    }

    static async getServices(user_id){
        try{
            const query = `SELECT JSON_AGG(s.service_name) as services
                            FROM Users as u 
                            LEFT JOIN VolunteerServices AS vs ON vs.volunteer_id = u.user_id
                            LEFT JOIN Services as s ON s.service_id = vs.service_id
                            WHERE u.user_id = $1
                            GROUP BY u.user_id`

            const query_params = [user_id]
            const response = (await dbClient.query(query, query_params)).rows[0];
            return response
        }catch(err){
            throw new Error(`Failed to create user service: ${err}`)
        }
    }
}

  (async () => {
     
  })();

module.exports = {UserRepository};