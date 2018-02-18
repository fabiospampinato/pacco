
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../utilities/gulp' ),
      build = require ( './build' ),
      watch = require ( './watch' );

/* TASK */

const task = gulp.series ( build, watch );

/* EXPORT */

module.exports = gutil.logger ( task, 'default', 'Build and watch' );
