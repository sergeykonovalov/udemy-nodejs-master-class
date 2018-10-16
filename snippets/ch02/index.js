const path = require('path');
const os = require('os');

let fun = () => console.log('Function called');

let firstTimeout = setTimeout(fun, 0);
clearTimeout(firstTimeout);
let firstInterval = setInterval(fun, 0);
clearInterval(firstInterval);

let varName = 'varName';
console.log(global.varName); // undefined

console.log(module.id);
console.log(module.exports);
console.log(module.parent);
console.log(module.children);
console.log(module.filename);
console.log(__filename);
console.log(__dirname);

console.log(path.parse(__filename));
console.log(`Free memory is ~${(os.freemem() / 1024 / 1024).toFixed(2)} Mb`);
console.log(os.totalmem() / 1024 / 1024);
console.log(os.userInfo());
console.log(os.uptime() / 60 / 60 / 24);