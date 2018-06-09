
/* REQUIRE */

const _ = require ( 'lodash' ),
     argv = require ( 'yargs' ).argv,
     path = require ( 'path' ),
     file = require ( '../../utilities/file' );

/* PLUGINS */

const plugins = {
  autoprefixer: {
    enabled: true,
    options: {
      cascade: true
    }
  },
  babel: {
    enabled: true,
    options: {
      presets: [
        [require.resolve ( '../../../node_modules/@babel/preset-env' ), { //FIXME: Ugly
          modules: 'commonjs',
          loose: true,
          useBuiltIns: false,
          uglify: true
        }]
      ],
      plugins: [
        [require.resolve ( '../../plugins/lodash_template_compile.js' ), { //FIXME: Ugly, `require.resolve` shouldn't be needed, `lodash_template_compile` should be published on NPM
          minify: true,
          templateOptions: {
            variable: 'o'
          }
        }]
      ],
      babelrc: false,
      compact: false
    }
  },
  babili: {
    enabled: false,
    options: {}
  },
  closure: {
    enabled: false,
    options: {
      assume_function_wrapper: true,
      compilation_level: 'SIMPLE',
      language_in: 'ECMASCRIPT5_STRICT',
      language_out: 'ECMASCRIPT5_STRICT',
      output_wrapper: '(function(){%output%})();',
      warning_level: 'QUIET'
    }
  },
  concat: {
    options: {}
  },
  del: {
    options: {
      force: true
    }
  },
  components: {
    enabled: true,
    options: {
      path2component: file.file2component,
      log: !!argv.verbose
    }
  },
  dependencies: {
    enabled: true,
    options: {
      path2component: file.file2component,
      log: !!argv.verbose,
      graph: !!argv.dependenciesGraph
    }
  },
  htmlmin: {
    enabled: true,
    options: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }
  },
  imagemin: {
    enabled: true,
    plugins () {

      const imagemin = require ( 'gulp-imagemin' );

      return [
        imagemin.gifsicle ({
          interlaced: true,
          optimizationLevel: 3
        }),
        imagemin.jpegtran ({
          progressive: true
        }),
        imagemin.optipng ({
          optimizationLevel: 7
        }),
        imagemin.svgo ({
          multipass: true,
          plugins: [{
            cleanupIDs: false,
          }, {
            removeViewBox: false
          }]
        })
      ];

    },
    options: {}
  },
  jsonminify: {
    enabled: true,
    options: {}
  },
  markdown: {
    enabled: true,
    options: {
      breaks: true,
      xhtml: true
    }
  },
  postcss: {
    enabled: true,
    plugins () {

      const cssnano = require ( 'cssnano' );

      return [
        cssnano ({
          autoprefixer: false,
          normalizeUrl: false,
          svgo: false,
          zindex: false
        })
      ];

    },
    options: {}
  },
  sass: {
    enabled: true,
    options: {
      outputStyle: 'expanded',
      precision: 10
    }
  },
  substitute: {
    enabled: true,
    options: {
      tokenRe: /\[pacco(?:\.((?:[^\[\]\s]+|\[\d+\]){1,}))?\]/g,
      log: !!argv.verbose
    }
  },
  uglify: {
    enabled: true,
    options: {}
  },
  webpack: {
    enabled: false,
    options: {}
  },
  wrapper: {
    enabled: true,
    options: {}
  }
};

/* EXPORT */

module.exports = plugins;
