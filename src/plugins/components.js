
//TODO: Publish as `gulp-components`

/* REQUIRE */

const _ = require ( 'lodash' ),
      through = require ( 'through2' ),
      forAll = require ( './forall' );

/* UTILITIES */

function parseComponents ( components, prefix = '' ) {

  const rules = {};

  _.forOwn ( components, ( enabled, key ) => {

    key = _.trim ( `${prefix}${key}`, '/' );

    if ( _.isBoolean ( enabled ) ) {

      rules[key] = enabled;

    } else if ( _.isPlainObject ( enabled ) ) {

      rules[key] = true;

      _.extend ( rules, parseComponents ( enabled, `${key}/` ) );

    }

  });

  return rules;

}

function isComponentEnabled ( file, config, rules ) {

  const component = config.path2component ( file.path ),
        maxPriority = component.split ( '/' ).length;

  let priority = 0,
      enabled = true;

  _.forOwn ( rules, ( active, rule ) => {

    if ( !component.startsWith ( rule ) ) return;

    const newPriority = rule.split ( '/' ).length;

    if ( newPriority > priority && newPriority <= maxPriority ) {

      priority = newPriority;
      enabled = active;

    }

  });

  return enabled;

}

function partitionComponents ( files, config, rules ) {

  return _.partition ( files, file => isComponentEnabled ( file, config, rules ) );

}

function log ( files ) {

  if ( !files.length ) return;

  const lines = [`Components disabled (${files.length}):`];

  files.forEach ( file => {

    lines.push ( file.path );

  });

  console.log ( lines.join ( '\n' ) );

}

/* COMPONENTS */

function components ( files, config ) {

  /* CONFIG */

  config = _.merge ({
    components: {},
    path2component: _.identity,
    log: false
  }, config );

  /* COMPONENTS */

  const rules = parseComponents ( config.components );
        [enabled, disabled] = partitionComponents ( files, config, rules );

  if ( config.log ) log ( disabled );

  return enabled;

}

/* EXPORT */

module.exports = forAll ( components );
