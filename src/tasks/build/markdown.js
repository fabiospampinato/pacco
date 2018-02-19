
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      flatten = require ( 'gulp-flatten' ),
      htmlmin = require ( 'gulp-htmlmin' ),
      markdown = require ( 'gulp-markdown' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' )
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      log = require ( '../../utilities/log' ),
      output = require ( '../../utilities/paths/output' ),
      plugins = require ( '../../project' ).plugins,
      filter = require ( '../../plugins/filter' ),
      override = require ( '../../plugins/override' );

/* TASK */

function task () {

  const needUpdate = changed.plugin ( 'override', 'markdown', 'htmlmin' );

  return gulp.src ( input.getPath ( 'markdown' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'markdown' ) ) ) )
             .pipe ( gulpif ( plugins.markdown.enabled, markdown ( plugins.markdown.options ) ) )
             .pipe ( gulpif ( plugins.htmlmin.enabled, htmlmin ( plugins.htmlmin.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'markdown' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-markdown', 'Build Markdown', 'more' );
