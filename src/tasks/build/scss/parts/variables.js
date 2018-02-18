
/* REQUIRE */

const gutil = require ( '../../../../utilities/gutil' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'variables', false );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-variables', 'Build SCSS variables', 'all' );
