"use strict";

var _readConfig = _interopRequireDefault(require("./readConfig.js"));

var _fs = _interopRequireDefault(require("fs"));

var _fontmin = _interopRequireDefault(require("fontmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: zhaozy 
 * @Date: 2020-09-14 15:45:00 
 * @Last Modified by: zhaozy
 * @Last Modified time: 2020-09-22 17:43:15
 */
let set = new Set();

(async function main() {
  const {
    fontFile,
    fontTextFile,
    targetPath
  } = await (0, _readConfig.default)(); //get all possible characters

  const scanFolder = (dir, done) => {
    let results = [];

    _fs.default.readdir(dir, (err, list) => {
      if (err) {
        return done(err);
      }

      let i = 0;

      (function iter() {
        let file = list[i++];

        if (!file) {
          return done(null, results);
        }

        file = dir + '/' + file;

        _fs.default.stat(file, (err, stat) => {
          if (stat && stat.isDirectory()) {
            scanFolder(file, (err, res) => {
              results = results.concat(res);
              iter();
            });
          } else {
            results.push(file);
            iter();
          }
        });
      })();
    });
  }; //get all possible characters


  const generateFinalHTML = finalString => {
    try {
      const fontmin = new _fontmin.default().src(fontFile).dest(targetPath).use(_fontmin.default.glyph({
        text: finalString,
        hinting: false
      })).use(_fontmin.default.ttf2woff({
        deflate: true
      }));
      fontmin.run(err => {
        if (err) {
          return console.log(new Error(err));
        }

        console.log('Success');
      });
    } catch (err) {
      return console.log(new Error(err));
    }
  }; //get all possible characters


  scanFolder(fontTextFile, (n, results) => {
    if (n) {
      return console.log(new Error(n));
    } else {
      results.forEach(file => {
        const result = _fs.default.readFileSync(file, 'utf8');

        const currentSet = new Set(result);
        set = new Set([...set, ...currentSet]);
      });
      generateFinalHTML(Array.from(set).join(""));
    }
  });
})();