
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
          'develop/css/app.css':'develop/less/*.less'
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
          cwd: 'develop/images/desktop/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'public/images/desktop'                  // Destination path prefix
        },
        {
          expand: true,                  // Enable dynamic expansion
          cwd: 'develop/images/mobile/',   
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'public/images/mobile'                  // Destination path prefix
        },
        {
          expand: true,                  // Enable dynamic expansion
          cwd: 'develop/images/produtos/',   
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'public/images/produtos'                  // Destination path prefix
        },
        ]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'develop/', src: ['index.html'], dest: 'public/'},
          {expand: true, cwd: 'develop/', src: ['static/**'], dest: 'public/'},
          {expand: true, cwd: 'develop/', src: ['fonts/**'], dest: 'public/', filter: 'isFile'},
        ]
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

  grunt.registerTask('default', ['jshint','concat','uglify','less','cssmin','watch', 'copy', 'imagemin']);
  grunt.registerTask('build', ['jshint','concat','uglify','less','cssmin', 'copy', 'imagemin']);

};