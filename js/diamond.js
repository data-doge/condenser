function Diamond (text) {
  this.text = text
  this.size = this.getSize()
  this.$el = $('.diamond')
  this.padText()
  this.construct()
}

Diamond.prototype.construct = function () {
  var self = this
  _.each(this.getTextRows(), function (textRow) {
    var $textRowDiv = $('<div></div>').text(textRow)
    self.$el.append($textRowDiv)
  })
  this.updateHighlightedText()
}

Diamond.prototype.padText = function () {
  var rowWidths = this.rowWidths()
  var totalCharsNeeded = _.sum(rowWidths)
  var textLength = this.text.length
  var padding = totalCharsNeeded - textLength - 2
  if (padding > 0) {
    this.text += ' ' + '-'.repeat(padding) + ' '
  }
}

Diamond.prototype.centerRowIndex = function () {
  return Math.floor(this.size / 2) - 1
}

Diamond.prototype.getTextRows = function () {
  var textRows = new Array(this.size)
  var rowWidths = this.rowWidths()
  var text = this.text
  for (var i = 0, r = this.centerRowIndex(); i < this.size; i++) {
    r === this.size - 1 ? r = 0 : r++
    rowChars = text.slice(0, rowWidths[r])
    text = text.slice(rowWidths[r])
    textRows[r] = rowChars
  }
  return textRows
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
  if (size.isEven()) { size++ }
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

Diamond.prototype.updateRows = function () {
  var self = this
  this.text = this.text.rotate()
  var textRows = this.getTextRows()
  _.each(this.$el.children(), function (textRowDiv, i) {
    var $textRowDiv = $(textRowDiv)
    var text = textRows[i] === ' ' ? '&nbsp;' : textRows[i]
    $textRowDiv.html(text)
  })
}

Diamond.prototype.updateHighlightedText = function () {
  var text = $(this.$el.children()[this.centerRowIndex() + 1]).text()
  if (text.slice(-1) === ' ') { text = text.slice(0, -1) + '&nbsp;' }
  if (text[0] === ' ') { text = '&nbsp;' + text.slice(1) }
  $('.highlighted-text').html(text)
}

Diamond.prototype.scrollText = function () {
  var self = this;
  var scrollingInterval = setInterval(function () {
    self.updateRows()
    self.updateHighlightedText()
  }, 70)
}
