var filetrek = require('filetrek'),
    mkdirp = require('mkdirp-omen'),
    cp = require('cp-omen'),
    path = require('path'),
    fs = require('fs');

module.exports = function(source, dest, options){

    return new Promise(function(resolve, reject){
        var dirname;

        if(fs.statSync(source).isFile()){
            dirname = path.dirname(dest);
            mkdirp(dirname).then(function(){
                return cp(source, dest);
            }, onError).then(function(){
                resolve({
                    old: source,
                    new: dest
                });
            }, onError);
            return;
        }

        mkdirp(dest).then(function(){
            filetrek(source, options || {}, function(name, stats, root, sub){

                if(stats.isDirectory()){
                    return mkdirp(path.join(dest, sub)).then(function(){
                        return path.join(root, name);
                    }, onError);
                }else if(stats.isFile()){
                    return cp(path.join(root, name), path.join(dest, sub))
                    .then(function(){
                        //Faster than just returning a string.
                        return null;
                    }, onError);
                }
            }).then(function(){
                resolve({
                    old: source,
                    new: dest
                });
            }, onError);
        }, onError);

        function onError(e){
            reject(new Error('cpr-omen error: '+e.message));
        }
    });
};
