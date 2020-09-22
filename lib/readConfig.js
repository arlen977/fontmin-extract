"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var path = _interopRequireWildcard(require("path"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * @Author: zhaozy 
 * @Date: 2020-09-14 15:44:52 
 * @Last Modified by: zhaozy
 * @Last Modified time: 2020-09-22 16:42:29
 */
async function _default() {
  const confFile = process.argv[2] ? (0, _utils.convertPath)(process.argv[2]) : path.resolve(__dirname, 'fontExtract.json');
  const config = await (0, _utils.readJson)(confFile);
  const fontFile = (0, _utils.convertPath)(config.fontFile); // 传入的font ttf 文件路径

  const fontTextFile = config.fontTextFile ? (0, _utils.convertPath)(config.fontTextFile) : path.dirname(__dirname) + '/src/assets/data/'; // 传入的需要提取的文字文件 文件路径

  const targetPath = config.targetPath ? (0, _utils.convertPath)(config.targetPath) : (0, _utils.convertPath)('./src/font-extract/'); // let fontPath = await readJson(fontFile)

  return {
    fontFile,
    fontTextFile,
    targetPath
  };
}