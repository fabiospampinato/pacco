
/* REQUIRE */

const project = require ( '../../../project' ),
      gutil = require ( '../../../utilities/gulp' ),
      cleanTemp = require ( '../../clean/javascript_temp' ),
      buildDevelopment = require ( './development' ),
      buildProduction = require ( './production' ),
      buildTemp = require ( './temp' );

/* TASK */

const task = project.isDevelopment ? gutil.series ( cleanTemp, buildTemp, buildDevelopment ) : () => buildProduction (); // Wrapping `buildProduction` for proper enhancing

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-javascript', 'Build JavaScript', 'more' );
