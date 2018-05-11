var gulp = require('gulp');
var _ = require('lodash');

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
    var paths = [];
    _.forEach(['xx', 'aaaa'], function(path) {
        console.log(path);
    });
    done();
});