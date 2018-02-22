
/* REQUIRE */

const gutil = require ( '../../../../utilities/gutil' ),
      partCSS = require ( './css' ),
      partSCSS = require ( './scss' );

/* TASK */

const task = gutil.parallel ( partCSS, partSCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css-parts', 'Build CSS parts', 'all' );
