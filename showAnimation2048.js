function showNumberWithAnimation(i, j, number) {
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css({
        'backgroundColor':getNumberBackgroundColor(number),
        'color':getNumberColor(number),
    }).text(number);
    numberCell.animate({
        height: '100px',
        width: '100px',
        top: getPosTop(i,j),
        left: getPosLeft(i,j),
    },50);

}

function showMoveAnimation(fromX, fromY, toX, toY){
    var from = $('#number-cell-'+fromX+'-'+fromY);
   from.animate({
       left: getPosLeft(toX, toY),
       top: getPosTop(toX, toY),
   }, 200);

}