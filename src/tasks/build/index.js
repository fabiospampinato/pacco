
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      buildHTML = require ( './html' ),
      buildJSON = require ( './json' ),
      buildFonts = require ( './fonts' ),
      buildImages = require ( './images' ),
      buildMarkdown = require ( './markdown' ),
      buildJavascript = require ( './javascript' ),
      buildStyle = require ( './style' ),
      notify = require ( './notify' ),
      log = require ( './log' );

/* TASK */

const task = gutil.series ( gutil.parallel ( buildHTML, buildJSON, buildFonts, buildImages, buildMarkdown, buildJavascript, buildStyle ), gutil.parallel ( notify, log ) );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build', 'Build your project' );
