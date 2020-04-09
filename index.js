const http = require("http");
const socketIo = require("socket.io");
 const express=require('express');
 const cors=require('cors');
 const bodyParser=require('body-parser');
 const appp= express();
 const app = http.createServer(appp);
const io = socketIo(app);
 const Register= require('./Register.model');
 const RegisterRoute=express.Router();
 const bcrypt= require('bcryptjs');
 const PORT=5000;
const mongoose = require("mongoose");
const dotenv=require('dotenv');
const {registerValidation, loginValidation} =require("./validation");
const jwt= require("jsonwebtoken");


dotenv.config();

 appp.use(cors());
 appp.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/Register",{useUnifiedTopology:true , useNewUrlParser: true});
const connection= mongoose.connection;
connection.once("open",()=>{
    console.log("connection established successfully");
});













RegisterRoute.route('/').get((req,res)=>{
    console.log("called by someone");
Register.find(function (err,todos){

    if(err){
        console.log("error");

    }else{
 res.json(todos);
    }

})
});


RegisterRoute.route('/:id').get((req , res)=>{

let id=req.params.id;

    Register.findById((id, (err, Registerdata)=>{
        res.json(Registerdata);
    }))

});


RegisterRoute.route('/add').post(     async  (req, res)=>{
    console.log("called by someone");

const {error}=registerValidation(req.body);
if(error)
{res.status(400).send(error.details[0].message)}
console.log("Email", req.body);
const email= await Register.findOne({Email: req.body.Email});
if(email) return res.status(400).send("Record already exist");


const salt = await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(req.body.password,salt)



    let Registerdata = new Register({
Name: req.body.Name,
Email: req.body.Email,
password: hashedPassword
,City: req.body.City,
Country:req.body.Country,
Address: req.body.Address,
ipfsHash: req.body.ipfsHash




    });
    Registerdata.save()
    .then(Registerdata => {res.status(200).json({'Registerdata': 'Registerdata added successfully'})})
    .catch(err => {res.send(450).send({'adding new Registerdata failed':'failed'})})
});












RegisterRoute.route('/login').post(     async  (req, res)=>{
    console.log("called by someone");

const {error}=loginValidation(req.body);

if(error)
{
    res.status(400).send(error.details[0].message)
}
   
   
    console.log("Email", req.body);
    const email= await Register.findOne({Email: req.body.Email});
    if(!email) return res.status(400).send("email is not exist");


        const validpass= await bcrypt.compare(req.body.password , email.password);

        if(!validpass) return res.status(400).send("invalid");
console.log("reached");     

const token= jwt.sign({_id: email._id},process.env.Token_Secret);




res.header('auth-token',token).send({token: token,
Email: email.Email,
ipfsHash: email.ipfsHash,
Name: email.Name,
Count: count
});


});











RegisterRoute.route('/update/:id').post((req , res)=>{

    
    
        Register.findById((req.params.id, (err, Registerdata)=>{
           
           if(!Registerdata){
                res.status(450).send("error has occured");

           }
           else{
Registerdata.todo_description=req.params.todo_description;
Registerdata.todo_priority = req.params.todo_priority;
Registerdata.todo_responsible = req.params.todo_responsible;
Registerdata.todo_completed = req.params.todo_completed;

Registerdata.save().then(Registerdata =>{res.json("Registerdata updated")})
.catch(err=>{res.status(400).send("not updated")})

           }
           
            res.json(Registerdata);
        }))
    
    });











appp.use('/register', RegisterRoute)


let count=0;




io.on("connection", socket => {
    console.log("New client connected");
count=count+1;

    //Here we listen on a new namespace called "incoming data"
    socket.on("incoming data", (data)=>{
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
       socket.broadcast.emit("outgoing data", {num: data});
    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});


















app.listen(PORT,()=>{


console.log("server is Running on",PORT);    
})