//OFFLINE CACHE
var cacheManifest = undefined;

exports.cache = function(req, res){
    if (!cacheManifest) {
        var fsutils = require('modules/utils/fsutils');
        //get the files and generate the output for cache.manifest
        fsutils.getFiles('/public', function(files) {
            var out = 'CACHE MANIFEST\n\ ';
            var len = files.length;
            for (var i = 0; i < len; ++i) {
                out += files[i] + '\n\ ';
            }
            //setup for second request
            cacheManifest = out;
            //send output
            res.header('Content-Type', 'text/cache-manifest');
            res.end(out);
        });
    } else {
        console.log('cache is cahced');
        res.header('Content-Type', 'text/cache-manifest');
        res.end(cacheManifest);
    }
};