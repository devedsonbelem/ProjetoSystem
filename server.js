const express = require("express");
const { ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Model/Users");
const UsersDto = require("./Dto/UsersDto");
const bcrypt = require('bcryptjs');
const AlunoModel = require('./Model/Aluno');
const DisciplinaModel = require('./Model/Disciplina');
const ContatoModel = require('./Model/Contato');
const AvaliacaoModel = require('./Model/Avaliacao');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage('./scratch');
mongoose.connect("mongodb://localhost:27017/dbusers", { useNewUrlParser: true });
mongoose.connection.once("open", () => { console.log("mongodb conectado") });

const app = express();



app.use(cors());
app.use(bodyParser.json());



app.get("/api/sendmail/:email", (req, res) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "68aaeff7db3e41",
      pass: "648ee8cf3d530e"
    }
  });
  let vemail = req.params.email;
  let mainOptions = {
    from: '"Developer"profedsonbelem@gmail.com',
    to: vemail,
    subject: 'Teste de Envio de Email',
    html: '<h2>É uma Honra estara aqui mais um ano com os dois</h2>'
  };
  console.log('html :' + mainOptions.html);

  transport.sendMail(mainOptions, function (error, info) {
    if (err) {
      console.log(err.message);

    } else {
      console.log("email enviado ...");
    }
  });

  res.send("Email   Enviado")
});










app.get("/api/userall", async (req, res) => {
  let userModel = [];
  const cursor = UserModel.find().cursor();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    userModel.push(doc);
    console.log(doc);
  }
  return res.status(200).json(userModel);
});





app.get("/api/getuser/:nome", async (req, res, next) => {
  let vnome = req.params.nome;
  let filter = { "nome": vnome };
  console.log('nome' + req.params.nome);
  let userModel = await UserModel.findOne(filter).exec();
  if (userModel.email != null) {
    let resp = { "msg": "encontrado", "users": userModel };
    return res.status(200).json(resp);
  }
  else {
    let resp = { "msg": "Nao encontrado" };
    return res.status(404).json(resp);
  }
});




app.get("/api/registraruuid/:uuid", async (req, res) => {
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
  let data = { "msg": "encontrado", "users": userModel };
  localStorage.setItem('usuario', JSON.stringify(userModel));
  return res.status(200).send(data);
});

app.get("/mostra", (req, res) => {
  res.send(localStorage.getItem('usuario'));
});


app.get("/api/findById/:id", async (req, res, next) => {
  let vid = req.params.id.trim();
  let filter = { "_id": new ObjectId(vid) };
  console.log('id :' + vid);
  let userModel = await UserModel.findById(filter).exec();
  if (userModel.email != null) {
    let resp = { "msg": "encontrado", "users": userModel };
    return res.status(200).json(resp)
  }
  else {
    let resp = { "msg": "Nao encontrado" };
    return res.status(404).json(resp);
  }
});

app.post("/api/save", async (req, res) => {
  let user = new UserModel({
    _id: new ObjectId(),
    nome: req.body.nome,
    email: req.body.email,
    status: "ativo"
  });
  //delete User._id

  let dto = new UsersDto();
  user.uuid = dto.gerarUuid();
  user.password = dto.setPasswordUsers(req.body.password);
  await UserModel.create(user).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb " + err.message });
  })
});


app.post("/api/saveuseraluno", async (req, res) => {
  let aluno = new AlunoModel(req.body);
  aluno._id = new ObjectId();
  let user = JSON.parse(localStorage.getItem('usuario'));
  console.log(user);
  aluno.nome_aluno = user.nome;
  aluno.email = user.email;
  aluno.status = user.status;
  aluno.uuid_aluno = user.uuid;
  await AlunoModel.create(aluno).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb " + err.message });
  })
});


//nome,status, matricula
app.post("/api/saveonlyaluno", async (req, res) => {
  let quantidade = 0;
  await AlunoModel.find().count().then(resp => { quantidade = +resp }
  );

  let aluno = new AlunoModel({
    "matricula": quantidade + 1,
    "nome_aluno": req.body.nome_aluno,
    "status": "ativo",
    "data_nascimento": new Date(req.body.data_nascimento)
  });

  console.log(aluno.data_nascimento);

  aluno._id = new ObjectId();
  aluno.uuid_aluno = uuidv4();


  await AlunoModel.create(aluno).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb " + err.message });
  })
});

//onetoMany
app.post("/api/savedisciplina", async (req, res) => {
  let disciplina = new DisciplinaModel();
  disciplina.nome_disciplina = req.body.nome_disciplina;
  disciplina._id = new ObjectId();

  let pos = req.body.aluno_id.length;
  console.log('pos',pos);

  for (var i = 0; pos > i; i++) {
    let aluno = new AlunoModel({});
     aluno._id = new ObjectId(req.body.aluno_id[i]);
     disciplina.aluno_id.push(aluno);  
    console.log('todos os alunos', aluno);
  }

  await DisciplinaModel.create(disciplina).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb " + err.message });
  })
});

