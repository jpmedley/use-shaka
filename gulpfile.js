'use strict';

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const replace = require('gulp-html-replace');

const SHAKA = '../shaka-source';
const APP = 'app/';
const PRODFILES = [
  '/dist/shaka-player.compiled.externs.js',
  '/dist/shaka-player.compiled.js',
  '/dist/shaka-player.compiled.map'
]
const DEBUGFILES = [
  '/dist/deps.js',
  '/dist/shaka-player.compiled.debug.externs.js',
  '/dist/shaka-player.compiled.debug.js',
  '/dist/shaka-player.compiled.debug.map',
  '/shaka-player.uncompiled.js',
  '/third_party/closure/goog/base.js'
]

gulp.task('debug', (cb) => {
  PRODFILES.forEach((item) => {
    let fileToDelete = path.join(APP, item);
    try {
      fs.unlinkSync(fileToDelete);
    }
    catch (e) {
      // If I call gulp debug twice, unlinkSync()
      // will throw errors I don't care about.
      if (!e.errno == -2) { throw e; }
    }
  });
  DEBUGFILES.forEach((item) => {
    let fileToCopy = path.join(SHAKA, item);
    let destination = path.join('app', item);
    console.log("Writing to " + destination);
    fs.createReadStream(fileToCopy)
      .pipe(fs.createWriteStream(destination));
  });
  let data = fs.readFileSync('./src/templates/debug.med');
  let player = {
    player: {
      src: data.toString('utf8'),
      tpl: '%s'
    }
  }
  gulp.src('./src/index.html')
    .pipe(replace(player))
    .pipe(gulp.dest(APP));
});

gulp.task('prod', (cb) => {
  DEBUGFILES.forEach((item) => {
    let fileToDelete = path.join(APP, item);
    try {
      fs.unlinkSync(fileToDelete);
    }
    catch (e) {
      // If I call gulp prod twice, unlinkSync()
      // will throw errors I don't care about.
      if (!e.errno == -2) { throw e; }
    }
  });
  PRODFILES.forEach((item) => {
    let fileToCopy = path.join(SHAKA, item);
    let destination = path.join('app', item);
    console.log("Writing to " + destination);
    fs.createReadStream(fileToCopy)
      .pipe(fs.createWriteStream(destination));
  });
  let data = fs.readFileSync('./src/templates/prod.med');
  let player = {
    player: {
      src: data.toString('utf8'),
      tpl: '%s'
    }
  }
  gulp.src('./src/index.html')
    .pipe(replace(player))
    .pipe(gulp.dest(APP));
});
