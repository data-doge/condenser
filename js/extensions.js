String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this)
}

String.prototype.rotate = function (num) {
  num = num || 1
  var lastChars = this.slice(-num)
  return lastChars + this.slice(0,-num)
}

Number.prototype.isEven = function (num) {
  return this % 2 == 0
}
