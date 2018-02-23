
//TODO: Publish as `gulp-dependencies`

/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      path = require ( 'path' ),
      PluginError = require ( 'plugin-error' ),
      stringMatches = require ( 'string-matches' ).default,
      forAll = require ( './forAll' );

/* UTILITIES */

function getUniqMatches ( str, regex ) {

  const matches = stringMatches ( str, regex );

  return _.uniqBy ( matches, match => match[0] );

}

function getFileMatches ( file, regex ) {

  const contents = file.contents.toString ( 'utf8' );

  return getUniqMatches ( contents, regex );

}

function getFilePriority ( file, regex ) {

  const matches = getFileMatches ( file, regex );

  return matches.length ? Number ( matches[0][1] ) || false : false;

}

function getFilePaths ( file, regex, config ) {

  const matches = getFileMatches ( file, regex ),
        targets = matches.map ( match => match[1] ),
        dirname = path.dirname ( config.path2component ( file.path ) );

  return targets.map ( target => target.startsWith ( '.' ) ? path.join ( dirname, target ) : target );

}

function getPathSuffix ( filepath, regex ) {

  const matches = getUniqMatches ( filepath, regex );

  return matches.length ? matches[0][1] : '';

}

function getPathWithoutSuffix ( filepath, regex ) {

  const matches = getUniqMatches ( filepath, regex );

  return matches.length ? `${filepath.substring ( 0, matches[0].index )}${filepath.substring ( matches[0].index + matches[0][1].length + 1 )}` : filepath;

}

function getNodesBySuffix ( nodes, suffix ) {

  return nodes.filter ( node => node.suffix === suffix );

}

function groupNodesBySuffixes ( nodes ) {

  const suffixes = _.uniq ( nodes.map ( node => node.suffix ) ),
        nodesBySuffixes = suffixes.map ( suffix => getNodesBySuffix ( nodes, suffix ) );

  return _.zipObject ( suffixes, nodesBySuffixes );

}

function sortNodes ( nodes, paths ) {

  return _.sortBy ( paths, [path => - nodes[path].priority || 0, path => nodes[path].path] );

}

function bubblePriority ( components, node ) {

  node.dependencies.forEach ( dependency => {

    const parentNode = components[dependency];

    if ( !parentNode ) return; // It could be an optional dependency

    if ( node.priority <= parentNode.priority ) return;

    parentNode.priority = node.priority;

    bubblePriority ( components, parentNode );

  });

}

/* RESOLUTION */

function getNodes ( files, config ) {

  /* VARIABLES */

  const nodes = {},
        components = {};

  /* POPULATING */

  files.forEach ( file => {

    const suffix = getPathSuffix ( file.path, config.suffixRe ),
          component = config.path2component ( file.path ),
          componentWithoutSuffix = getPathWithoutSuffix ( component, config.suffixRe );

    const node = {
      file,
      path: file.path,
      component,
      suffix,
      priority: config.priority ? getFilePriority ( file, config.priorityRe ) : 0,
      optionals: config.optional ? getFilePaths ( file, config.optionalRe, config ) : [],
      requires: config.require ? getFilePaths ( file, config.requireRe, config ) : [],
      before: ( suffix === config.beforeSuffix ) ? componentWithoutSuffix : false,
      after: ( suffix === config.afterSuffix ) ? componentWithoutSuffix : false,
      override: ( suffix === config.overrideSuffix ) ? componentWithoutSuffix : false
    };

    if ( !config.before && node.before ) return;
    if ( !config.after && node.after ) return;
    if ( !config.override && node.override ) return;

    nodes[file.path] = node;
    components[component] = node;

  });

  /* DEPENDENCIES */

  files.forEach ( file => {

    const node = nodes[file.path],
          validOptionals = node.optionals.filter ( optional => components[optional] );

    node.dependencies = validOptionals.concat ( node.requires );

  });

  return { nodes, components };

}

function resolveOverride ( nodes, components, {overrides} ) {

  for ( let node of overrides ) {

    const target = components[node.override];

    if ( !target ) return getErrorOverride ( node );

    const originalPath = target.file.path;

    _.extend ( target, _.omit ( node, ['path', 'component'] ) );

    delete nodes[node.path];

    target.file.originalPath = originalPath;

  }

}

function resolveBefore ( nodes, components, {befores} ) {

  for ( let node of befores ) {

    const target = components[node.before];

    if ( !target ) return getErrorBefore ( node );

    if ( node.priority !== false ) {
      target.priority = node.priority;
    }

    target.dependencies = _.uniq ( target.dependencies.concat ( node.dependencies ) );

  }

}

function injectBefores ( nodes, components, files, befores ) {

  befores.forEach ( before => {

    const index = files.findIndex ( file => nodes[file.originalPath || file.path].component === before.before );

    files.splice ( index, 0, before.file );

  });

}

function resolveAfter ( nodes, components, {afters} ) {

  for ( let node of afters ) {

    const target = components[node.after];

    if ( !target ) return getErrorAfter ( node );

    target.dependencies = _.uniq ( target.dependencies.concat ( node.dependencies ) );

  }

}

function injectAfters ( nodes, components, files, afters ) {

  afters.forEach ( after => {

    const index = files.findIndex ( file => nodes[file.originalPath || file.path].component === after.after );

    files.splice ( index + 1, 0, after.file );

  });

}

function resolvePriority ( nodes, components, {normals} ) {

  for ( let node of normals ) {

    bubblePriority ( components, node );

  }

}

