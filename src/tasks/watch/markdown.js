
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      buildMarkdown = require ( '../build/markdown' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'markdown' ), { interval: 500, usePolling: false }, buildMarkdown );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-markdown', 'Watch Markdown', 'more' );
