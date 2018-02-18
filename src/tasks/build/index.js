
/* REQUIRE */

const gutil = require ( '../../utilities/gutil' ),
      buildJSON = require ( './json' ),
      buildFonts = require ( './fonts' ),
      buildImages = require ( './images' ),
      buildJavascript = require ( './javascript' ),
      buildStyle = require ( './style' ),
      notify = require ( './notify' );

/* TASK */

const task = gutil.series ( gutil.parallel ( buildJSON, buildFonts, buildImages, buildJavascript, buildStyle ), notify );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build', 'Build your project' );
