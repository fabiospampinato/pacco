
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
    icon: argv.icon || path.join ( process.cwd (), 'resources', 'icon', 'icon.png' ),
    sound: 'Glass'
  },

  defaultErrorOptions: {
    icon: argv.iconError || path.join ( process.cwd (), 'resources', 'icon', 'icon_error.png' ),
    sound: 'Basso'
  },

  async send ( title, message, success = true ) {

    if ( argv.quiet || ( !_.isUndefined ( argv.notification ) && !argv.notification ) ) return;

    const options = _.merge ( {}, notification.defaultOptions, success ? notification.defaultSuccessOptions : notification.defaultErrorOptions, { title, message } );

    try {

      await pify ( notifier.notify.bind ( notifier ) )( options );

    } catch ( e ) {

      console.log ( `[${success ? 'SUCCESS' : 'ERROR'}] ${title} - ${message}` );

    }

  }

};

/* EXPORT */

module.exports = notification;
