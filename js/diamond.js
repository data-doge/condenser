function Diamond (text) {
  this.text = text
  this.size = this.getSize()
  this.$textRows = this.getTextRows()
  this.$el = $('.diamond')
}

Diamond.prototype.construct = function () {
  var self = this
  _.each(this.$textRows, function ($textRow) {
    self.$el.append($textRow)
  })
}

Diamond.prototype.centerRowIndex = function () {
  return Math.floor(this.size / 2) - 1
}

// TODO: refactor this
Diamond.prototype.getTextRows = function () {
  var $textRows = new Array(this.size)
  var rowWidths = this.rowWidths()
  var r = this.centerRowIndex()
  for (var i = 0; i < this.size; i++) {
    r === this.size - 1 ? r = 0 : r++
    var rowWidth = rowWidths[r]
    var rowChars = this.text.slice(0, rowWidth)
    this.text = this.text.slice(rowWidth)
    if (rowChars.length !== rowWidth) {
      rowChars += ' ' + '-'.repeat(rowWidth - rowChars.length - 2) + ' '
    }
    $textRows[r] = $('<div></div>').text(rowChars)
  }
  return $textRows
}

Diamond.prototype.rowWidths = function () {
  var rowWidths = [this.size]
  for (var i = this.size - 2; i > 0; i -= 2) {
    rowWidths.push(i)
    rowWidths.unshift(i)
  }
  return rowWidths
}

Diamond.prototype.getSize = function () {
  var size = Math.sqrt(2 * this.text.length)
  size =  Math.floor(size)
  if (size.isEven) { size++ }
  return size
}

Diamond.prototype.pulseExpand = function () {
  var self = this, wordSpacing = 1, pulseDir = 'out';
  var pulseInterval = setInterval(function () {
    pulseDir === 'out' ? wordSpacing++ : wordSpacing--
    self.$el.css('word-spacing', wordSpacing)
    if (wordSpacing === 0) { clearInterval(pulseInterval) }
    if (wordSpacing > 50) { pulseDir = 'in' }
  }, 1)
}
