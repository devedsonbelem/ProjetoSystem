const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require ("./Model/User");
const User = require("./Model/User");
const dto = require("./Dto/UserDto");
const UserDto = require("./Dto/UserDto");

mongoose.connect("mongodb://localhost:27017/dbusers");
mongoose.connection.once("open", () => { console.log("mongodb conectado") });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use("api/users", service);

app.post("/api/save", async (req, res) => {
  let user = new UserModel(req.body);
     let dto = new UserDto();
         dto.gerarUuid();
         dto.gerarPasswordCriptografada();
    
        user.uuid = dto.uuid;
        user.password = dto.passwordcript;
  await UserModel.create(user).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb" });
  })
});


app.post("/api/login", async   (req,res)=>{
       let user = new UserModel(req.body);
      let dto = new UserDto();
      dto.gerarPasswordCriptografada();
        user.password = dto.passwordcript;
         let filter = {"email":req.body.email, "password": user.password};
         let update = {"status":"logado"};
      let query= await UserModel.findOneAndUpdate(filter, update,{
            new : true
      });
       

    });


app.listen(4000, () => {
  console.log("Conetado ao Sistema");
})

