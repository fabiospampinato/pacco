
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      asyncDone = require ( 'async-done' ),
      chalk = require ( 'chalk' ),
      fancyLog = require ( 'fancy-log' ),
      gulp = require ( 'gulp' ),
      path = require ( 'path' ),
      time = require ( 'pretty-time' ),
      config = require ( './config' );

/* GUTIL */

const gutil = {

  log: fancyLog,

  cwd () {

    const configPath = config.getPath ();

    if ( !configPath ) return process.cwd ();

    return path.dirname ( configPath );

  },

  patch () {

    /* SRC & DEST & SYMLINK */

    // Ensuring Gulp's `cwd` is always `--config` or, if not a path or is missing, `process.cwd ()`

    const cwd = gutil.cwd (),
          methods = ['src', 'dest', 'symlink'],
          proto = Object.getPrototypeOf ( gulp );

    methods.forEach ( method => {

      const prev = proto[method];

      proto[method] = function ( arg0, options, ...otherArgs ) {

        options = _.merge ( { cwd }, options );

        return prev.call ( gulp, arg0, options, ...otherArgs );

      };

    });

  },

  sequence ( type, ...tasks ) { // In order to make the invoker return a promise instead of undefined

    return function invoker ( callback ) {

      return new Promise ( resolve => {

        gulp.series ( gulp[type].call ( gulp, ...tasks ), resolve )( callback );

      });

    }

  },

  series ( ...tasks ) {

    return gutil.sequence ( 'series', ...tasks );

  },

  parallel ( ...tasks ) {

    return gutil.sequence ( 'parallel', ...tasks );

  },

  task: {

    withLogger ( task, name ) {

      function withLogger ( ...args ) {

        let startTime;

        function start () {

          startTime = process.hrtime ();

          gutil.log ( `Starting '${chalk.cyan ( name )}'...` );

        }

        function end () {

          const elapsed = process.hrtime ( startTime );

          gutil.log ( `Finished '${chalk.cyan ( name )}' after ${chalk.magenta ( time ( elapsed ) )}` );

        }

        start ();

        const res = task ( ...args );

        asyncDone ( () => res, end );

        return res;

      }

      return withLogger;

    },

    withMetadata ( task, name, description, group ) {

      if ( name ) task.displayName = name;
      if ( description ) task.description = description;
      if ( group ) task.group = group;

      return task;

    },

    enhance ( task, ...metadata ) {

      const withLogger = argv.quiet ? task : gutil.task.withLogger ( task, ...metadata ),
            withMetadata = gutil.task.withMetadata ( withLogger, ...metadata );

      return withMetadata;

    }

  }

};

/* EXPORT */

module.exports = gutil;
