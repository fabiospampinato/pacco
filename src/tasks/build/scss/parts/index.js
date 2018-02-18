
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      buildFunctions = require ( './functions' ),
      buildMixins = require ( './mixins' ),
      buildVariables = require ( './variables' ),
      buildKeyframes = require ( './keyframes' ),
      buildStyle = require ( './style' );

/* TASK */

const task = gutil.series ( buildFunctions, buildMixins, buildVariables, buildKeyframes, buildStyle );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-parts', 'Build SCSS parts', 'all' );
