
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'functions', false );

/* EXPORT */

module.exports = gutil.logger ( task, 'build-scss-functions', 'Build scss functions', 'all' );
