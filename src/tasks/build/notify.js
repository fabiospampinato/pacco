
/* REQUIRE */

const project = require ( '../../project' ),
      environments = require ( '../../utilities/environments' ),
      notification = require ( '../../utilities/notification' );

/* TASK */

function task () {

  const envsPretty = environments.pretty ( project.environment );

  return notification.send ({
    title: `Built [${envsPretty}]`,
    message: 'Your bundle is ready', //TODO: Update me, maybe the bundle wasn't successful
    sound: 'Glass'
  });

}

/* EXPORT */

module.exports = task;
