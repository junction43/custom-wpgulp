# custom-wpgulp
My personal Gulp configuration for WordPress theme development.

This configuration is heavily inspired by [WPGulp](https://github.com/ahmadawais/WPGulp) by Ahmad Awais and [this guide on CSS-Tricks](https://css-tricks.com/gulp-for-wordpress-initial-setup/) by Ali Alaa. Many thanks to them for sharing their work!

## Installation Guide
1. Initialize npm 
`npm init`

2. Install Gulp 
`npm install --save-dev gulp`

3. Install style-related dependencies 
`npm install --save-dev gulp-sass gulp-postcss gulp-clean-css autoprefixer` 
`npm install -D postcss`

4. Install image-related dependencies
`npm install --save-dev gulp-imagemin`

5. Install script-related dependencies
`npm install --save-dev webpack-stream vinyl-named`

6. Install utility dependencies
`npm install --save-dev gulp-sourcemaps del gulp-zip`

7. Customize **gulpfile.js** as needed
- Update `themeName`
- Use `copy` as a template to copy other files (e.g. fonts)

## Gulp Tasks 

### Default
`gulp`

- (`gulp clear`) Clear all files in `dist` folder
- (`gulp styles`) Compile Sass, Autoprefixe, Minify CSS
- (`gulp images`) Minify PNG, JPEG, GIF and SVG images
- (`gulp scripts`) Concatenate and minify scripts
- (`gulp watch`)Watch files for changes

### Build
`gulp build`

- (`gulp clear`) Clear all files in `dist` folder
- (`gulp styles`) Compile Sass, Autoprefixe, Minify CSS
- (`gulp images`) Minify PNG, JPEG, GIF and SVG images
- (`gulp scripts`) Concatenate and minify scripts
- (`gulp zip`) Zips theme and places in parent directory

## Notes
There were certain things I liked from both Ahmad Awais and Ali Alaa's Gulp setup so I decided to Frankenstein my own one together. Some key decisions I made:
- No Babel – as far as I know, webpack alone is adequate for my needs and I didn't care to use JS ES6 in the `gulpfile.js`
- No browserSync – I'm a weirdo who likes to refresh the browser 
- No wpPot – Currently using Underscores as base theme, which comes with .pot
- Added browserlist in `package.json` for Autoprefixer – per my project needs
- Directory setup – I preferred Ahmad's decision to place zip in parent directory but preferred Ali's general theme folder structure (with /src /dist)
- JS bundling – I like to enqueue scripts separately per page, so I used Ali's method of using `vinyl-named` to bundle multiple script files

I've only done some basic tests so I assume there'll be things that can be improved!