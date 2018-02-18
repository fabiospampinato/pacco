
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'style', true );

/* EXPORT */

module.exports = gutil.logger ( task, 'build-scss-style', 'Build SCSS style', 'all' );
