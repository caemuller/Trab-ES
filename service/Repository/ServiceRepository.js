const {dbClient} = require("../dbConnection.js");

class ServiceRepository {
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
            const query = 'select * from Services where service_id = $1';
            const values = [service_id];
            const serviceData = (await dbClient.query(query, values)).rows[0];
            return serviceData;
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

    static async getUserOfferedServices(user_id){
        const query = `select service_id, service_name, service_description from Users join VolunteerServices
                        on (Users.user_id = volunteerservices.volunteer_id)
                        join Services using (service_id)
                        where user_id = $1`
        const query_params = [user_id];
        const userOfferedServices = (await dbClient.query(query, query_params)).rows;

        return userOfferedServices
    }

    static async editUserServices(user_id, service_ids){
        let query = `delete from VolunteerServices where volunteer_id = $1`
        let query_params = [user_id]
        await dbClient.query(query, query_params)
        
        if(service_ids.length === 0){
            return;
        }
        query = `insert into VolunteerServices (volunteer_id, service_id) values`;
        const services_query_list = service_ids.map((service_id, index) => `($1, $${index + 2})`).join(',');
        query += services_query_list;
        query_params = [user_id, ...service_ids];
        await dbClient.query(query, query_params);
    }

    static async getAllServices() {
        const query = 'SELECT * FROM Services';
        const result = await dbClient.query(query);
        return result.rows;
    }
}

(async () => {
  
})();

module.exports = {ServiceRepository};