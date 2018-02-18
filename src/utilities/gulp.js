
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

  logger ( task, name, description, group ) {

    async function taskWithLogs () {

      const start = process.hrtime ();

      log ( `Starting '${chalk.cyan ( name )}'...` );

      await task (); //FIXME: Not really good enough

      const elapsed = process.hrtime ( start );

      log ( `Finished '${chalk.cyan ( name )}' after ${chalk.magenta ( time ( elapsed ) )}` );

    }

    const enhanced = argv.quiet ? task : taskWithLogs;

    if ( name ) enhanced.displayName = name;
    if ( description ) enhanced.description = description;
    if ( group ) enhanced.group = group;

    return enhanced;

  }

};

/* EXPORT */

module.exports = gulp;
