
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      watchHTML = require ( './html' ),
      watchJSON = require ( './json' ),
      watchFonts = require ( './fonts' ),
      watchImages = require ( './images' ),
      watchJavascript = require ( './javascript' ),
      watchSCSS = require ( './scss' );

/* TASK */

const task = gutil.parallel ( watchHTML, watchJSON, watchFonts, watchImages, watchJavascript, watchSCSS );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch', 'Watch files for changes and rebuild' );
