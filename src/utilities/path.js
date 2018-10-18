
/* PATH */

const path = {

  normalize ( filePath ) { // Normalize those stupid Windows paths

    return filePath.replace ( /(\\|\/)+/g, '/' );

  }

};

/* EXPORT */

module.exports = path;
