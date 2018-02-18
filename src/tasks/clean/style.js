
/* REQUIRE */

const gutil = require ( '../../utilities/gulp' ),
      cleanSCSS = require ( './scss' ),
      cleanCSS = require ( './css' );

/* TASK */

const task = gutil.parallel ( cleanSCSS, cleanCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'clean-style', 'Clean generated SCSS and CSS', 'more' );
