# NodeJS Master Class
[NodeJS Master Class](https://www.udemy.com/nodejs-master-class/)

Default global object for browsers is `window`, in Node we have `global`.

> Variables are **not** added to global scope by default, hence `global.varName` will return `undefined`.

Value of `module.exports` is just an object, where key is name and value is linked variable or function. 

Therefore, it is valid to write `module.exports.exportedName = localName`. If there is only one function to export, can assign it directly to `module.exports`. 

Function `require` will return `module.exports` object of desired module.

> It is good practice to store imported module as constant.

[JSHint](https://jshint.com) is handy tool to analyze code and find possible issues.

Although module `fs` has two flavors of methods, we shall always strive to use asynchronous (non-blocking).