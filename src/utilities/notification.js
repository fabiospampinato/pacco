
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      notifier = require ( 'node-notifier' ),
      path = require ( 'path' ),
      pify = require ( 'pify' );

/* NOTIFICATION */

const notification = {

  defaultOptions: {
    icon: path.join ( process.cwd (), 'resources', 'icon', 'icon.png' ),
    wait: false
  },

  async send ( options ) {

    if ( argv.quiet || ( !_.isUndefined ( argv.notification ) && !argv.notification ) ) return;

    options = _.merge ( {}, notification.defaultOptions, options );

    return await pify ( notifier.notify.bind ( notifier ) )( options );

  }

};

/* EXPORT */

module.exports = notification;
