#!/bin/bash

npm run build

mkdir -p dist/public
mv dist/* dist/public 
cp conf/* dist/

cf push
