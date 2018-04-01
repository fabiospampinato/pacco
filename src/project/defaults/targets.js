
// All the properties of the active target will be merged with the basic object

/* REQUIRE */

const nodeExternals = require ( 'webpack-node-externals' );

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
          externals: nodeExternals ()
        }
      }
    }
  },
};

/* EXPORT */

module.exports = targets;
