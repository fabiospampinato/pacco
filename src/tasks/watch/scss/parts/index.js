
/* REQUIRE */

const gutil = require ( '../../../../utilities/gutil' ),
      watchFunctions = require ( './functions' ),
      watchMixins = require ( './mixins' ),
      watchVariables = require ( './variables' ),
      watchKeyframes = require ( './keyframes' ),
      watchStyle = require ( './style' );

/* TASK */

const task = gutil.parallel ( watchFunctions, watchMixins, watchVariables, watchKeyframes, watchStyle );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss-parts', 'Watch SCSS parts', 'all' );
