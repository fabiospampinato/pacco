
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      sass = require ( 'gulp-sass' ),
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../../../utilities/changed' ),
      output = require ( '../../../../utilities/paths/output' ),
      plumberU = require ( '../../../../utilities/plumber' ),
      plugins = require ( '../../../../project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'sass' );

  return gulp.src ( output.getPath ( 'scss.all' ), { allowEmpty: true } )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.partial' ) ) ) )
             .pipe ( gulpif ( plugins.sass.enabled, sass ( plugins.sass.options ) ) )
             .pipe ( rename ( output.getName ( 'scss.partial' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'scss.partial' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css-scss', 'Build CSS SCSS', 'all' );
