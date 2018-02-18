
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      chalk = require ( 'chalk' ),
      log = require ( 'fancy-log' ),
      g = require ( 'gulp' ),
      time = require ( 'pretty-time' ),
      environment = require ( './environment' );

/* GULP */

const gulp = {

  patch () {

    /* SRC & DEST & SYMLINK */

    // Ensuring Gulp's `cwd` is always `--config` or, if not a path or is missing, `process.cwd ()`

    const cwd = environment.getGulpCwd (),
          methods = ['src', 'dest', 'symlink'],
          proto = Object.getPrototypeOf ( g );

    methods.forEach ( method => {

      const prev = proto[method];

      proto[method] = function ( arg0, options, ...otherArgs ) {

        options = _.merge ( { cwd }, options );

        return prev.call ( gulp, arg0, options, ...otherArgs );

      };

    });

  },

  taskLogger ( task ) {

    if ( argv.quiet ) return task;

    async function logger () {

      const start = process.hrtime ();

      log ( `Starting '${chalk.cyan ( task.displayName )}'...` );

      await task ();

      const elapsed = process.hrtime ( start );

      log ( `Finished '${chalk.cyan ( task.displayName )}' after ${chalk.magenta ( time ( elapsed ) )}` );

    }

    return logger;

  }

};

/* EXPORT */

module.exports = gulp;
