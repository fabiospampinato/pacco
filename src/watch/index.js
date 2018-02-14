
/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.parallel ( 'watch-json', 'watch-fonts', 'watch-images', 'watch-javascript', 'watch-scss' );

task.description = 'Watch for changes and rebuild';

/* GULP */

gulp.task ( 'watch', task );
