# NodeJS Master Class
[NodeJS Master Class](https://www.udemy.com/nodejs-master-class/)

### Global Object

Default global object for browsers is `window`, in Node we have `global`.

> Variables are **not** added to global scope by default, hence `global.varName` will return `undefined`.

### Modules

Value of `module.exports` is just an object, where key is name and value is linked variable or function. 

Therefore, it is valid to write `module.exports.exportedName = localName`. If there is only one function to export, can assign it directly to `module.exports`. 

Function `require` will return `module.exports` object of desired module.

> It is good practice to store imported module as constant.

[JSHint](https://jshint.com) is handy tool to analyze code and find possible issues.

### Path

### Operating System

### File System

Although module `fs` has two flavors of methods, we shall always strive to use asynchronous (non-blocking).

### Events

Method `.on()` is an alias to `.addListener()`.
You rarely use event emitter itself, but use it in some class.

### HTTP

Web server is an event emitter.

### Node Package Manager

NPM is a package, which you can install globally like any other package.

```shell
sudo npm install -g npm@5.5.1
```

Any Node project should have `package.json`:

```shell
npm init
```

Or (omit questions):

```shell
npm init --yes
```

Added packages appended to `dependencies` part of `package.json`.
Loaded packages stored in folder `node_modules`.
Try to inspect `package.json` files of libraries you use, to see examples of what is in.

Note, that in recent versions of NPM you do not need to specify `--save` flag: packages added to `package.json` automatically by default.

#### Order of Resolution

1. Core module.
2. File.
3. Installed package.

> When you specify path `require('./something)` it can be `something.js` in current folder, or sub-folder `something` with `index.js` inside.

Default behavior now is to *put all dependencies of packages into project's `node_modules`, with an exception that different versions module is dependent on, will be saved in `node_modules` under that package folder*.

TODO: Check structure of other widely-used packages to learn how they are organized.

#### Semantic Versioning

> MAJOR.MINOR.PATCH, where major version can break backward compatibility, minor adds new features and patch is typically a bug fix.

Caret (`^X`) symbol means that we are interested in any version of package, as soon as major version is `X`.
Tilda (`~X.Y`) symbol means that we are interested in any version as long as major version is `X` and minor version in `Y`.
To install exactly the version, remove tilda or caret symbol.

To list dependencies (only your application):

```shell
npm list --depth=0
```

To view package data:

```shell
npm view packageName
npm view packageName versions
npm view packageName [propertyName]
```

To list outdated packages:

```shell
npm outdated
npm -g outdated
```

- Current = from `package.json`.
- Wanted = latest available accoridng to requested in `package.json`.
- Latest = overall latest version of package.

To update packages:

```shell
npm update
```

> Works only for MINOR and PATCH!

To install development dependency, use flag `--save-dev` to put package under `devDependencies` section of `package.json`.

To uninstall package run `npm uninstall` or `npm un` (will be also removed from `package.json`).

#### Publishing a Module

> Every module should have `package.json`, `index.js` and export one or more functions.

To create account:

```shell
npm adduser
```

To login:

```shell
npm login
```

To publish:

```shell
npm publish
```

> NPM will add its own properties, once you publish package.

If you attempt to publish again, you will get an error, that NPM can't use same version number for changed package.

To update version:

```shell
npm version major
npm version minor
npm version patch
```

## Express

### Install `nodemon`

```shell
sudo npm i -g nodemon
nodemon index.js
```

To set environment variable: 

```shell
export KEY=value
```

URL parameters used for obligatory parts, while query parameters are for optional things (e.g. sorting).

### Parsing JSON Objects in Request Body

By default it is not enabled.

#### Validation of Inputs

Never trust what your application receives, and use validators like [joi](https://www.npmjs.com/package/joi) package.

```shell
npm i joi
```

Joi has very neat API for validation.

### Middleware

Function, returning result or passing over request to another function.
Express application is just a bunch of middleware functions (Request Processing Pipeline).
Middleware function accepts `next` argument, which is reference to next function in pipeline.

> Note that app will go into infinite loop if you forget to call next in middleware.

Middleware functions are executed in sequence.

List of middleware maintained by ExpressJS team:
http://expressjs.com/en/resources/middleware.html

```shell
npm i helmet
npm i morgan
```

By default morgan logs into console, but can configure to write to a log file.