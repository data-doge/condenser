$(document).ready(function () {

  var cell = '+ '
  var $diamond = $('.diamond')

  function widthOfDiamondWithArea (area) {
    var diagLength = Math.sqrt(2 * area);
    diagLength =  Math.floor(diagLength);
    if (diagLength.isEven) { diagLength++ }
    return diagLength;
  }

  var diagLength = widthOfDiamondWithArea(500)
  var rowLengths = [diagLength]

  for (var i = diagLength - 2; i > 0; i -= 2) {
    rowLengths.push(i)
    rowLengths.unshift(i)
  }

  _.each(rowLengths, function (rowLength) {
    var $row = $('<div></div>').text(cell.repeat(rowLength))
    $diamond.append($row)
  })

})
