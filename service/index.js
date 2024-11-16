const {CampaignModel} = require('./Models/CampaignModel')
const { UserModel } = require('./Models/UserModel')
const app = require('express')()
const PORT = 8080


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT} `)
})


app.get("/campaigns", async (req, res)=> {
    try{
        const campaignsData = await CampaignModel.getAll()
        res.status(200).send(campaignsData)
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching campaigns data: ${err}` });
    }
    
})
app.get("/users", async (req, res) => {
    try {
        const usersData = await UserModel.getAll()
        res.status(200).send(usersData)
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching users data: ${err}` });
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserModel.get(id);
        res.status(200).send(userData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching user data: ${err}` });
    }
})

