/*
 * @Author: zhaozy 
 * @Date: 2020-09-14 15:45:09 
 * @Last Modified by:   zhaozy 
 * @Last Modified time: 2020-09-14 15:45:09 
 */

import * as path from "path"
import * as fs from "fs-extra"

// 读取json
export async function readJson(filePath) {
    return await fs.readJson(path.resolve(filePath))

}
// 获取执行命令 环境路径
export function convertPath(...args) {
    return path.resolve(process.cwd(), ...args)
}