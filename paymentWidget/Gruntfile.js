module.exports = function (grunt) {
	grunt.initConfig({

		stylus: {
			options: {
				compress: false
			},
			compile: {
				files: [{
					cwd: 'app/styles',
					src: 'common.styl',
					dest: 'dist/styles',
					expand: true,
					ext: '.css'
				}]
			}
		},
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                force: true,
                globals: {
                    jQuery: true
                }
            },
            all: [
                'app/scripts/**/*.js',
                '!app/scripts/libs/**/*'
            ],
            configFiles: [
                'Gruntfile.js',
                'package.json'
            ]
        },
        autoprefixer: {
            options: {
                browsers: [
                    'Android >= <%= pkg.browsers.android %>',
                    'Chrome >= <%= pkg.browsers.chrome %>',
                    'Firefox >= <%= pkg.browsers.firefox %>',
                    'Explorer >= <%= pkg.browsers.ie %>',
                    'iOS >= <%= pkg.browsers.ios %>',
                    'Opera >= <%= pkg.browsers.opera %>',
                    'Safari >= <%= pkg.browsers.safari %>'
                ]
            },
            dist: {
                src: ['dist/styles/**/*.css']
            }
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: ['*.*'],
                    dest: 'dist/images',
                    filter: 'isFile'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'app/html',
                    src: '*',
                    dest: 'dist',
                    filter: 'isFile'
                }]
            },
            scripts: {
                files: [{
                    expand: true,
                    cwd: 'app/scripts',
                    src: ['**/*.js'],
                    dest: 'dist/scripts',
                    filter: 'isFile'
                }]
            }
        },
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: ['**/*.{png,jpg,gif}', '!sprite/**/*'],
                    dest: 'dist/images'
                }]
            }
        },
        sprite: {
            all: {
                src: 'app/images/sprite/*.png',
                dest: 'app/images/sprite.png',
                destCss: 'app/styles/__helpers/sprite.styl',
                imgPath : '../images/sprite.png',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                padding: 8,
                imgOpts: {
                    format: 'png'
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: ['dist/**/*']
            },
            configFiles: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js', 'package.json'],
                tasks: ['newer:jshint:configFiles']
            },
            stylus: {
                files: ['app/styles/**/*.styl'],
                tasks: ['stylus']
            },
            jshint: {
                files: ['app/scripts/**/*.js'],
                tasks: ['newer:jshint:all']
            },
            imagemin: {
                files: ['app/images/**/*.{png,jpg,gif}', '!app/images/sprite/**/*'],
                tasks: ['newer:imagemin']
            },
            html : {
                files: ['app/html/**/*.html'],
                tasks: ['newer:copy:html']
            },
            sprite: {
                files: ['app/images/sprite/**/*.png'],
                tasks: ['sprite']
            },
            scripts: {
                files: ['app/scripts/**/*.js', '!app/scripts/libs/**/*'],
                tasks: ['newer:copy:scripts']
            }
        }
	});

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [
        'clean',
        'stylus',
        'sprite',
        'jshint',
        'autoprefixer',
        'copy',
        'imagemin'
    ]);

    grunt.registerTask('default', [
        'build',
        'watch',
    ]);
};