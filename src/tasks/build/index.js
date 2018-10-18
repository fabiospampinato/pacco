
//TODO: Ensure the `dist` directory always gets created

/* REQUIRE */

const buildStatus = require ( '../../utilities/build_status' ),
      gutil = require ( '../../utilities/gutil' ),
      buildHTML = require ( './html' ),
      buildJSON = require ( './json' ),
      buildFonts = require ( './fonts' ),
      buildImages = require ( './images' ),
      buildMarkdown = require ( './markdown' ),
      buildJavascript = require ( './javascript' ),
      buildStyle = require ( './style' ),
      notification = require ( './notification' ),
      summary = require ( './summary' );

/* TASK */

const build = gutil.parallel ( buildHTML, buildJSON, buildFonts, buildImages, buildMarkdown, buildJavascript, buildStyle ),
      buildEnhanced = gutil.task.enhance ( build, 'build', 'Build your project' ),
      buildLogger = gutil.series ( buildStatus.start, buildEnhanced, buildStatus.finish, gutil.parallel ( notification, summary ) );
      buildLoggerEnhanced = gutil.task.withMetadata ( buildLogger, 'build', 'Build your project' );

/* EXPORT */

module.exports = buildLoggerEnhanced;
