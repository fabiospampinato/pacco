
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'fonts' ), plugins.del.options );

}

task.description = '[ALL] Clean generated fonts';

/* GULP */

gulp.task ( 'clean-fonts', task );
