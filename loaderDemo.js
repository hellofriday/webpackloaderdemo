module.exports = function(source) {
  const index = RegExp('</body>').exec(source).index
  return source.slice(0, index) + "<script>function a(){console.log('hhh')} a()</script>" + source.slice(index)
}
