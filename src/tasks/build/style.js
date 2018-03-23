
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      buildSCSSParts = require ( './scss/parts' ),
      buildSCSS = require ( './scss' ),
      buildCSSParts = require ( './css/parts' ),
      buildCSS = require ( './css' );

/* TASK */

const task = gutil.series ( buildSCSSParts, buildSCSS, buildCSSParts, buildCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-style', 'Build SCSS and CSS', 'more' );
