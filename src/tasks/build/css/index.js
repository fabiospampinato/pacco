
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      changed = require ( '../../../utilities/changed' ),
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      plumberU = require ( '../../../utilities/plumber' ),
      touch = require ( '../../../plugins/touch' ),
      plugins = require ( '../../../project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.plugins ( 'autoprefixer', 'postcss' );

  return gulp.src ( [output.getPath ( 'css.partial' ), output.getPath ( 'scss.partial' )], { allowEmpty: true } )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'css.minified' ) ) ) )
             .pipe ( concat ( output.getName ( 'css.unminified' ) ) )
             .pipe ( gulpif ( plugins.autoprefixer.enabled, () => require ( 'gulp-autoprefixer' )( plugins.autoprefixer.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.unminified' ) ) )
             .pipe ( touch () )
             .pipe ( gulpif ( plugins.postcss.enabled, () => require ( 'gulp-postcss' )( plugins.postcss.plugins (), plugins.postcss.options ) ) )
             .pipe ( rename ( output.getName ( 'css.minified' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.minified' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css', 'Build CSS', 'more' );
