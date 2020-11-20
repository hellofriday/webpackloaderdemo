const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
module.exports = async function(source) {
  const result = RegExp('(@include\\()(.*?)\\)').exec(source)
  let filePath = result[2] // 获取需要插入的文件路径 需要把它处理成绝对路径
  const request = loaderUtils.urlToRequest(filePath)
  const url = await resolvePath(this, path.resolve(__dirname, 'src'), request)
  const res = await readFile(url, {encoding: "utf8"})
  return source.replace(result[0], res)
}
function readFile(url, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, options, (err, data)=>{
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
      
    })
  })
}
function resolvePath(_this, fullPath, request) {
  return new Promise((resolve, reject) => {
    _this.resolve(fullPath, request, (err, url)=>{
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}
