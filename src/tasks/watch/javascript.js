
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      buildJavascript = require ( '../build/javascript' );

/* TASK */

function task () {

  return gulp.watch ( [input.getPath ( 'javascript.all' ), input.getPath ( 'typescript.all' )], buildJavascript );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-javascript', 'Watch JavaScript and TypeScript', 'more' );
