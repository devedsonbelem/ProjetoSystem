const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');



class UsersDto  {

  constructor(_id = '', nome = '', email = '', password = '',status='', token = '', uuid = '') {
    this._id = _id;
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.token = token;
    this.status = status;
    this.uuid = uuid;

    this.newpassword = '';
  }

  toStringUsers() {
    return this._id + ',' + this.nome + "," + this.email + "," + this.password + "," + this.token + "," +
      this.uuid + "," + this.status;
  }

  toJson() {
    return `{"_id": ${this._id}, "nome": ${this.nome},"email":${this.email},"password":${this.password},"uuid":${this.uuid}, "token":${this.token} }`;
  }

  getNomeUsers() {
    return this.nome;
  }

  setNomeUsers(nomeUsers) {
    this.nome = nomeUsers;
  }

  gerarUuid() {
    this.uuid = uuidv4();
    return this.uuid;
  }



  gerarTokenUsers(tokenUsers){
    this.token = bcrypt.hashSync(tokenUsers) + "_" +  (new Date(2022,7,15).getTime() /1000); 
    return this.token;
  }



  setPasswordUsers(passwordUsers) {
    this.password = bcrypt.hashSync(passwordUsers);
    return this.password;
  }

  getPasswordUsers() {
    return this.password;
  }

  setPassWordVerifiedCriptografy(passwordript) {
    return bcrypt.compareSync(this.password, passwordcript);
  }

}
//tst na hora

 
// var objto = new UsersDto(10,'edson','edson@gmail.com','123456','uuid 111','palavra secreta');
// console.log("saída 1...")
//   console.log(objto.toString());
//   console.log(objto.toJson());

//     objto.setPasswordUsers('123456');
//     objto.setNomeUsers("edson Belem");
//     console.log("saída 2...")
//     console.log(objto.getPasswordUsers());
//     console.log(objto.getNomeUsers());
//     console.log(objto.toString());
//     console.log(objto.toJson());
    
//       let  resultToken = objto.gerarTokenUsers('palavra secreta');
 
//      let vetor= resultToken.split("_");
 
//        console.log('Token Gerado:', resultToken);
 
//        console.log("senha", vetor[0])

//        var datadois = new Date(vetor[1] * 1000 );

//         console.log('data dois', datadois.getFullYear());
//         console.log('data dois', datadois.getMonth())
//         console.log('data dois', datadois.getDate());
//         console.log('data dois', datadois);   


module.exports = UsersDto;