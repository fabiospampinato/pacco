
/* REQUIRE */

const project = require ( '../../project' ),
      environments = require ( '../../utilities/environments' ),
      notification = require ( '../../utilities/notification' );

/* TASK */

function task ( done ) {

  const envsPretty = environments.pretty ( project.environment );

  notification.send ({
    title: `Built [${envsPretty}]`,
    message: 'Your bundle is ready',
    sound: 'Glass'
  }, done );

}

task.displayName = 'build-notify';
task.description = 'Notifiy about the build status'; //TODO: Update me
task.group = 'all';

/* EXPORT */

module.exports = task;
