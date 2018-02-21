
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      notifier = require ( 'node-notifier' ),
      path = require ( 'path' ),
      pify = require ( 'pify' );

/* NOTIFICATION */

const notification = {

  defaultOptions: {
    wait: false
  },

  defaultSuccessOptions: {
    icon: path.join ( process.cwd (), 'resources', 'icon', 'icon.png' ),
    sound: 'Glass'
  },

  defaultErrorOptions: {
    icon: path.join ( process.cwd (), 'resources', 'icon', 'icon_red.png' ),
    sound: 'Basso'
  },

  async send ( title, message, success = true ) {

    if ( argv.quiet || ( !_.isUndefined ( argv.notification ) && !argv.notification ) ) return;

    const options = _.merge ( {}, notification.defaultOptions, success ? notification.defaultSuccessOptions : notification.defaultErrorOptions, { title, message } );

    return await pify ( notifier.notify.bind ( notifier ) )( options );

  }

};

/* EXPORT */

module.exports = notification;
