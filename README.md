# petulant-tatertot
Simple game of Memory

## How to run it
__Make sure you have `gulp` and `karma` installed as command line utilities__
__`npm install -g karma-cli gulp`__
`npm install` to pull down dependencies
`gulp build:src` and `open build/index.html` to view the game with sourcemaps and all.
`gulp build:dist` to build a concatenated/minified version.  `open dist/index.html` will open the same

`gulp build:tests && karma start` to run jasmine tests
