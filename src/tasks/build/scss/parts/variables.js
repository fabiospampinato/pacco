
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'variables', false );

/* EXPORT */

module.exports = gutil.logger ( task, 'build-scss-variables', 'Build SCSS variables', 'all' );
