var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify')

var _ = require('lodash');
var path = require('path');

gulp.task('default', function(done) {
    console.log('Default gulp task!');
    done();
});

/**
 * Externalize all site-wide libraries into one file.  Since these libraries are all sizable, it would be better for the
 * client to request it individually once and then retreive it from the cache than to include all of these files into
 * each and every browserified application. 
 */
gulp.task('build-common-lib', function(done) {
    var nodeModules = path.join(__dirname + '/node_modules');
    var libraries = {
        // ...
        'browser': {
            'vue': 'vue/dist/vue.min.js'
        }
    };

    var libraryPaths = [];
    _.forOwn(libraries['browser'], function(value, key) {
        console.log(path.join(nodeModules, value));
        libraryPaths.push(path.join(nodeModules, value));
    });

    return gulp.src(libraryPaths)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(__dirname, '/lib')));
});