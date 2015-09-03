cpr-omen
========

Install
-------

`npm install cpr-omen`

Usage
-----

```javascript
var cpr = require('cpr-omen');

cpr('orig', 'dest').then(function(){
    console.log('done copying folder');
}, function(e){
    console.log(e);
});

cpr('orig/bad.js', 'exclude/bad.js').then(function(){
    console.log('done copying file');
}, function(e){
    console.log(e);
});

```

About
-----

cpr-omen recursively copies files, and directories.

This module is an attempt at having a consistent copy operation in all situations.

All needed parent directories, child files, and directories are copied.

The success callback will always be called if there is no error.

Errors are full stop even though some copy operations will have been completed before error.

Options
-------

```javascript
var options = {
    ignore: ["*.txt"],
    find: ["*.js"]
};

cpr('orig', 'dest', options).then(function(){
    console.log('done copying folder');
}, function(e){
    console.log(e);
});
```

See the [multimatcher](https://www.npmjs.com/package/multimatcher) module documentation to see what kind of patterns you can use in the `ignore`, and `find` options.
