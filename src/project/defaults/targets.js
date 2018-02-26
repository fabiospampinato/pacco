
// All the properties of the active target will be merged with the basic object

/* REQUIRE */

const fs = require ( 'fs' ),
      path = require ( 'path' ),
      nodeExternals = require ( 'webpack-node-externals' );

/* EXTERNALS */

const externals = fs.existsSync ( path.join ( process.cwd (), 'node_modules' ) ) ? nodeExternals () : []; //FIXME: Ugly https://github.com/liady/webpack-node-externals/issues/44

/* TARGETS */

const targets = {
  web: {
    plugins: {
      webpack: {
        options: {
          target: 'web'
        }
      }
    }
  },
  node: {
    plugins: {
      webpack: {
        options: {
          target: 'node',
          externals
        }
      }
    }
  },
};

/* EXPORT */

module.exports = targets;
