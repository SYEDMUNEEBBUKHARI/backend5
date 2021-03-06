const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const appp = express();
const app = http.createServer(appp);
const io = socketIo(app);
const RegisterModel = require("./Register.model");
const Notification = require("./Notification.model");
const Landdatamodel = require("./Landdata.model");
const PunjabLanddatamodel = require("./PunjabLanddata.model");
const RegisterRoute = express.Router();
const bcrypt = require("bcryptjs");
const PORT = 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  registerValidation,
  loginValidation,
  NotificationValidation,
  LanddataValidation,
  PunjabLanddataValidation,

} = require("./validation");
const jwt = require("jsonwebtoken");
const LanddataModel = require("./Landdata.model");

dotenv.config();
RegisterRoute.all("*", cors());

appp.use("*", cors());

mongoose.connect("mongodb://localhost:27017/Register", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection established successfully");
});

// io.set('origins', '*:*');

// appp.get('/local:id',function(req,res){
//     var id=req.params.id;
//     console.log("idiiii",req.params.id);
//         Notification.findById((id, (err, Registerdata)=>{
//             res.json(Registerdata);

// }))})

RegisterRoute.route("/fetch").get(async (req, res) => {


  const Not = await Notification.find({}).sort({ _id: -1 });
  console.log("Not", Not);
  if (Not) {
    res.send(Not);
  }
});

RegisterRoute.route("/fetchdataLandTobe").get((req, res) => {
  console.log("called by someone parent", req.query.id);

  const data = Landdatamodel.find().then((data) => {
    console.log("da", data);
    res.send(data);
  });







});


RegisterRoute.route("/deleteLand").get(async (req, res) => {
  const del = await Landdatamodel.findByIdAndDelete({ _id: req.query.id });
  console.log("Delete", del._id);
  res.status(200).send(del);
});








RegisterRoute.route("/VerifytheLand").get(async (req, res) => {
  console.log("verify the Land id", req.query.serial);
  console.log("verify the Land cnic", req.query.cnic);
  console.log("verify the Land Name", req.query.Name);



  // const data = await PunjabLanddatamodel.find({ Name: req.query.Name }).then((data) => {
  //   console.log("daP", data);

  const email = await PunjabLanddatamodel.find({ SerialNo: req.query.serial, Cnic: req.query.cnic, Name: req.query.Name });


  if (email) {
    console.log("email res", email);


    return res.status(200).send(email);
  }

  else {
    console.log("not have");
    res.status(400).send(email);
  }


  // });







});

// appp.get('/:id', cors(), function (req, res, next) {
//     console.log("param",req.params);
//     res.json({msg: 'This is CORS-enabled for a Single Route'})
//   })

// RegisterRoute.get("/:id",(req,res)=>{
//        console.log("FetchNotification", req.params);
//         let id=req.params.id;

//          Notification.find(({},{id: id}, (err, RegisterNotification)=>{
//         res.json(RegisterNotification);
//     }))
// });

RegisterRoute.route("/sendlandtocity").post(async (req, res) => {
  const { error } = LanddataValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  console.log("Land data sheet", req.body.City);
  console.log("Land data sheet", req.body.Name);
  console.log("Land data sheet", req.body.Cnic);


  // const email = await Landdatamodel.findOne({ SerialNo: req.body.SerialNo });
  console.log("1");

  // if (email) return res.status(400).send("Record already exist");
  console.log("2");

  let Landdatamake = new Landdatamodel({
    Name: req.body.Name,
    Cnic: req.body.Cnic,

    Metamaskid: req.body.Metamaskid,
    City: req.body.City,
    StreetNo: req.body.StreetNo,
    Postcode: req.body.Postcode,
    SerialNo: req.body.SerialNo,
    Province: req.body.Province,
    LandNo: req.body.LandNo,
    Country: req.body.Country,
    LandArea: req.body.LandArea,
    LandLocation: req.body.LandLocation,
  });

  // Landdatamake.save()
  //   .then((Landdatamake) => {
  //     res.sendStatus(200).json({ Landdatamake: "Saved Land data" });
  //   })
  //   .catch((err) => {
  //     res
  //       .sendStatus(450)
  //       .send({ "adding new Land failed": "failed" });
  //   });

  Landdatamake.save()
    .then((Landdatamake) => {
      // res.json({
      //   Landdatamake: "RegisterNotification added successfully",
      // });
    })
    .catch((err) => {
      if (err) {
        res.send({
          Landdatamake: "error not add",
        });
      }
    });

});

