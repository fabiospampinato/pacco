
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      watchHTML = require ( './html' ),
      watchJSON = require ( './json' ),
      watchFonts = require ( './fonts' ),
      watchImages = require ( './images' ),
      watchMarkdown = require ( './markdown' ),
      watchJavascript = require ( './javascript' ),
      watchStyle = require ( './style' );

/* TASK */

const task = gutil.parallel ( watchHTML, watchJSON, watchFonts, watchImages, watchMarkdown, watchJavascript, watchStyle );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch', 'Watch files for changes and rebuild' );
