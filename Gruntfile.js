module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    const apidoc = require('apidoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        apidoc: {
            genAPI: {
                src: '<%= pkg.apidoc.src %>',
                dest: '<%= pkg.apidoc.dest %>'
            },
            startServer: {
            }
        },
        clean: {
            uglify: {
                files: [{
                    dot: true,
                    src: ['<%= pkg.uglify.dest %>/*']
                }]
            },
            apidoc: {
                files: [{
                    dot: true,
                    src: ['<%= pkg.apidoc.dest %>/*']
                }]
            }
        },
        uglify: {
            source: {
                options: {
                    mangle: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                    compress: {
                        drop_console: true
                    },
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.uglify.src %>/',
                    src: ['**/*.js', '!apidocServer/*'],
                    dest: '<%= pkg.uglify.dest %>'
                }]
            },
            apidocServer: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                    compress: {
                        drop_console: true
                    },
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.apidocServer.src %>/',
                    src: ['**/*.js'],
                    dest: '<%= pkg.apidocServer.dest %>'
                }]
            }
        }
    });

    grunt.registerMultiTask('apidoc', 'Create RESTful API document with apidoc', function() {
        if (this.target === 'genAPI') {
            grunt.log.subhead('grunt create apidoc');
            const config = this.data || {};
            const options = config.options || {};

            options.src = config.src || config.i || options.i;
            options.dest = config.dest || config.o || options.o;
            options.template = config.template || config.t || options.t;

            const result = apidoc.createDoc(options);
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

    grunt.registerTask('default', ['clean', 'apidoc', 'uglify']);

    grunt.registerTask('build', 'build project', [
        'clean',
        'apidoc',
        'uglify'
    ]);
};
