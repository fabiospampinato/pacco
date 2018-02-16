
/* REQUIRE */

const gulp         = require ( 'gulp' ),
      project      = require ( '../config' ),
      environments = require ( '../utilities/environments' ),
      log          = require ( '../utilities/log' ),
      notification = require ( '../utilities/notification' );

/* NOTIFY */

function notify ( done ) {

  const envsPretty = environments.pretty ( project.environment );

  notification.send ({
    title: `Built [${envsPretty}]`,
    message: 'Your bundle is ready',
    sound: 'Glass'
  }, done );

}

/* TASK */

const task = gulp.series ( gulp.parallel ( 'build-json', 'build-fonts', 'build-images', 'build-javascript', 'build-style' ), notify );

task.description = 'Build your project ' + log.options ( ['config', ['/path/to/pacco.json', '"{}"']], ['env', ['*', '*,*']], ['fresh'], ['no-notification'], ['verbose'] );

/* GULP */

gulp.task ( 'build', task );
