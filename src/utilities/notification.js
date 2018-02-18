
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      notifier = require ( 'node-notifier' ),
      path = require ( 'path' );

/* NOTIFICATION */

const notification = {

  defaultOptions: {
    icon: path.join ( process.cwd (), 'resources', 'icon', 'icon.png' ),
    wait: false
  },

  send ( options, done = _.noop ) {

    if ( !_.isUndefined ( argv.notification ) && !argv.notification ) return done ();

    options = _.merge ( {}, notification.defaultOptions, options );

    return notifier.notify ( options, done );

  }

};

/* EXPORT */

module.exports = notification;
