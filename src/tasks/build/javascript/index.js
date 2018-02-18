
/* REQUIRE */

const gulp = require ( 'gulp' ),
      project = require ( '../../../project' ),
      gutil = require ( '../../../utilities/gulp' ),
      cleanTemp = require ( '../../clean/javascript_temp' ),
      buildDevelopment = require ( './development' ),
      buildProduction = require ( './production' ),
      buildTemp = require ( './temp' );

/* TASK */

const task = project.isDevelopment ? gulp.series ( cleanTemp, buildTemp, buildDevelopment ) : () => buildProduction ();

/* EXPORT */

module.exports = gutil.logger ( task, 'build-javascript', 'Build javascript', 'more' );
