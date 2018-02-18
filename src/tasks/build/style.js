
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      buildSCSSParts = require ( './scss/parts' ),
      buildSCSS = require ( './scss' ),
      buildCSS = require ( './css' );

/* TASK */

const task = gutil.series (  buildSCSSParts, buildSCSS, buildCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-style', 'Build SCSS and CSS', 'more' );
