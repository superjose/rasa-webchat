const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const header = require('gulp-header');

/**
 * Automatically copies the built module into the omnihealth-frontend project. 
 */
gulp.task('copy-module-to-front-end', async () => {

  await del([
      '../omnihealth-frontend/src/components/Chat/ChatWidget/widget.js',
      '../omnihealth-frontend/chat-widget/index.js'
  ], 
  // We need to delete the files before gulp can copy, otherwise we will receive a file
  // exists problem.
  {
      force: true
  })

 
   return gulp.src('./module/index.js')
        .pipe(gulp.dest('../omnihealth-frontend/chat-widget/'))
        // Pipes it to the adjacent chat widget directory. 
        // This allows us to code faster as we can skip 
        // the verification process
        .pipe(rename('widget.js'))
        // Disables eslint for the chatwidget used for development
        .pipe(header('/* eslint-disable */'))
        .pipe(gulp.dest('../omnihealth-frontend/src/components/Chat/ChatWidget/'));
});
