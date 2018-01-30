#!/usr/bin/env bash
DEV=$(dirname "$0")
SRC=$DEV/..
BLD=$SRC/bld

# perms
chmod +x $SRC/run

# ensure deps are installed
# even though they are committed
npm install