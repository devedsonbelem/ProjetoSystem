const  ObjectId  = require("mongodb");
const  {v4  : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

class UserDto{
     constructor(_id='', nome='',email='',password='',token='',uuid='' ){
        this._id = _id;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.token = token;
        this.uuid = uuid;
        this.passwordcript='';
      }


     gerarUuid(){
         this.uuid = uuidv4();
     }

     gerarPasswordCriptografada(){
        this.passwordcript = bcrypt.hashSync(this.password,10);
     } 

     verificarCriptografia(){
        return bcrypt.compareSync(this.password, this.passwordcript);
    }

}
module.exports = UserDto;