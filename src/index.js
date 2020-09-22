/*
 * @Author: zhaozy 
 * @Date: 2020-09-14 15:45:00 
 * @Last Modified by: zhaozy
 * @Last Modified time: 2020-09-22 17:43:15
 */
import readConf from "./readConfig.js"
import fs from 'fs'
import Fontmin from 'fontmin'

let set = new Set();


(async function main() {
    const { fontFile, fontTextFile, targetPath } = await readConf();
    //get all possible characters
    const scanFolder = (dir, done) => {
        let results = [];
        fs.readdir(dir, (err, list) => {
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
                fs.stat(file, (err, stat) => {
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
    };

    //get all possible characters
    const generateFinalHTML = finalString => {
        try {
            const fontmin = new Fontmin()
                .src(fontFile)
                .dest(targetPath)
                .use(Fontmin.glyph({
                    text: finalString,
                    hinting: false
                }))
                .use(Fontmin.ttf2woff({
                    deflate: true
                }));


            fontmin.run((err) => {
                if (err) {
                    return console.log(new Error(err))
                }
                console.log('Success')
            });
        } catch (err) {
            return console.log(new Error(err))
        }
    }

    //get all possible characters
    scanFolder(fontTextFile, (n, results) => {
        if (n) {
            return console.log(new Error(n))
        } else {
            results.forEach(file => {
                const result = fs.readFileSync(file, 'utf8');
                const currentSet = new Set(result)
                set = new Set([...set, ...currentSet]);
            });
            generateFinalHTML(Array.from(set).join(""))
        }

    })

})()
