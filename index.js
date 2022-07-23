  var numero=10;
  var numero=20;  
  var soma= 0; 


    function soma(n1=0,n2=0){ new Promise((resolve, reject) => {
    setTimeout(() => resolve('yes'), 3000)
    resolve('funcaoA')
    reject('no')
    return +n1 + +n2;
  })
}


function substracao(n1=0,n2=0){ new Promise((resolve, reject) => {
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve('yes'), 2000)
        resolve('funcaoB')
        reject('no')
        return 2 * +n1;
    })
 }
 
  /// function multiply(n1=0,n2=0){ new Promise((resolve, reject) => {
 //       setTimeout(() => resolve('yes'), 3000)
 //       resolve('funcaoB')
 //       reject('no')
 ///       return 3 * +n1;
  //    })
  //  })

  
 try {
      resolve()
  } catch (e) {
      reject(e)
  }
  p
  .then(function funcaoA (10, 9) { console.log(`${res} da ação 1`); return res; })
  .then(function acao2 (res) { console.log(`${res} da ação 2`); return res; })
  .then(function acao3 (res) { console.log(`${res} da ação 3`); return res; })

  p.catch(function erro1 (err) { console.error('Primeiro catch'); return 'Error'; })
  p.catch(function erro (rej) { console.error(rej) })
  
 

  