const fs = require('node:fs')
// const stats = fs.statSync('./file.txt')
// // console.log(
// //     stats.isFile(),
// //     stats.isDirectory(),
// //     stats.isSymbolicLink()
// // )
// const txt = fs.readFileSync('./file.txt', 'utf-8')
// console.log(txt)
fs.readdir('.',(err,files)=> {
    if(err){
        console.error('Error al leer directorio: ' ,err);
        return;
    }
    files.forEach(file => {
        console.log(files);
        
    })
})