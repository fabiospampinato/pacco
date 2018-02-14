# Pacco

A bundler for modular and extensible web projects.

## Why not WebPack?

Work on Pacco started before WebPack was even a thing. In most of the cases you'll want to stick with WebPack, but if you're building a modular and extensible web project, like a front-end framework, Pacco will make your life easier:

- **No configuration**: it just works. But if you need to, you can customize almost everything.
- **Partial builds**: you can compile your project excluding some particular files or folders. You don't have to compile anything that you don't need.
- **Extensibility**: you can build on top of extensible projects, even inject files exactly before or after a particular file, or override some other file. Useful for adding a component to a framework, providing SASS variables or custom configurations in general.
- **Module priority**: you can ensure your most important code stays closer to the beginning of your bundle, ensuring it will be executed as soon as possible, improving percieved performance.
- **Build on top of Gulp**: you may want to add support for LESS, being Pacco built on top of Gulp means it is easy to extend.

## Documentation

//TODO: are you interested in this project? Open an issue and I'll find the time for writing it.

In the mean time you can take a look at [Svelto](https://github.com/svelto/svelto), the front-end framework this bundler has been created for.
