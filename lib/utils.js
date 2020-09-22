"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJson = readJson;
exports.convertPath = convertPath;

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs-extra"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * @Author: zhaozy 
 * @Date: 2020-09-14 15:45:09 
 * @Last Modified by:   zhaozy 
 * @Last Modified time: 2020-09-14 15:45:09 
 */
// 读取json
async function readJson(filePath) {
  return await fs.readJson(path.resolve(filePath));
} // 获取执行命令 环境路径


function convertPath(...args) {
  return path.resolve(process.cwd(), ...args);
}