function resolveDependencies ( nodes, components, {normals, befores, afters} ) {

  const paths = sortNodes ( nodes, normals.map ( node => node.path ) ),
        files = []; // Resolved files

  let [roots, others] = _.partition ( paths, path => !nodes[path].dependencies.length );

  function addRoot ( root ) {

    roots.push ( root );

    roots = sortNodes ( nodes, roots ); //TODO: inserting the new root in the right spot would be faster since `roots` is sorted already //TODO: benchmark on Svelto

  }

  function resolveRoot ( root ) {

    const node = nodes[root],
          component = node.component;

    files.push ( node.file );

    others = others.filter ( other => {

      const node = nodes[other];

      _.remove ( node.dependencies, dependency => dependency === component );

      const isRoot = !node.dependencies.length;

      if ( isRoot ) addRoot ( other );

      return !isRoot;

    });

  };

  function resolveRoots () {

    while ( roots.length ) { // The length will probably change dynamically, can't use forEach

      const root = roots.shift ();

      resolveRoot ( root );

    }

  }

  resolveRoots ();
  injectBefores ( nodes, components, files, befores );
  injectAfters ( nodes, components, files, afters );

  return getErrorDependencies ( nodes, others ) || files;

}

function resolveNodes ( nodes, components, config ) {

  /* VARIABLES */

  const groupedNodes = groupNodesBySuffixes ( Object.values ( nodes ) ),
        normals = groupedNodes[''] || [],
        befores = groupedNodes[config.beforeSuffix] || [],
        afters = groupedNodes[config.afterSuffix] || [],
        overrides = groupedNodes[config.overrideSuffix] || [],
        resolvers = [resolveOverride, resolveBefore, resolveAfter, resolvePriority, resolveDependencies];

  /* RESOLVE */

  for ( let resolver of resolvers ) {

    const result = resolver ( nodes, components, { normals, befores, afters, overrides } );

    if ( result ) return result;

  }

}

/* LOGGING */

function getErrorOverride ( node ) {

  return getErrorMissingFile ( node.path, node.override );

}

function getErrorBefore ( nodes, components, groupedNodes ) {

  return getErrorMissingFile ( node.path, node.before );

}

function getErrorAfter ( nodes, components, groupedNodes ) {

  return getErrorMissingFile ( node.path, node.after );

}

function getErrorDependencies ( nodes, leftovers ) {

  if ( !leftovers.length ) return;

  /* MISSING DEPENDENCIES */

  for ( let leftover of leftovers ) {

    const node = nodes[leftover];

    if ( !node ) continue;

    for ( let dependency of node.dependencies ) {

      const root = _.find ( nodes, node => node.component === dependency );

      if ( !root ) return getErrorMissingFile ( node.path, dependency );

    }

  }

  /* CIRCULAR DEPENDENCIES */

  return getError ( `Circular dependencies found involving: \n${leftovers.map ( leftover => `  ${chalk.yellow ( leftover )}` ).join ( '\n' )}` );

}

function getErrorMissingFile ( filepath1, filepath2 ) {

  return getError ( `"${chalk.yellow ( filepath1 )}" needs "${chalk.yellow ( filepath2 )}", but it has not been found, is the path correct?` );

}

function getError ( message ) {

  return new PluginError ( 'Dependencies', message );

}

function log ( nodes, files ) {

  if ( !files.length ) return;

  const lines = [`Dependencies (${files.length}):`];

  files.forEach ( ( file, i ) => {

    const node = nodes[file.originalPath || file.path],
          isOverride = !!file.originalPath,
          isBeforeOrAfter = node.before || node.after,
          priority = node.priority;

    let line = file.path;

    if ( priority ) {

      const arrow = priority > 0 ? '↑' : '↓',
            color = priority > 0 ? 'green' : 'red';

      line += chalk[color]( ` ${priority}${arrow}` );

    }

    const separator = isOverride ? chalk.yellow ( '!' ) : ( isBeforeOrAfter ? chalk.yellow ( '<' ) : '-' );

    line = `${_.padStart ( i + 1, files.length.toString ().length )} ${separator} ${line}`;

    lines.push ( line );

  });

  console.log ( lines.join ( '\n' ) );

}

/* DEPENDENCIES */

function dependencies ( files, config ) {

  /* CONFIG */

  config = _.merge ({
    path2component: _.identity,
    log: false,
    /* TAG DIRECTIVES */
    priority: true,
    priorityRe: /@priority[\s]+(-?(?:(?:\d+)(?:\.\d*)?|(?:\.\d+)+))[\s]*/g,
    optional: true,
    optionalRe: /@optional[\s]+([\S]+\.[\S]+)[\s]*/g,
    require: true,
    requireRe: /@require[\s]+([\S]+\.[\S]+)[\s]*/g,
    /* SUFFIX DIRECTIVES */
    suffixRe: /\.([^.]+)\.\S+$/g,
    before: true,
    beforeSuffix: 'before',
    after: true,
    afterSuffix: 'after',
    override: true,
    overrideSuffix: 'override'
  }, config );

  /* DEPENDENCIES */

  const { nodes, components } = getNodes ( files, config ),
        result = resolveNodes ( nodes, components, config );

  if ( result instanceof PluginError ) return result;

  if ( config.log ) log ( nodes, result );

  return result;

}

/* EXPORT */

module.exports = forAll ( dependencies );
