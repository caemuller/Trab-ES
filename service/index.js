const {CampaignRepository} = require('./Repository/CampaignRepository')
const { UserRepository } = require('./Repository/UserRepository')
const { EnrollmentRepository } = require('./Repository/EnrollmentRepository')
const app = require('express')()
const PORT = 8080
const cors = require('cors');
const bodyParser = require('body-parser');
const { ServiceRepository } = require('./Repository/ServiceRepository');

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT} `)
})


app.get("/campaigns", async (req, res)=> { //get list of all campaigns
    try{
        const campaignsData = await CampaignRepository.getAll()
        res.status(200).send(campaignsData)
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching campaigns data: ${err}` });
    }
    
})
app.get("/campaigns/:id", async (req, res)=> { // get specific campaign data
    try{
        const { id } = req.params;
        const campaignData = await CampaignRepository.get(id);
        res.status(200).send(campaignData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching campaign ${id}'s data: ${err}` });
    }
    
})

app.delete("/campaigns/:id", async (req, res)=> {
    try{
        const { id } = req.params;
        const campaignData = await CampaignRepository.delete(id);
        res.status(200).send(campaignData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching campaign ${id}'s data: ${err}` });
    }
    
})

app.put("/campaigns/:id", async (req, res)=> {
    try{
        const { id } = req.params;
        const campaignData = await CampaignRepository.approve(id);
        res.status(200).send(campaignData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching campaign ${id}'s data: ${err}` });
    }
    
})

app.post("/campaigns", async (req,res)=>{ // create campaign
    try {
        const { name, description, creator_id, requested_service_id, city, subscription_limit_date, event_date } = req.body.campaign_data;
        await CampaignRepository.create({ name, description, creator_id, requested_service_id, city, subscription_limit_date, event_date });
        res.status(201).send({ message: "Campaign created successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while creating the campaign: ${err}` });
    }
})

app.post("/campaigns/enroll", async (req,res)=>{ // Enroll user in campaign
    try {
        const { user_id, campaign_id } = req.body;
        await CampaignRepository.enrollUserInCampaign(campaign_id, user_id);
        res.status(200).send({ message: "User enrolled successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while enrolling user in campaign: ${err}` });
    }
})

app.get("/users", async (req, res) => { // get list of all users
    try {
        const usersData = await UserRepository.getAll()
        res.status(200).send(usersData)
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching users data: ${err}` });
    }
})

app.post("/users", async (req,res)=> { // create user
    try {
        const { name, password, profile_description, gender, birth_year, cpf } = req.body;
        await UserRepository.create({ name, password, profile_description, gender, birth_year, cpf });
        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while creating the user: ${err}` });
    }
})

app.get("/users/:id", async (req, res) => { // get specific user data
    try {
        const { id } = req.params;
        const userData = await UserRepository.getById(id);
        res.status(200).send(userData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching user data: ${err}` });
    }
})

app.post("/users/:id/services", async (req, res) => {
    try {
        const { id } = req.params;
        const { services } = req.body; // Expecting an array of services
        await UserRepository.addServicesToUser(id, services);
        res.status(200).send({ message: "Services updated successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while saving services: ${err}` });
    }
});


app.delete("/users/:id", async (req, res)=> {
    try{
        const { id } = req.params;
        const userData = await UserRepository.delete(id);
        res.status(200).send(userData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching user ${id}'s data: ${err}` });
    }
    
})

app.post("/user/login", async (req,res)=>{ // check user info for login
    try {
        const { name, password } = req.body
        const user = await UserRepository.getUserByPasswordAndName(name, password);
        if (user) {
            res.status(200).send({ message: "Login successful", data: user, ok: true });
        } else {
            res.status(401).send({ message: "Invalid credentials", ok:false});
        }
    } catch (err) {
        res.status(500).send({ error: `An error occurred during login: ${err}` });
    }
})

app.post("/user/:id/services", async (req,res)=>{ //updates user services
    try {
        const { service_ids } = req.body;
        const user_id = req.params.id;
        await ServiceRepository.editUserServices(user_id, service_ids);
        res.status(200).send({ message: "User services updated successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while updating user services: ${err}` });
    }
})

app.get("/users/:id/services", async (req, res) => {
    try {
        const user_id = req.params.id;
        const data = await UserRepository.getServices(user_id);

        if (data?.services.length && data?.services[0] == null) {
            return res.status(200).send({ services: [] });
        }

        return res.status(200).send({ services: data.services });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while getting user services: ${err}` });
    }
});


app.get('/services', async (req, res) => {
    try {
        const services = await ServiceRepository.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).send({ error: "Error fetching services" });
    }
});

app.post("/enrollment", async (req,res)=>{
    try {
        const { campaign_id, volunteer_id } = req.body;
        await EnrollmentRepository.create(campaign_id, volunteer_id);
        res.status(200).send({ message: "Enrollment created successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while creating enrollment: ${err}` });
    }
})

app.delete("/enrollment", async (req,res)=>{
    try {
        const { campaign_id, volunteer_id } = req.body;
        await EnrollmentRepository.delete(campaign_id, volunteer_id);
        res.status(200).send({ message: "Enrollment deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while deleting enrollment: ${err}` });
    }
})
