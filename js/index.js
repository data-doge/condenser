$(document).ready(function () {

  String.prototype.repeat = function (num) {
    return new Array(num + 1).join(this)
  }

  var cell = '+ '
  var $diamond = $('.diamond')
  var rowLengths = [1,3,5,7,9,11,13,11,9,7,5,3,1]

  _.each(rowLengths, function (rowLength) {
    var $row = $('<div></div>').text(cell.repeat(rowLength))
    $diamond.append($row)
  })

})
