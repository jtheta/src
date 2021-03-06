# jtheta.src

This README is for contributors to the `jtheta` platform. User documentation is coming soon.

## monorepo

This is the `jtheta` source monorepo. Any and all source code should land in this repository.
This ensures that our CI is simple. Any exceptions to the rule will be called out in the contributor documentation.

## setup

Below is a copy / past-able script to run to get your dev env setup.

```
git clone git@github.com:jtheta/src.git
cd src
SETUP=./dev/install.sh
./$SETUP
```

## testing

There are three types of tests: `ui`, `api`, and `lib`.

 - `ui` - for testing user interactions (cli, gui, etc)
 - `api` - for testing functionality usable by non-platform programs 
 - `lib` - for testing internal platform libraries and tools

Acceptance tests, e2e tests, etc should be written as a combination of these styles in the correct directories.

## dirs

Here's a brief description of the files and folders.

- [/app](#app)
- [/bld](#bld)
- [/cmp](#cmp)
- [/cmp/.../api](#api)
- [/cmp/.../lib](#lib)
- [/cmp/.../test](#test)
- [/dev](#velox-ui)
- [/run](#run)

### app

 - Contains end user applications

### bld

 - Contains repo wide build scripts
 - Build the entire platform with `./bld/bld`

### cmp

 - Contains all components
 - Components are just a way to organize related code, nothing fancy
 - Each component should have its own `lib` and `api` tests
 - Some components will have `ui` tests
 - Each component should include a [cmp.yml](#cmp.yml)

### dev

 - Contains all development `chore` related utilities/tools.
 - The [setup script](#setup) ensures your env is ready for development.
 - This directory is removed for all distributions
 - `./dev/val.cfg.js` - validates all platform configuration files

### test

 - All component related tests
 - Tests should be in `test/api.test.ts` and `test/lib/*`

### lib

 - All component internal/private source

### api

 - Any source providing public mehtods / classes / etc

### cmp.yml

*This is still to be well defined, but these are the main values.*

 - `version.platofrm` - Array of supported platform versions (semver)
 - `version.cmp` - The component version (semver)
 - `lang` - One of `.m`, `.js`, `.j`, `.java` (the component language)
 - `ci` - Passthrough to CI (details tbd)
 - `status` - One of `alpha`, `beta`, `ga`
 - `title` - For docs (markdown)
 - `description` - For docs (markdown)
 - `alias` - Resolved to the entire component path during build
 - `config` - Object containing arbitrary config

### run

 Execute scripts by repo wide name (similar to `npm run`, but without the baggage).

 ```sh
 ./run build
 ```