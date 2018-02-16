
/* REQUIRE */

const _           = require ( 'lodash' ),
      gulp        = require ( 'gulp' ),
      environment = require ( './utilities/environment' );

/* SRC & DEST & SYMLINK */

// Ensuring Gulp's `cwd` is always `--config` or, if not a path or is missing, `process.cwd ()`

const cwd = environment.getGulpCwd (),
      methods = ['src', 'dest', 'symlink'],
      proto = Object.getPrototypeOf ( gulp );

methods.forEach ( method => {

  const prev = proto[method];

  proto[method] = function ( arg0, options, ...otherArgs ) {

    options = _.merge ( { cwd }, options );

    return prev.call ( gulp, arg0, options, ...otherArgs );

  };

});
