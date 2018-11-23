#!/bin/bash

cat coffeescript/*.coffee | coffee --compile --bare --stdio > js/main.js
