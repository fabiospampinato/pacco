
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      watchJSON = require ( './json' ),
      watchFonts = require ( './fonts' ),
      watchImages = require ( './images' ),
      watchJavascript = require ( './javascript' ),
      watchSCSS = require ( './scss' );

/* TASK */

const task = gutil.parallel ( watchJSON, watchFonts, watchImages, watchJavascript, watchSCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch', 'Watch files for changes and rebuild' );
