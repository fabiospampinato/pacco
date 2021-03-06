
/* REQUIRE */

const _ = require ( 'lodash' ),
      PluginError = require ( 'plugin-error' ),
      time = require ( 'pretty-time' ),
      project = require ( '../project' ),
      file = require ( './file' ),
      projectU = require ( './project' );

/* BUILD STATUS */

const buildStatus = {

  status: {},

  async start () { // Can be used as a Gulp task

    buildStatus.status = {
      started: true,
      paths: {
        src: projectU.getSrcPaths ( project ),
        dist: projectU.getDistPath ( project )
      },
      times: {
        startTime: Date.now (),
        startHRTime: process.hrtime ()
      }
    };

  },

  async finish ( pluginError ) { // Can be used as a Gulp task

    if ( buildStatus.status.finished ) return;

    pluginError = pluginError instanceof Error ? pluginError : undefined;

    _.merge ( buildStatus.status, {
      finished: true,
      success: !pluginError,
      error: !!pluginError,
      pluginError,
      times: {
        finishTime: Date.now (),
        finishHRTime: process.hrtime ()
      }
    });

    if ( !buildStatus.status.started ) return; // We won't have the necessary data to proceed further if `buildStatus.start` wasn't called

    _.merge ( buildStatus.status, {
      times: {
        elapsed: time ( process.hrtime ( buildStatus.status.times.startHRTime ) )
      },
      sizes: {
        dist: file.size ( buildStatus.status.paths.dist )
      }
    });

  },

  stats () {

    return buildStatus.status;

  }

};

/* EXPORT */

module.exports = buildStatus;
