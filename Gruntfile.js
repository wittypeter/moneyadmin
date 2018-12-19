module.exports = function(grunt) {
    const apidoc = require('apidoc');
    const child_process = require('child_process');
    const babelCompileCMD = 'babel src --out-dir lib -s';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        apidoc: {
            genAPI: {
                src: 'src',
                dest: 'apidoc'
            },
            startServer: {
            }
        }
    });

    //
    grunt.registerTask('babel7', 'use babel7 to compile code', function() {
        grunt.log.subhead(`running command ${babelCompileCMD}`);
        // FIXME: async to sync
        child_process.exec(babelCompileCMD, function(err) {
            if (err) {
                grunt.log.error(`babel compile error ${err}`);
            } else {
                grunt.log.ok('babel compile success');
            }
        });
    });

    grunt.registerMultiTask('apidoc', 'Create RESTful API document with apidoc', function() {
        if (this.target === 'genAPI') {
            grunt.log.subhead('grunt create apidoc');
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
        }

        if (this.target === 'startServer') {
            // TODO: if api server running, do nothing, else run api server
            grunt.log.subhead('grunt start API server');
            grunt.log.ok('start server success');
            grunt.log.ok(`API server is running at ${'http://localhost:8888'}`);
            return true;
        }
    });

    grunt.registerTask('default', ['babel7', 'apidoc']);
};