
/* REQUIRE */

const gutil = require ( '../../../../utilities/gutil' ),
      buildFunctions = require ( './functions' ),
      buildMixins = require ( './mixins' ),
      buildVariables = require ( './variables' ),
      buildKeyframes = require ( './keyframes' ),
      buildStyle = require ( './style' );

/* TASK */

const task = gutil.parallel ( buildFunctions, buildMixins, buildVariables, buildKeyframes, buildStyle );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-parts', 'Build SCSS parts', 'all' );
