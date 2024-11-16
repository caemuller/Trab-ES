const {CampaignModel} = require('./Models/CampaignModel')
const { UserModel } = require('./Models/UserModel')
const app = require('express')()
const PORT = 8080
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
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

app.post("/users", async (req,res)=> {
    try {
        const { name, password, profile_description, gender, birth_year, cpf } = req.body;
        await UserModel.create({ name, password, profile_description, gender, birth_year, cpf });
        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        res.status(500).send({ error: `An error occurred while creating the user: ${err}` });
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserModel.getById(id);
        res.status(200).send(userData);
    } catch (err) {
        res.status(500).send({ error: `An error occurred while fetching user data: ${err}` });
    }
})

app.post("/user/login", async (req,res)=>{
    try {
        const { name, password } = req.body
        const realPassword = await UserModel.getPasswordByName(name);
        const authenticated = password == realPassword;
        if (authenticated) {
            res.status(200).send({ message: "Login successful",authenticated, ok: true });
        } else {
            res.status(401).send({ message: "Invalid credentials", authenticated, ok:false});
        }
    } catch (err) {
        res.status(500).send({ error: `An error occurred during login: ${err}` });
    }
})

