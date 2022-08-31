const UsersDto = require("./UsersDto");

class AlunoDto extends UsersDto{
     constructor( _id='',nome='',email='',password='',status='',token='', uuid='',matricula=0, data_nascimento=new Date()  ){
        super(_id,nome,email,password,status,token,uuid);  
        this._id = _id;
        this.nome = nome;
        this.status = status;
        this.uuid = uuid;
        this.data_nascimento = new Date(data_nascimento);
        this.nome_aluno = nome;
        this.uuid_aluno = uuid;
        this.matricula = matricula;
     }

     toStringAluno(){
        return this._id + "," + this.nome_aluno + "," + this.matricula + "," +   this.status + "," + this.uuid_aluno + "," + this.data_nascimento;
     }
 
     returnUsers(){
       return this._id + "," + this.nome + "," + this.email + "," + 
      this.password + ","+ this.status + ","+ this.token + "," + this.uuid; 
     }

}

module.exports = AlunoDto;

// let users1 = new UsersDto();

// let aluno = new AlunoDto('123','porfirio','porfiriosoares@gmail.com','123456','ativo','token 132', 'uuid 123', 1000, new Date(1990,00,28));

// users1 = aluno;

// console.log('users' , users1.toStringUsers());

// console.log('aluno' , aluno.toStringAluno());









 