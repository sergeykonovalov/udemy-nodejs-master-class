const path = require('path');

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