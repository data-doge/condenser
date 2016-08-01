import $ from 'jquery'
import each from 'lodash.foreach'
import random from 'lodash.random'
import sample from 'lodash.sample'
import sum from 'lodash.sum'

String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this)
}

String.prototype.rotate = function (num) {
  num = num || 1
  let firstChars = this.slice(0, num)
  return this.slice(num) + firstChars
}

Number.prototype.isEven = function (num) {
  return this % 2 == 0
}

class Diamond {
  constructor (text) {
    this.text = text
    this.size = this.getSize()
    this.$el = $('.diamond')
    this.padText()
    this.construct()
  }

  construct () {
    let self = this
    each(this.getTextRows(), function (textRow) {
      let $textRowDiv = $('<div></div>').text(textRow)
      self.$el.append($textRowDiv)
    })
    this.highlightText()
    this.updateHighlightedText()
  }

  padText () {
    let rowWidths = this.rowWidths()
    let totalCharsNeeded = sum(rowWidths)
    let textLength = this.text.length
    let padding = totalCharsNeeded - textLength - 2
    if (padding > 0) { this.text += ' ' + '.'.repeat(padding) + ' ' }
  }

  centerRowIndex () {
    return Math.floor(this.size / 2) - 1
  }

  getTextRows () {
    let textRows = new Array(this.size)
    let rowWidths = this.rowWidths()
    let text = this.text
    for (let i = 0, r = this.centerRowIndex(); i < this.size; i++) {
      r === this.size - 1 ? r = 0 : r++
      let rowChars = text.slice(0, rowWidths[r])
      text = text.slice(rowWidths[r])
      textRows[r] = rowChars
    }
    return textRows
  }

  rowWidths () {
    let rowWidths = [this.size]
    for (let i = this.size - 2; i > 0; i -= 2) {
      rowWidths.push(i)
      rowWidths.unshift(i)
    }
    return rowWidths
  }

  getSize () {
    let size = Math.sqrt(2 * this.text.length)
    size =  Math.floor(size)
    if (size.isEven()) { size++ }
    return size
  }

  updateRows () {
    let self = this
    this.text = this.text.rotate()
    let textRows = this.getTextRows()
    each(this.$el.children(), function (textRowDiv, i) {
      let $textRowDiv = $(textRowDiv)
      let text = textRows[i] === ' ' ? '&nbsp;' : textRows[i]
      $textRowDiv.html(text)
    })
  }

  highlightText () {
    $(this.$el.children()[this.centerRowIndex() + 1]).addClass('middle')
  }

  updateHighlightedText () {
    let text = $('.middle').text()
    if (text.slice(-1) === ' ') { text = text.slice(0, -1) + '&nbsp;' }
    if (text[0] === ' ') { text = '&nbsp;' + text.slice(1) }
    $('.highlighted-text').html(text)
  }

  scrollText (ms) {
    let self = this;
    let scrollingInterval = setInterval(function () {
      self.updateRows()
      self.updateHighlightedText()
    }, ms)
  }

  pivot (ms) {
    let self = this, degrees = 0, clockwise = true
    let pivotingInterval = setInterval(function () {
      self.$el.css('transform', 'rotateY(' + degrees + 'deg)')
      clockwise ? degrees++ : degrees--
      if (Math.abs(degrees) > 60) {
        clockwise = !clockwise
      }
    }, ms)
  }

  breathe (ms) {
    let self = this, wordSpacing = 0, growing = true
    let breatheInterval = setInterval(function () {
      self.$el.css('word-spacing', wordSpacing)
      growing ? wordSpacing++ : wordSpacing--
      if (wordSpacing > 30 || wordSpacing <= 0) { growing = !growing }
    }, ms)
  }
}

export default Diamond
