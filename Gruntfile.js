module.exports = function(grunt) {
    const apidoc = require('apidoc');
    const child_process = require('child_process');
    const babelCompileCMD = "babel src --out-dir lib -s";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        apidoc: {
            api: {
                src: 'src',
                dest: 'apidoc'
            }
        }
    });

    // 
    grunt.registerTask('babel7', 'use babel7 to compile code', function() {
        console.log('running command: ', babelCompileCMD);
        // FIXME: async to sync
        child_process.exec(babelCompileCMD, function(err) {
            if (err) {
                console.log('babel compile err', err);
            } else {
                console.log('babel compile success');
            }
        });
    });

    grunt.registerMultiTask('apidoc', 'Create RESTful API document with apidoc', function() {
        grunt.log.subhead('grunt apidoc');

        const config = this.data || {};
        const options = config.options || {};

        options.src = config.src || config.i || options.i;
        options.dest = config.dest || config.o || options.o;
        options.template = config.template || config.t || options.t;

        var result = apidoc.createDoc(options);
        if (result) {
            grunt.log.ok('create RESTful API success');
            return true;
        } else {
            grunt.log.fail('create RESTful API failed');
            return false;
        }
    })

    grunt.registerTask('default', ['babel7', 'apidoc']);
}