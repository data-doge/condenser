String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this)
}

String.prototype.rotate = function (num) {
  num = num || 1
  var firstChars = this.slice(0, num)
  return this.slice(num) + firstChars
}

Number.prototype.isEven = function (num) {
  return this % 2 == 0
}
