
/*!
 * @description Grunt@!!!!!
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'develop/js/app.concat.js',
        dest: 'public/js/app.min.js'
      }
    },
    jshint: {
      options: {
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: {
        files: {
          src: ['develop/js/**/*.js']
        }
      }
    },
    concat: {
      dist: {
        src: [
          'develop/js/app.js'
        ],
        dest: 'develop/js/app.concat.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['develop/less'],
          yuicompress: false
        },
        files: {
          'develop/css/app.css':'develop/less/_*.less'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'public/css/app.min.css': ['develop/css/app.css']
        }
      }
    },
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'develop/images',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'public/images/'                  // Destination path prefix
        }
        ]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          // {expand: true, cwd: 'develop/', src: ['index.html'], dest: 'public/'},
          {expand: true, cwd: 'develop/', src: ['fonts/**'], dest: 'public/', filter: 'isFile'},
        ]
      }
    },
    fixturesPath: "develop",
    htmlbuild: {
      dist: {
        src: 'develop/index.html',
        dest: 'public/',
        options: {
          beautify: true,
          prefix: '',
          relative: true,
          basePath: false,
          scripts: {
              bundle: [
                  '<%= fixturesPath %>/js/vendor/*.js'
              ],
              main: '<%= fixturesPath %>/js/app.min.js'
          },
          styles: {
              bundle: [
                  '<%= fixturesPath %>/css/libs.css',
              ],
              main: '/css/app.min.css'
          },
          sections: {
            views: [
              '<%= fixturesPath %>/views/highlights.html',
              '<%= fixturesPath %>/views/about.html',
              '<%= fixturesPath %>/views/clients.html',
              '<%= fixturesPath %>/views/solutions.html',
              '<%= fixturesPath %>/views/cases.html'
            ],
            // templates: '<%= fixturesPath %>/templates/**/*.html',
            layout: {
                header: '<%= fixturesPath %>/layout/header.html',
                footer: '<%= fixturesPath %>/layout/footer.html'
            }
          }
        }
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js','develop/js/**/*.js'],
        tasks: ['jshint','concat','uglify'],
        options: {
          debounceDelay: 250
        }
      },
      less: {
        files: 'develop/less/**/*.less',
        tasks: ['less','cssmin'],
        options: {
          debounceDelay: 250
        }
      },
      imagemin: {
        files: 'develop/images/**/*.{png,jpg,gif}',
        tasks: ['imagemin'],
        options: {
          debounceDelay: 250
        }
      },
      htmlbuild: {
        files: ['develop/index.html', 'develop/layout/*.html', 'develop/views/*.html'],
        tasks: ['htmlbuild'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html-build');

  grunt.registerTask('default', ['jshint','concat','uglify','less','cssmin','watch', 'copy', 'htmlbuild','imagemin']);
  grunt.registerTask('build', ['jshint','concat','uglify','less','cssmin', 'copy', 'htmlbuild', 'imagemin']);

};
