function Diamond (text) {
  this.text = text
  this.size = this.getSize()
  this.$el = $('.diamond')
  this.canvas = document.getElementById('canvas')
  this.setupCanvas()
  this.padText()
  this.construct()
}

Diamond.prototype.setupCanvas = function () {
  var $body = $('body'), width = $body.width(), height = $body.height()
  $(this.canvas).attr('width', width)
  $(this.canvas).attr('height', height)
  var ctx = this.canvas.getContext('2d')
  ctx.strokeStyle = 'white'
  ctx.lineWidth = '5'
  ctx.lineCap = 'round'
}

Diamond.prototype.construct = function () {
  var self = this
  _.each(this.getTextRows(), function (textRow) {
    var $textRowDiv = $('<div></div>').text(textRow)
    self.$el.append($textRowDiv)
  })
  this.highlightText()
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

Diamond.prototype.highlightText = function () {
  $(this.$el.children()[this.centerRowIndex() + 1]).addClass('middle')
}

Diamond.prototype.updateHighlightedText = function () {
  var text = $('.middle').text()
  if (text.slice(-1) === ' ') { text = text.slice(0, -1) + '&nbsp;' }
  if (text[0] === ' ') { text = '&nbsp;' + text.slice(1) }
  $('.highlighted-text').html(text)
}

Diamond.prototype.scrollText = function (ms) {
  var self = this;
  var scrollingInterval = setInterval(function () {
    self.updateRows()
    self.updateHighlightedText()
  }, ms)
}

Diamond.prototype.pivot = function (ms) {
  var self = this, degrees = 0, clockwise = true
   var pivotingInterval = setInterval(function () {
    self.$el.css('transform', 'rotateY(' + degrees + 'deg)')
    clockwise ? degrees++ : degrees--
    if (Math.abs(degrees) > 60) {
      clockwise = !clockwise
      self.flicker()
    }
  }, ms)
}

Diamond.prototype.flicker = function () {
  $('body').css({ background: 'white', color: 'black' })
  setTimeout(function () {
    $('body').css({ background: 'black', color: 'white' })
  }, 50)
}

Diamond.prototype.breathe = function (ms) {
  var self = this, wordSpacing = 0, growing = true
   var breatheInterval = setInterval(function () {
    self.$el.css('word-spacing', wordSpacing)
    growing ? wordSpacing++ : wordSpacing--
    if (wordSpacing > 30 || wordSpacing <= 0) { growing = !growing }
  }, ms)
}

Diamond.prototype.punctuationDetected = function () {
  var text = $('.middle').text()
  return !!text.slice(-1).match(/[.,-\/#!$%\^&\*;:{}=\-_`~()\[\]\?\'\"]/g)
}

Diamond.prototype.spawnVector = function () {
  var $canvas = $(this.canvas), width = $canvas.width(), height = $canvas.height()
  var ctx = this.canvas.getContext('2d')
  var x1, y1, x2, y2;

  ctx.clearRect(0, 0, width, height)

  x1 = _.sample([_.random(width), 0])
  y1 = x1 === 0 ? _.random(height) : 0

  if (x1 > 0 && y1 === 0) {
    y2 = _.sample([_.random(height), height])
    x2 = y2 === height ? _.random(width) : _.sample([0, width])
  }
  if (y1 > 0 && x1 === 0) {
    x2 = _.sample([_.random(width), width])
    y2 = x2 === width ? _.random(height) : _.sample([0, height])
  }

  ctx.beginPath()
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.stroke()
}
