const {CampaignModel} = require('./Models/CampaignModel')
const { UserModel } = require('./Models/UserModel')
const app = require('express')()
const PORT = 8080
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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
