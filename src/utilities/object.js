
/* OBJECT */ //TODO: Publish as a standalone module

const object = {

  getter ( obj, key, getter ) {

    const prev = obj[key];

    Object.defineProperty ( obj, key, {
      enumerable: true,
      get () {
        return getter.call ( this, prev );
      }
    });

  },

  getterMemoize ( obj, key, getter ) {

    let memoized = false,
        value;

    function getterMemoizer ( ...args ) {

      if ( memoized ) return value;

      value = getter.call ( this, ...args );

      memoized = true;

      return value;

    }

    object.getter ( obj, key, getterMemoizer );

  }

};

/* EXPORT */

module.exports = object;
