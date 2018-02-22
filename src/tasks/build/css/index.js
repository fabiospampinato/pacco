
/* REQUIRE */

const gulp = require ( 'gulp' ),
      autoprefixer = require ( 'gulp-autoprefixer' ),
      gulpif = require ( 'gulp-if' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      postcss = require ( 'gulp-postcss' ),
      rename = require ( 'gulp-rename' ),
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../../utilities/changed' ),
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      plumberU = require ( '../../../utilities/plumber' ),
      plugins = require ( '../../../project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'autoprefixer', 'postcss' );

  return gulp.src ( [output.getPath ( 'css.partial' ), output.getPath ( 'scss.partial' )], { allowEmpty: true } )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'css.uncompressed' ) ) ) )
             .pipe ( concat ( output.getName ( 'css.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.autoprefixer.enabled, autoprefixer ( plugins.autoprefixer.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.postcss.enabled, postcss ( plugins.postcss.plugins, plugins.postcss.options ) ) )
             .pipe ( rename ( output.getName ( 'css.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.compressed' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css', 'Build CSS', 'more' );
