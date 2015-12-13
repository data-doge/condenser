function Diamond (text) {
  this.text = text
  this.$el = $('.diamond')
}

Diamond.prototype.construct = function () {
  var self = this;
  _.each(this.rowWidths(), function (rowWidth) {
    var cell = '+'
    var $row = $('<div></div>').text(cell.repeat(rowWidth))
    self.$el.append($row)
  })
};

Diamond.prototype.rowWidths = function () {
  var centerRowWidth = this.centerRowWidth()
  var rowWidths = [centerRowWidth]
  for (var i = centerRowWidth - 2; i > 0; i -= 2) {
    rowWidths.push(i)
    rowWidths.unshift(i)
  }
  return rowWidths
}

Diamond.prototype.centerRowWidth = function () {
  var width = Math.sqrt(2 * this.text.length)
  width =  Math.floor(width)
  if (width.isEven) { width++ }
  return width
}
