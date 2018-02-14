
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'images' ), plugins.del.options );

}

task.description = '[ALL] Clean generated images';

/* GULP */

gulp.task ( 'clean-images', task );
