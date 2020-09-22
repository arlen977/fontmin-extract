/*
 * @Author: zhaozy 
 * @Date: 2020-09-14 15:44:52 
 * @Last Modified by: zhaozy
 * @Last Modified time: 2020-09-22 16:42:29
 */
import * as path from 'path'
import { readJson, convertPath } from './utils'

export default async function () {
    const confFile = process.argv[2] ? convertPath(process.argv[2]) : path.resolve(__dirname, 'fontExtract.json')

    const config = await readJson(confFile)
    const fontFile = convertPath(config.fontFile) // 传入的font ttf 文件路径
    const fontTextFile = config.fontTextFile ? convertPath(config.fontTextFile) : path.dirname(__dirname) + '/src/assets/data/'  // 传入的需要提取的文字文件 文件路径
    const targetPath = config.targetPath ? convertPath(config.targetPath) : convertPath('./src/font-extract/')
    // let fontPath = await readJson(fontFile)
    return { fontFile, fontTextFile, targetPath }
}