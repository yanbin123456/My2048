var board = new Array();
var score = 0;
var hasConflict = new Array();

$(document).ready(function () {
    newGame();
});


function newGame(){
    //初始化棋盘格
    init();

    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            var gridCell = $('#grid-cell-'+i+'-'+j);
            gridCell.css('top', getPosTop(i,j));
            gridCell.css('left', getPosLeft(i,j));
        }
    for (let i=0;i<4;i++){
        board[i] = new Array();
        hasConflict[i] = new Array();
        for (let j=0;j<4;j++) {
            board[i][j] = 0;
            hasConflict[i][j] = false;
        }
    }
    updateBoardView();
    score = 0 ;

}
function updateBoardView(){
    $('.number-cell').remove();
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            var numberCellId = "number-cell-" +i+'-'+j;
            $('#grid-container').append('<div class="number-cell" id='+numberCellId+'></div>');
            var theNumberCell = $("#"+numberCellId);
            if (board[i][j]===0){
                theNumberCell.css('height','0');
                theNumberCell.css('width','0');
                theNumberCell.css('top', getPosTop(i,j)+50);
                theNumberCell.css('left', getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css('height','100px');
                theNumberCell.css('width','100px');
                theNumberCell.css('left', getPosLeft(i,j));
                theNumberCell.css('top', getPosTop(i,j));
                theNumberCell.css('backgroundColor',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflict[i][j] = false;
        }

    //update score
    $('#score').text(score);

}

function generateOneNumber() {
    if (noSpace(board))
        return false;

    //随机一个位置
    var randX = parseInt( Math.floor( Math.random()  * 4 ) );
    var randY = parseInt( Math.floor( Math.random()  * 4 ) );

    while (true){
        if (board[randX][randY]==0)
            break;
        else{
            randX = Math.floor(Math.random()*4);
            randY = Math.floor(Math.random()*4);
        }
    }
    //随机一个数字
    var num = Math.random() < 0.5? 2 : 4;

    //显示
    board[randX][randY] = num;
    //updateBoardView();
    showNumberWithAnimation(randX, randY, num);
    return true;
}

$(document).keydown(function (event) {
    switch(event.keyCode){
        case 37: //left
            if (moveLeft()){
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameover, 300);
            }
            break;
        case 38: //up
            if (moveUp()){
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameover, 300);
            }
            break;
        case 39: //right
            if (moveRight()){
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameover, 300);
            }
            break;
        case 40: //down
            if (moveDown()){
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameover, 300);
            }
            break;
        default:
            break;
    }
});

function isGameover(){
    if ( noSpace(board) && noMove(board))
        gameover();
}

function gameover(){
    alert('gameover!');
}





