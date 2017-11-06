'use strict';

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');

const SHAKA = '../shaka-source/dist/'

gulp.task('update-shaka', (cb) => {
  let neededFiles = [
    'shaka-player.compiled.debug.externs.js',
    'shaka-player.compiled.debug.js',
    'shaka-player.compiled.debug.map',
    'shaka-player.compiled.externs.js',
    'shaka-player.compiled.js',
    'shaka-player.compiled.map'
  ];
  neededFiles.forEach((item) => {
    let fileToCopy = path.join(SHAKA, item);
    let destination = path.join('app/dist', item)
    fs.createReadStream(fileToCopy)
      .pipe(fs.createWriteStream(destination));
  })
});
