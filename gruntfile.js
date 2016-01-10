module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                files: {
                    "server/views/index.html": "server/views/index.jade"
                }      
            }
        },
        stylus: {
            compile: {
                files: {
                    "public/css/site.css": "public/css/site.styl"
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.jade'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jade', 'stylus']);

};

//files: {
//    extend: true,
//    flatten: true,
//    cwd: 'server/views',
//    src: 'index.jade',
//    dest: 'server/views',
//    ext: '.html'
//}