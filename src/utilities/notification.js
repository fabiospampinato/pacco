
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

  send ( options ) {

    if ( !_.isUndefined ( argv.notification ) && !argv.notification ) return Promise.resolve ();

    options = _.merge ( {}, notification.defaultOptions, options );

    return pify ( notifier.notify.bind ( notifier ) )( options );

  }

};

/* EXPORT */

module.exports = notification;
