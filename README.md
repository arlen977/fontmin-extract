# 利用fontmin 完成的自定义字体提取  内嵌3500个常用汉字、数字、大小写英文字母

## 使用方式
在根目录创建fontExtract.json文件（必须）

{
    "fontFile": "",             需要提取的字体包路径（必须）
    "fontTextFile":"",          需要提取出使用的字体文件路径，若不传，则使用内嵌常用汉字文件  文件使用text文件格式
    "targetPath": ""            输出地址 默认 src/font-extract/
}

## 命令

### 安装    install
```
npm install font-extract -g
```

### 执行    execute
```
font-extract ./fontExtract.json
```