import { dbClient } from "../dbConnection.js";

export class UserModel {
    static async getAll(){
        try{
            const allUsers = await dbClient.query("select * from Users")
            return allUsers.rows
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
}
