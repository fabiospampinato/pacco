
/* REQUIRE */

const _ = require ( 'lodash' ),
      buildStatus = require ( './build_status' ),
      log = require ( './log' );

/* PLUMBER */

const plumber = {

  error ( pluginError ) {

    /* STATUS */

    buildStatus.finish ( pluginError );

    /* LOG ERROR */ // In case there will be no summary

    const {started} = buildStatus.stats ();

    if ( !started ) log.error ( pluginError );

    /* ENDING */ // Prevents `watch` tasks from crashing

    this.emit ( 'end' );

  }

};

/* EXPORT */

module.exports = plumber;