RegisterRoute.route("/add").post(async (req, res) => {
  console.log(" add the data");

  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  console.log("Email", req.body);
  const email = await RegisterModel.findOne({ Email: req.body.Email });
  console.log("1");

  if (email) return res.status(400).send("Record already exist");
  console.log("2");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let Registerdata = new RegisterModel({
    Name: req.body.Name,
    Email: req.body.Email,
    password: hashedPassword,
    City: req.body.City,
    Country: req.body.Country,
    Address: req.body.Address,
    ipfsHash: req.body.ipfsHash,
  });
  console.log("3");

  Registerdata.save()
    .then((Registerdata) => {
      res.status(200).json({ Registerdata: "Registerdata added successfully" });
    })
    .catch((err) => {
      res.status(200).json({ err: "Registeration failed" });
    });
});

//notification

RegisterRoute.route("/addNotificationn").post(async (req, res) => {
  console.log("add the notification");

  const { error } = NotificationValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  console.log("Notification data", req.body);

  let RegisterNotification = new Notification({
    FromUser: req.body.data.FromUser,
    ToUser: req.body.data.ToUser,
    LandId: req.body.data.LandId,
  });
  RegisterNotification.save()
    .then((RegisterNotification) => {
      res.status(200).json({
        RegisterNotification: "RegisterNotification added successfully",
      });
    })
    .catch((err) => {
      res
        .send(450)
        .send({ "adding new RegisterNotification failed": "failed" });
    });
});

RegisterRoute.route("/login").post(async (req, res) => {
  console.log("called by login");

  const { error } = loginValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  console.log("Email", req.body);
  const email = await RegisterModel.findOne({ Email: req.body.Email });
  if (!email) {
    console.log("emailaya");
    return res.status(400).json("data not found");
  }
  const validpass = await bcrypt.compare(req.body.password, email.password);

  if (!validpass) return res.status(400).json("data not found");
  console.log("reached");

  const token = jwt.sign({ _id: email._id }, process.env.Token_Secret);

  res.header("auth-token", token).send({
    token: token,
    Email: email.Email,
    ipfsHash: email.ipfsHash,
    Name: email.Name,
    Count: count,
  });
});



RegisterRoute.route("/PunjabLand").post(async (req, res) => {
  console.log(" Punjab data");

  const { error } = PunjabLanddataValidation(req.query);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  console.log("Punjab body", req.query);
  const SerialN = await PunjabLanddatamodel.findOne({ SerialNo: req.body.SerialNo });
  console.log("1");

  if (SerialN) return res.status(400).send("Record already exist");
  console.log("2");



  let PunjabLanddata = new PunjabLanddatamodel({
    Name: req.query.Name,
    Cnic: req.query.Cnic,

    City: req.query.City,
    StreetNo: req.query.StreetNo,
    Postcode: req.query.Postcode,
    SerialNo: req.query.SerialNo,
    Province: req.query.Province,
    LandNo: req.query.LandNo,
    Country: req.query.Country,
    LandArea: req.query.LandArea,
    LandLocation: req.query.LandLocation,





  });
  console.log("3");

  PunjabLanddata.save()
    .then((PunjabLanddata) => {
      res.status(200).json({ PunjabLanddata: "Punjab Registerdata added successfully" });
    })
    .catch((err) => {
      res.status(200).json({ err: " Punjab Registeration failed" });
    });
});

// RegisterRoute.route('/update/:id').post((req , res)=>{

//     console.log("Update id");

//         Register.findById((req.params.id, (err, Registerdata)=>{

//            if(!Registerdata){
//                 res.status(450).send("error has occured");

//            }
//            else{
// Registerdata.todo_description=req.params.todo_description;
// Registerdata.todo_priority = req.params.todo_priority;
// Registerdata.todo_responsible = req.params.todo_responsible;
// Registerdata.todo_completed = req.params.todo_completed;

// Registerdata.save().then(Registerdata =>{res.json("Registerdata updated")})
// .catch(err=>{res.status(400).send("not updated")})

//            }

//             res.json(Registerdata);
//         }))

//     });

let count = 0;

io.on("connection", (socket) => {
  console.log("New client connected");
  const sessionid = socket.id;
  console.log("iddd", sessionid);
  count = count + 1;
  socket.on("web", () => {
    console.log("coming");
    socket.broadcast.emit("chkbradcast", "hi");
  });

  socket.on("Approved", (data) => {
    console.log("Approvedata", data);
    io.sockets.emit("SendApprovedata", data);
  });

  socket.on("sale", (data) => {
    console.log("data", data);

    socket.broadcast.emit("sendtonetwork", { data: data });
  });

  //A special namespace "disconnect" for when a client disconnects
  socket.on("disconnect", () => console.log("Client disconnected"));
});

appp.use(bodyParser.json());
appp.use("/api", RegisterRoute);
appp.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log("server is Running on", PORT);
});
