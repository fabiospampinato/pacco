
/* REQUIRE */

const _ = require ( 'lodash' ),
     argv = require ( 'yargs' ).argv,
     path = require ( 'path' ),
     cssnano = require ( 'cssnano' ),
     imagemin = require ( 'gulp-imagemin' );

/* PLUGINS */

const plugins = {
  autoprefixer: {
    enabled: true,
    options: {
      browsers: ['ie >= 10', 'ie_mob >= 10', 'edge >= 13', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'],
      cascade: true,
    }
  },
  babel: {
    enabled: true,
    options: {
      presets: ['babel-preset-es2015'].map ( require.resolve ),
      plugins: ['babel-plugin-syntax-async-functions', 'babel-plugin-transform-regenerator'].map ( require.resolve ),
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
      assumeFunctionWrapper: true,
      compilationLevel: 'SIMPLE',
      languageIn: 'ECMASCRIPT5_STRICT',
      languageOut: 'ECMASCRIPT5_STRICT',
      outputWrapper: '(function(){\n%output%\n}).call(this)',
      warningLevel: 'QUIET'
    }
  },
  del: {
    options: {
      force: true
    }
  },
  dependencies: {
    enabled: true,
    options: {
      log: !!argv.verbose
    }
  },
  extend: {
    enabled: true,
    options: {
      log: !!argv.verbose
    }
  },
  filter: {
    enabled: true,
    options: {
      log: !!argv.verbose
    }
  },
  imagemin: {
    enabled: true,
    plugins: [
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
    ],
    options: {}
  },
  jsonminify: {
    enabled: true,
    options: {}
  },
  override: {
    enabled: true,
    options: {
      log: !!argv.verbose
    }
  },
  postcss: {
    enabled: true,
    plugins: [
      cssnano ({
        autoprefixer: false,
        normalizeUrl: false,
        svgo: false,
        zindex: false
      })
    ],
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
      log: !!argv.verbose
    }
  },
  uglify: {
    enabled: true,
    options: {}
  }
};

/* EXPORT */

module.exports = plugins;
