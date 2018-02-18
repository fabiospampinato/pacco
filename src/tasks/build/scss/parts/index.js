
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gulp' ),
      buildFunctions = require ( './functions' ),
      buildMixins = require ( './mixins' ),
      buildVariables = require ( './variables' ),
      buildKeyframes = require ( './keyframes' ),
      buildStyle = require ( './style' );

/* TASK */

const task = gulp.series ( buildFunctions, buildMixins, buildVariables, buildKeyframes, buildStyle );

/* EXPORT */

module.exports = gutil.logger ( task, 'build-scss-parts', 'Build SCSS parts', 'all' );
