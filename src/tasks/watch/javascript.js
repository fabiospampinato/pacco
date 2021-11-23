
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      buildJavascript = require ( '../build/javascript' );

/* TASK */

function task () {

  return gulp.watch ( _.flatten ( _.filter ([ input.getPath ( 'javascript.all' ), input.getPath ( 'typescript.all' ) ]) ), { interval: 500, usePolling: false }, buildJavascript );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-javascript', 'Watch JavaScript and TypeScript', 'more' );
