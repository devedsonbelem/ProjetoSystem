
class ContatoDto{
 
     contructor(_id='', caixa_postal='', cidade='', bairro='', telefone='', aluno_id=''){
     this._id = _id;
     this.caixa_postal = caixa_postal;
     this.cidade = cidade;
     this.bairro = bairro;
     this.telefone = telefone;
     this.aluno_id = aluno_id;
     }

     toString(){
        return this._id + "," + this.caixa_postal + "," + this.cidade + "," + this.bairro + "," + this.telefone + "," + this.aluno_id;
     }

}

module.exports = ContatoDto;