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

// 模块包列表
const packages = {
  common: ts.createProject('packages/common/tsconfig.json'),
  core: ts.createProject('packages/core/tsconfig.json'),
  extend: ts.createProject('packages/extend/tsconfig.json'),
};

// 基本参数
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


/**
 * 清理模块包
 */
gulp.task('clean:bundle', function () {
  var removeList = []
  modules.forEach(module => {
    removeList.push(`bundle/${module}/*`)
    removeList.push(`!bundle/${module}/package.json`)
  })
  return del(removeList);
});


/**
 * 生成模块编译任务(发布模式)
 */
modules.forEach(module => {
  gulp.task(module, () => {
    return packages[module]
      .src()
      .pipe(packages[module]())
      .pipe(gulp.dest(`${dist}/${module}`));
  });
});

/**
 * 生成模块编译任务(开发模式)
 */
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
      .pipe(gulp.dest(`node_modules/@cocker/${module}`));
  });
});


/**
 * 编译任务(发布模式)
 */
gulp.task('build', function (cb) {
  gulpSequence('common', modules.filter(module => module !== 'common'), cb);
});

/**
 * 编译任务(开发模式)
 */
gulp.task('build:dev', function (cb) {
  gulpSequence(
    'clean:bundle',
    'common:dev',
    modules
      .filter(module => module !== 'common')
      .map(module => module + ':dev'),
    'move',
    cb
  );
});


/**
 * 复制模块到到实例项目
 */
gulp.task('move', function () {
  let stream = gulp
    .src(['node_modules/@cocker/**/*'])
    .pipe(gulp.dest('example/node_modules/@cocker'));
});

/**
 * 升级版本号
 * @param {*} importance 升级类型
 */
function updateVersion(importance) {
  let tag = {
    'patch': 'dev',
    'minor': 'latest',
    'major': 'latest'
  }[importance]
  console.log(tag)
  // 修改待发布tag
  rewriteFile(updatePublishTag, tag, '.publishrc')

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

/**
 * 
 * @param {*} type 
 * @param {*} fun 
 * @param {*} file_url 
 * @param {*} msg 
 */
function rewriteFile(replace, tag, targetFile) {
  return function (callback) {
    //读取文件
    let text = fs.readFileSync(file_url, "utf-8");

    text = replace(text, tag) || text;

    try {
      fs.writeFileSync(targetFile, text);
    } catch (ex) {
      callback(true, ex.message);
      return;
    }
    callback(null);
  }
}


/**
 * 修改等待发布tag
 */
function updatePublishTag(text, tag) {
  return text.replace(/"publishTag":".*?"/g, `"publishTag":"${tag}"`)
}



/**
 * 升级版本号(补丁版本)
 */
gulp.task('patch', function () { return updateVersion('patch'); })

/**
 * 升级版本号(功能版本)
 */
gulp.task('feature', function () { return updateVersion('minor'); })

/**
 * 升级版本号(主版本)
 */
gulp.task('release', function () { return updateVersion('major'); })