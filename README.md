## Tiles
Create tiles with node base script, you can change the config of this if needed.
Uses Imagemagick, Sharp and Node

https://github.com/lovell/sharp

```javascript```
brew install homebrew/science/vips --with-imagemagick --with-webp
npm install sharp
```

Please follow the console commands

```javascript```
gulp optimize
```
## Setup:
Just clone the repository or download and run:
```javascript
npm install
```

## Run locally:
```javascript
gulp
gulp watch
gulp browser_sync
```

Happy Coding!

## Includes:
- Browserify
- Sass
- Browser Sync
- Source Maps for JS & CSS on Debug Mode
- JS Lint
- Optimize Images
- Run Tests with Jasmine
- Include Partials (@@include) or Templates (%%include)

## Build Commands
### Debug Mode
```javascript
gulp
```
### Release Mode
```javascript
gulp -r // gulp --release
```
### Live Development
```javascript
gulp live 
// Live on Release Mode
gulp live -r // gulp live --release
```
### Tests
```javascript
gulp test
// Watch Mode
gulp test -w // gulp test --watch
```

### Coordinate systems
We are setting the coordinates in pixel values and based on the original image. Get the OpenSeadragon position by calling
```
map.getElementCoordinates(pixelX,pixelY);
```
