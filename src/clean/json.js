
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'json' ), plugins.del.options );

}

task.description = '[ALL] Clean generated json';

/* GULP */

gulp.task ( 'clean-json', task );
