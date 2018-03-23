
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      watchSCSSParts = require ( './scss/parts' ),
      watchSCSS = require ( './scss' ),
      watchCSSParts = require ( './css/parts' ),
      watchCSS = require ( './css' );

/* TASK */

const task = gutil.parallel ( watchSCSSParts, watchSCSS, watchCSSParts, watchCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-style', 'Watch SCSS and CSS', 'more' );
