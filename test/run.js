var cpr = require('../index.js');

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