//onetoone
app.post("/api/savecontato", async (req, res) => {
  let aluno = new AlunoModel({});
  aluno._id = new ObjectId(req.body.aluno_id);
  
  let contatoModel = new ContatoModel();
  contatoModel.caixa_postal = req.body.caixa_postal;
  contatoModel.cidade = req.body.cidade;
  contatoModel.bairro = req.body.bairro;
  contatoModel.telefone = req.body.telefone;
  contatoModel._id = new ObjectId();
  contatoModel.aluno_id = aluno; //recebe objeto instanciado do aluno
 
  await ContatoModel.create(contatoModel).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb " + err.message });
  });

});

 
 //manytomany
app.post("/api/saveavaliacao", async (req, res) => {
  let aluno = new AlunoModel({});
  aluno._id = new ObjectId(req.body.aluno_id);
  let disciplinaModel = new DisciplinaModel();
  disciplinaModel._id = new ObjectId(req.body.disciplina_id);
  let avaliacaoModel = new AvaliacaoModel();
  avaliacaoModel.nota1 = parseFloat(req.body.nota1);
  avaliacaoModel.nota2 = parseFloat(req.body.nota2);
  avaliacaoModel.media = parseFloat(req.body.media);
  avaliacaoModel.situacao = req.body.situacao;

  avaliacaoModel._id = new ObjectId();
  avaliacaoModel.aluno_id = aluno;
  avaliacaoModel.disciplina_id = disciplinaModel;

  await AvaliacaoModel.create(avaliacaoModel).then(resp => {
    return res.status(200).json(resp);
  }).catch(err => {
    return res.status(500).json({ "error": "mongodb " + err.message });
  });
});

app.delete("/api/removealuno/:id", async (req, res) => {
  let aluno = new AlunoModel();
  aluno._id = new ObjectId(req.params.id);

  console.log("id" + aluno._id);

  await AlunoModel.findByIdAndRemove(aluno).then(resp => {
    return res.status(200).json({ "message": "encontrado e excluido com sucesso", resp });
  }).catch(err => {
    return res.status(404).json({ "message": "nao encontrado", "error": "mongodb " + err.message });
  });

});



app.put("/api/updatealuno/:id", async (req, res) => {
  let oldid = new ObjectId(req.params.id);
  console.log("id", oldid);
  let filter = { "_id": oldid };
  let updated = { $set: { "nome_aluno": req.body.nome_aluno, "data_nascimento": new Date(req.body.data_nascimento), "status": req.body.status } };
  let opt = { multi: true };
  await AlunoModel.update(filter, updated, opt, callback);
  function callback(error, doc) {
    if (error) { return res.status(200).json({ "message": "Nao Alterado sucesso" }); }
    return res.status(200).json({ "message": "Alterado sucesso" });
  }

});


app.get("/api/findalldisciplina", async (req,res)=>{
  let objeto=[{
    nome_disciplina:"",
    nome_aluno:[""]
  }];
  let disciplinas = [];
   await DisciplinaModel.find().then(resp=>{
     disciplinas.push(resp); 
     console.log('disciplinas', disciplinas);
  }).catch(err=>{
     console.log('error', err.message);
  })
  var i=0;
   disciplinas.forEach(res=>{
     if (!res.filter.aluno_id){
     objeto[i].nome_disciplina =  res.nome_disciplina;
    
       console.log(res.aluno_id);
         
       let quantidade = res.aluno_id.length;

         for(var j=0;j<quantidade;j++){
           let aluno = new AlunoModel();
            aluno._id =   res.aluno_id;
            AlunoModel.findById(aluno._id, function(err, docs) {
            if (err){
                console.log(err.message);
            }
            else{
               objeto[i].nome_aluno.push(docs.nome_aluno);
            }
        });
      }
  }

});
         
    return JSON.stringify(objeto);
   })


 




app.post("/api/login", async (req, res) => {
  let user = new UserModel(req.body);
  let dto = new UsersDto();
  //1 Etapa Buscando estou criptografando
  console.log(user.password); // a senha está criptografada postman (disparei)
  let filter = { "email": req.body.email }; // Busquei o email
  //consultar somente pelo email --com isso trago a senha
  //select * from usuario where email='porfirio';
  let result = await UserModel.findOne(filter).exec();
  //traz a senha result tem a senha (banco e trouxe a senha)
  console.log("buscou a senha e o " + result.password + "," + result.nome)
  //compare (não criptografado com criptogrado do banco)
  let resp = bcrypt.compare(req.body.password, result.password, function (err, res) {
    if (err) {
      return res.send(err.message);
    }
    console.log("senha valida");
  });
  console.log(resp + "senha valida");
  //filtro (select * from usuario where email='profirio')
  let filter2 = { "email": req.body.email };
  // update usuario set status="logado", "token":"token-123"
  let update = { $set: { "status": "logado", "token": "token-123" } };
  //os dados serão modificados
  let opt = { new: true }
  await UserModel.findOneAndUpdate(filter2, update, opt, (error, doc) => {
    if (error) { return res.json(error.message) }
    return res.json(doc);
  });
});




app.post("/api/relaciona", async (req, res) => {
  let aluno = new AlunoModel();
  aluno.uuid_aluno = req.params.uuid;
  await AlunoModel.create(aluno).then(resp => {
    return res.status(200).json(resp)
  }
  ).catch(err => {
    return { "mensagem erro relaciona": err.error };
  });
});




app.listen(4000, () => {
  console.log("Conetado ao Sistema");
})

