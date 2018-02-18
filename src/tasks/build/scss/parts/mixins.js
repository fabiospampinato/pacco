
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'mixins', false );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-mixins', 'Build SCSS mixins', 'all' );
