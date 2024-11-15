const { dbClient } = require("../dbConnection.js");
const { ServiceModel } = require("./ServiceModel.js");

class UserModel {
    static async getAll(){
        try{
            const allUsers = (await dbClient.query("select * from Users")).rows
            const formattedUsers = await Promise.all(allUsers.map(this.formatUserInformation));
            return formattedUsers
        }catch(err){
            throw new Error(`Failed to fetch all users from database: ${err}`)
        }
    }

    static async get(user_id){
        try{
            const userData = await dbClient.query(`select * from Users where user_id = ${user_id}`)
            return userData.rows[0]
        }catch(err){
            throw new Error(`Failed to fetch user with id=${user_id} from database: ${err}`)
        }
    }

    static async create({name, gender, birth_year, cpf}){
        try{
            const query = `INSERT INTO Users (name, gender, birth_year, cpf) VALUES ($1, $2, $3, $4)`
            const values = [name, gender, birth_year, cpf]
            const response = await dbClient.query(query, values)
            return response
        }catch(err){
            throw new Error(`Failed to create user named ${name} from database: ${err}`)
        }
    }

    static async formatUserInformation(user){
        const userOfferedServices = await ServiceModel.getUserOfferedServices(user.user_id)
        const formattedUserInfo ={...user, offered_services: userOfferedServices}
        return formattedUserInfo
    }

}

  (async () => {
     
  })();

module.exports = {UserModel};