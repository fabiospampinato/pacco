
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'keyframes', true );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-keyframes', 'Build SCSS keyframes', 'all' );
