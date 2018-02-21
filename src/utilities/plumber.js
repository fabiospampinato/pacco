
/* REQUIRE */

const _ = require ( 'lodash' ),
      buildStatus = require ( './build_status' );

/* PLUMBER */

const plumber = {

  error ( pluginError ) {

    /* STATUS */

    buildStatus.finish ( pluginError );

    /* ENDING */ // Prevents `watch` tasks from crashing

    this.emit ( 'end' );

  }

};

/* EXPORT */

module.exports = plumber;
