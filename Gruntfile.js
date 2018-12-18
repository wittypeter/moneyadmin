const child_process = require('child_process');

const babelCompileCMD = "babel src --out-dir lib -s";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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

    grunt.registerTask('default', ['babel7']);
}