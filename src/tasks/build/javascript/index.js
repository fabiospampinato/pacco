
/* REQUIRE */

const gulp = require ( 'gulp' ),
      project = require ( '../../../project' ),
      cleanTemp = require ( '../../clean/javascript_temp' ),
      buildDevelopment = require ( './development' ),
      buildProduction = require ( './production' ),
      buildTemp = require ( './temp' );

/* TASK */

const task = project.isDevelopment ? gulp.series ( cleanTemp, buildTemp, buildDevelopment ) : () => buildProduction ();

task.displayName = 'build-javascript';
task.description = 'Build javascript';
task.group = 'more';

/* EXPORT */

module.exports = task;
