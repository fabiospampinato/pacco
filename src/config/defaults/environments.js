
// All the properties of the active environment(s) will be merged with the basic object

/* ENVIRONMENTS */

const environments = {
  development: {
    isDevelopment: true,
    plugins: {
      babel: {
        enabled: false
      },
      imagemin: {
        enabled: false
      },
      jsonminify: {
        enabled: false
      },
      uglify: {
        enabled: false
      },
      postcss: {
        enabled: false
      }
    }
  }
};

/* EXPORT */

module.exports = environments;
