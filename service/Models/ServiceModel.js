const {dbClient} = require("../dbConnection.js");
const {UserModel} = require("./UserModel.js");

class ServiceModel {
    static async getAll(){
        try{
            const allServices = (await dbClient.query("select * from Services")).rows
            return allServices
        }catch(err){
            throw new Error(`Failed to fetch all services from database: ${err}`)
        }
    }

    static async get(service_id){
        try{
            const serviceData = (await dbClient.query(`select * from Services where service_id = ${service_id}`)).rows[0]
            return serviceData
        }catch(err){
            throw new Error(`Failed to fetch service with id=${service_id} from database: ${err}`)
        }
    }

    static async create({service_name, service_description}){
        try{
            const query = `INSERT INTO Services(service_name, service_description) VALUES ($1, $2)`
            const values = [service_name, service_description]
            const response = await dbClient.query(query, values)
            return response
        }catch(err){
            throw new Error(`Failed to create service ${service_name} in database: ${err}`)
        }
    }
}

// (async () => {
//     console.log(await ServiceModel.getAll())
    
// })();
module.exports = {ServiceModel};