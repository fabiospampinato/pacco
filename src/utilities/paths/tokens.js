
/* REQUIRE */

const _       = require ( 'lodash' ),
      path    = require ( 'path' ),
      project = require ( '../../config' );

/* TOKENS */

const tokens = {

  parse ( paths ) {

    paths = _.castArray ( paths );

    _.forOwn ( project.paths.tokens, ( replacements, token ) => {

      replacements = _.castArray ( replacements );

      paths = _.uniq ( _.flatten ( paths.map ( p => {

        return replacements.map ( replacement => p.replace ( `[${token}]`, replacement ) );

      })));

    });

    return paths.length === 1 ? paths[0] : paths;

  }

};

/* EXPORT */

module.exports = tokens;
