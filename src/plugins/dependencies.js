
//TODO: Publish as `gulp-dependencies`

/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      path = require ( 'path' ),
      PluginError = require ( 'plugin-error' ),
      stringMatches = require ( 'string-matches' ).default,
      forAll = require ( './forAll' );

/* UTILITIES */

function getFilePriority ( file, regex ) {

  const content = file.contents.toString ( 'utf8' );
        matches = stringMatches ( content, regex ).map ( match => match[1] ),
        priority = Number ( _.last ( matches ) ) || 0;

  return priority;

}

function getFileTargets ( file, regex, config ) {

  const dirname = path.dirname ( config.path2component ( file.path ) ),
        contents = file.contents.toString ( 'utf8' ),
        matches = stringMatches ( contents, regex ).map ( match => match[1] ),
        targets = matches.map ( match => match.startsWith ( '.' ) ? path.resolve ( dirname, match ) : match );

  return targets;

}

function inheritPriority ( modules, module ) {

  module.dependencies.forEach ( dependency => {

    const dep = modules[dependency];

    if ( !dep ) return;

    const newPriority = Math.max ( dep.priority, module.priority );

    if ( dep.priority === newPriority ) return;

    dep.priority = newPriority;

    inheritPriority ( modules, dep );

  });

}

function getGraphError ( graph, leftovers ) {

  if ( !leftovers.length ) return;

  /* MISSING DEPENDENCIES */

  for ( let leftover of leftovers ) {

    const node = graph[leftover];

    if ( !node ) continue;

    for ( let dependency of node.dependencies ) {

      const root = _.find ( graph, node => node.module === dependency );

      if ( !root ) return new PluginError ( 'Dependencies', `"${chalk.yellow ( node.path )}" requires "${chalk.yellow ( dependency )}", but it has not been found. Is the path corrent?` );

    }

  }

  /* CIRCULAR DEPENDENCIES */

  return new PluginError ( 'Dependencies', `Circular dependencies found. Files involved: \n${leftovers.map ( leftover => `  ${chalk.yellow ( leftover )}` ).join ( '\n' )}` );

}

function getGraph ( files, config ) {

  const graph = {},
        modules = {};

  /* POPULATING */

  files.forEach ( file => {

    const module = {
      file,
      path: file.path,
      module: config.path2component ( file.path ),
      priority: config.priority ? getFilePriority ( file, config.priorityRe ) : 0,
      befores: config.before ? getFileTargets ( file, config.beforeRe, config ) : [],
      requires: config.require ? getFileTargets ( file, config.requireRe, config ) : []
    };

    graph[file.path] = module;
    modules[module.module] = module;

  });

  /* PARSING */

  files.forEach ( file => {

    const module = graph[file.path];

    /* CHECKING BEFORE EXISTENCE */

    module.befores = module.befores.filter ( before => !!modules[before] );

    /* DEPENDENCIES */

    module.dependencies = module.befores.concat ( module.requires );

    /* INHERITING PRIORITY */

    inheritPriority ( modules, module );

  });

  return graph;

}

function resolveGraph ( graph ) {

  const paths = sortPaths ( _.keys ( graph ) ),
        files = []; // Resolved graph

  let [roots, nodes] = _.partition ( paths, path => !graph[path].dependencies.length );

  function sortPaths ( paths ) {

    return _.sortBy ( paths, [path => - graph[path].priority, _.identity] );

  }

  function addRoot ( root ) {

    roots.push ( root );

    roots = sortPaths ( roots ); //TODO: inserting the new root in the right spot would be faster since `roots` is sorted already //TODO: benchmark on Svelto

  }

  function resolveRoot ( root ) {

    files.push ( graph[root].file );

    const module = graph[root].module;

    nodes = nodes.filter ( node => {

      _.remove ( graph[node].dependencies, dep => dep === module );

      const isRoot = !graph[node].dependencies.length;

      if ( isRoot ) addRoot ( node );

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

  return getGraphError ( graph, nodes ) || files;

}

function log ( graph, files ) {

  if ( !files.length ) return;

  const lines = [`Dependencies (${files.length}):`];

  files.forEach ( ( file, i ) => {

    const priority = graph[file.path].priority;

    let line = `${_.padStart ( i + 1, files.length.toString ().length )} - ${file.path}`;

    if ( priority ) {

      const arrow = priority > 0 ? '↑' : '↓',
            color = priority > 0 ? 'green' : 'red';

      line += chalk[color]( ` ${priority}${arrow}` );

    }

    lines.push ( line );

  });

  console.log ( lines.join ( '\n' ) );

}

/* DEPENDENCIES */

function dependencies ( files, config ) {

  /* CONFIG */

  config = _.merge ({
    path2component: _.identity,
    priority: true,
    priorityRe: /@priority[\s]+(-?(?:(?:\d+)(?:\.\d*)?|(?:\.\d+)+))[\s]*/g,
    before: true,
    beforeRe: /@before[\s]+([\S]+\.[\S]+)[\s]*/g,
    require: true,
    requireRe: /@require[\s]+([\S]+\.[\S]+)[\s]*/g,
    log: false
  }, config );

  /* DEPENDENCIES */

  const graph = getGraph ( files, config ),
        resolvedFiles = resolveGraph ( graph );

  if ( resolvedFiles instanceof PluginError ) return resolvedFiles;

  if ( config.log ) log ( graph, resolvedFiles );

  return resolvedFiles;

}

/* EXPORT */

module.exports = forAll ( dependencies );
