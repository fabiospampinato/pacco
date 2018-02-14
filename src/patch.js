
/* REQUIRE */

const _           = require ( 'lodash' ),
      gulp        = require ( 'gulp' ),
      environment = require ( './utilities/environment' );

/* CWD */

// Storing the cwd for future reference

gulp.cwd = environment.getGulpCwd ();

/* SRC & DEST & SYMLINK */

// Ensuring Gulp's `cwd` is always `--config` or, if not a path or is missing, `process.cwd ()`

const methods = ['src', 'dest', 'symlink'],
      proto = Object.getPrototypeOf ( gulp );

methods.forEach ( method => {

  const prev = proto[method];

  proto[method] = function ( arg0, options, ...otherArgs ) {

    options = _.merge ( { cwd: gulp.cwd }, options );

    return prev.call ( gulp, arg0, options, ...otherArgs );

  };

});
