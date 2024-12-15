const { dbClient } = require("../dbConnection.js");

class EnrollmentRepository {

    static async create(campaign_id, volunteer_id){
        try{
            const query = "INSERT INTO Enrollments (campaign_id, volunteer_id) VALUES ($1, $2)"
            
            const values = [campaign_id, volunteer_id]
            const response = await dbClient.query(query, values)
            return response
        }catch(err){
            throw new Error(`Failed to create enrollment: ${err}`)
        }
    }

    static async delete(campaign_id, volunteer_id){
        try{
            const query = `DELETE FROM Enrollments WHERE campaign_id = $1 AND volunteer_id = $2`
            const query_params = [campaign_id, volunteer_id]
            const response = await dbClient.query(query, query_params)
            console.log(response)
            return response
        }catch(err){
            throw new Error(`Failed to delete enrollment with campaign_id=${campaign_id} and volunteer_id=${volunteer_id} in database: ${err}`)
        }
    }
}

  (async () => {
     
  })();

module.exports = {EnrollmentRepository};