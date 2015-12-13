String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this)
}

Number.prototype.isEven = function (num) {
  return this % 2 == 0
}
