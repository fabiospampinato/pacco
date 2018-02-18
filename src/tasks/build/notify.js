
/* REQUIRE */

const project = require ( '../../project' ),
      environments = require ( '../../utilities/environments' ),
      gutil = require ( '../../utilities/gulp' ),
      notification = require ( '../../utilities/notification' );

/* TASK */

function task ( done ) {

  const envsPretty = environments.pretty ( project.environment );

  notification.send ({
    title: `Built [${envsPretty}]`,
    message: 'Your bundle is ready', //TODO: Update me, maybe the bundle wasn't successful
    sound: 'Glass'
  }, done );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'build-notify', 'Notifiy about the build status', 'all' );
