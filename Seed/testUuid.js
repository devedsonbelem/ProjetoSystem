const UserDto = require('../Dto/UserDto');
const obj = new UserDto;
obj.gerarUuid();

obj.gerarPasswordCriptografada();

console.log(obj.uuid);
console.log(obj.passwordcript);
console.log(obj.verificarCriptografia());