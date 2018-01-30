#!/usr/bin/env bash
DEV=$(dirname "$0")
SRC=$DEV/..
BLD=$SRC/bld

# perms
chmod +x $SRC/run
chmod +x $BLD/bld
