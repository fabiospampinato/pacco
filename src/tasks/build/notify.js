
/* REQUIRE */

const project = require ( '../../project' ),
      environments = require ( '../../utilities/environments' ),
      gutil = require ( '../../utilities/gulp' ),
      notification = require ( '../../utilities/notification' );

/* TASK */

function task () { //TODO: Maybe output dest directory to the terminal

  const envsPretty = environments.pretty ( project.environment );

  return notification.send ({
    title: `Built [${envsPretty}]`,
    message: 'Your bundle is ready', //TODO: Update me, maybe the bundle wasn't successful
    sound: 'Glass'
  });

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-notify', 'Notifiy about the build status', 'all' );
