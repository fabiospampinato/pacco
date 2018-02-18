
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'style', true );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-style', 'Build SCSS style', 'all' );
