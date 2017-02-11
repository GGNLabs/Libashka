module.exports = function (grunt) {

    var jsPaths = ['controller/*.js', './model/*.js', './data/*.js', 'app.js'];
    var copyPaths = ['config.js', '*.pem', 'mongoCertificates/*'];
    var tasks = ['jshint', 'uglify', 'copy', 'jsonmin', 'zip'];
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: jsPaths,
            options: {
                force: true,
                reporter: 'checkstyle',
                reporterOutput: 'jshint.xml',
            }
        },
        uglify: {
            options: {},
            build: {

                files: [{
                    expand: true,
                    cwd: './',
                    src: jsPaths,
                    dest: 'src/'
   }]
            }
        },
        copy: {
            files: {
                cwd: './',
                src: copyPaths,
                dest: 'src/',
                expand: true
            }
        },
        jsonmin: {
            dev: {
                options: {
                    stripWhitespace: true || false,
                    stripComments: true || false
                },
                files: {
                    "./src/package.json": "./package.json",
                }
            }
        },
        zip: {
            'using-cwd': {
                cwd: 'src',
                src: ['./src/**/*.*', './src/*.*'],
                dest: './build/storageManagementService.zip'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsonmin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', tasks);

};