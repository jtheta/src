# jtheta.src

This README is for contributors to the `jtheta` platform. User documentation is coming soon.

## monorepo

This is the `jtheta` source monorepo. Any and all source code should land in this repository.
This ensures that our CI is simple. Any exceptions to the rule will be called out in the contributor documentation.

All dependencies should be committed to this repository to avoid "works for me" errors. In the
future we may use `git submodule`s to improve efficiency.

## setup

Below is a copy / past-able script to run to get your dev env setup.

```
git clone git@github.com:jtheta/src.git
cd src
SETUP=./dev/install.sh
chmod +x $SETUP
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

- [/bld](#bld)
- [/cmp](#cmp)
- [/cmp/.../api](#api)
- [/cmp/.../lib](#lib)
- [/cmp/.../test](#test)
- [/dev](#velox-ui)

## bld

 - Contains repo wide build scripts
 - Build the entire platform with `./bld/b.sh`
 - Uses `idx.yml` as an index for what to build

### cmp

 - Contains all components
 - Components are just a way to organize related code, nothing fancy
 - Each component should have its own `lib` and `api` tests
 - Some components will have `ui` tests
 - Each component should include a [cmp.yml](#cmp.yml)

### dev

 - Contains all development `chore` related utilities/tools.
 - The [setup script](#setup) ensures your env is ready for development.
 - This directory is removed for all distrubutioins
 - `./dev/val.cfg.js` - validates all platform configuration files

### test

 - All component related tests

### lib

 - All component source

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