
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'javascript.temp' ), plugins.del.options );

}

task.description = '[ALL] Clean generated temporary javascript';

/* GULP */

gulp.task ( 'clean-javascript-temp', task );
