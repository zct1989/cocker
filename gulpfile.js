const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpSequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del')
const git = require('gulp-git')
const bump = require('gulp-bump')
const filter = require('gulp-filter')
const tagVersion = require('gulp-tag-version');

const packages = {
  common: ts.createProject('packages/common/tsconfig.json'),
  core: ts.createProject('packages/core/tsconfig.json'),
  extend: ts.createProject('packages/extend/tsconfig.json'),
};

const modules = Object.keys(packages);
const source = 'packages';
const distId = process.argv.indexOf('--dist');
const dist = "bundle"


gulp.task('default', function () {
  modules.forEach(module => {
    gulp.watch(
      [`${source}/${module}/**/*.ts`, `${source}/${module}/*.ts`],
      [module]
    );
  });
});

gulp.task('copy:ts', function () {
  return gulp.packages(['packages/**/*.ts']).pipe(gulp.dest('./bundle'));
});

gulp.task('clean:bundle', function () {
  var removeList = []
  modules.forEach(module => {
    removeList.push(`bundle/${module}/*`)
    removeList.push(`!bundle/${module}/package.json`)
  })
  return del(removeList);
});


modules.forEach(module => {
  gulp.task(module, () => {
    return packages[module]
      .src()
      .pipe(packages[module]())
      .pipe(gulp.dest(`${dist}/${module}`));
  });
});

modules.forEach(module => {
  gulp.task(module + ':dev', () => {
    return packages[module]
      .src()
      .pipe(sourcemaps.init())
      .pipe(packages[module]())
      .pipe(
        sourcemaps.mapSources(sourcePath => './' + sourcePath.split('/').pop())
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`${dist}/${module}`));
  });
});



gulp.task('build', function (cb) {
  gulpSequence('common', modules.filter(module => module !== 'common'), cb);
});

gulp.task('build:dev', function (cb) {
  gulpSequence(
    'common:dev',
    modules
      .filter(module => module !== 'common')
      .map(module => module + ':dev'),
    'copy:ts',
    cb
  );
});

function inc(importance) {
  modules.forEach(module => {
    gulp.src(['./package.json'])
      // bump the version number in those files
      .pipe(bump({ type: importance }))
      // save it back to filesystem
      .pipe(gulp.dest(`bundle/${module}`))
  })

  // get all the files to bump version in
  return gulp.src('./package.json')
    // bump the version number in those files
    .pipe(bump({ type: importance }))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('bumps package version'))
    // read only one file to get the version number
    .pipe(filter('package.json'))
    // **tag it in the repository**
    .pipe(tagVersion());
}

gulp.task('patch', function () { return inc('patch'); })
gulp.task('feature', function () { return inc('minor'); })
gulp.task('release', function () { return inc('major'); })