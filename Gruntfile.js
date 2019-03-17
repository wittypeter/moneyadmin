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
        },
        'http-server': {
            'apidoc': {
                root: 'apidoc/doc/',
                port: 8888,
                autoIndex: true,
                ext: "html",
                // do not log request info
                logFn: function(req, res, error) {}
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
    });

    grunt.registerTask('default', ['clean', 'apidoc', 'uglify']);

    grunt.registerTask('build', 'build project', [
        'clean',
        'apidoc',
        'uglify'
    ]);

    grunt.registerTask('apiserver', 'start api doc server', ['http-server:apidoc']);
};
