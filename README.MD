



## Comaandos mongodb


cd \
cd mongodb
cd bin
mongod _ start

mongo _ entrar

use nomedobanco _ cria e conecta


show collections;
 
  mostra todas coleções _ tabelas

show databases _ mostra todos os dadaabses

use db _ que vc quiser entrar ....

db.collection.find().pretty();


db.collection.find({"nome":"porfirio"});



npm i -g moment-timezone

npm i moment-timezone _ fusohorario

https://en.wikipedia.org/wiki/List_of_tz_database_time_zones



mongodb ....


db.getCollection("users").createIndex({email:1},{unique:true, sparse:true});



db.alunos.createIndex({uuid_aluno:1});

//1 _ crescente (alfabética)
//unique _ nao duplicar

db.alunos.drop();

db.alunos.insert({"matricula":1,"nome_aluno":"belem","status":"ativo","data_nascimento":
  ISODate("1973-01-28T01:20:00+00:00")});


db.alunos.drop();

db.alunos.remove({matricula:1});

db.alunos.find().pretty();

  db.alunos.find().count();


db.alunos.createIndex({matricula:1},{unique:true});



user dbusers;


db.users.deleteOne({_id:ObjectId("62dd5e578878c8e9d89c1537")});

---Se existir no Banco apaga ...

https://studio3t.com/download-studio3t-free (consulta no mongodb)]

db.alunos.drop();

db.aluno.insert({"matricula":100,"nome_aluno":"porfirio","status":"ativo","uuid":""});

db.users.aggregate([
  {  $lookup:
   {
     "from":"aluno",
     let: {the_nome: "$nome"},
     pipeline:
     [
      {$match:
        {$expr:
            {$and:
             [
              {$eq:["$$the_nome","$nome_aluno"]}
             ]
           }
        }   
      }
     ],
     as:"aluno"
   }
   }
]).pretty();

enviarEmail : mailtrap.io

===================



npm i -g nodemailer

npm i nodemailer


npm install node-session
var NodeSession = require('node-session');
 
// init
session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});
 
// start session for an http request - response
// this will define a session property to the request object
session.startSession(req, res, callback)

req.session.put('key', 'value');  

req.session.push('user.teams', 'developers');
 

var value = req.session.get('key');
 

var value = req.session.get('key', 'default');
Retrieving An Item And Forgetting It

var value = req.session.pull('key', 'default');


const callback =  require("node-callback");

function asyncTask(param1, callback) {
    let cb = new Callback(callback);

    if (!needToDoTheWork) {
        // nothing to do, we return here calling the callback
        return cb.call(null, result);
    } else {
        doTheWorkAsync((err) => {
            // after the async work is done we call the callback
            cb.call(err, result);
        });
    }
};


app.get("/api/newstorage/:uuid", async (req, res) => {
   let vuuid = req.params.uuid;
 console.log(vuuid);
  let filter = { "uuid": vuuid };
  console.log('uuid' + req.params.uuid);
  let userModel = await UserModel.findOne(filter).exec();
  if (userModel.uuid == null) {
   let err = { "msg": "Nao encontrado" };
     console.log('errado ' + err);
       return res.status(404).send(err);
     }
  let  data = { "msg": "encontrado", "users": userModel };
    localStorage.setItem('key', vuuid);
   return  res.status(200).send(data);
});

app.get("/mostra",(req,res)=>{
 res.send(localStorage.getItem('key'));
});


npm i node-localstorage