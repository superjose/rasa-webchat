const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');

/**
 * Automatically copies the built module into the omnihealth-frontend project. 
 */
gulp.task('copy-module-to-front-end', async () => {

  await del([
      '../omnihealth-frontend/src/components/ChatWidget/widget.js',
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
        .pipe(gulp.dest('../omnihealth-frontend/src/components/ChatWidget/'));
});
