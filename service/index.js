const {CampaignModel} = require('./Models/CampaignModel')
const { UserModel } = require('./Models/UserModel')
const app = require('express')()
const PORT = 8080
const cors = require('cors');

app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT} `)
})


app.get("/campaigns", async (req, res)=> {
    const campaignsData = await CampaignModel.getAll()
    res.status(200).send(campaignsData)
})
app.get("/users", async (req, res) => {
    const usersData = await UserModel.getAll()
    res.status(200).send(usersData)
})

app.get("/users/:id", async (req, res) => {
    const {id} = req.params
    const userData = await UserModel.get(id)
    res.status(200).send(userData)
})

