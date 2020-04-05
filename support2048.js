function getPosTop(i,j) {
    return 20+i*120;
}

function getPosLeft(i,j) {
    return 20+j*120;
}

function getNumberBackgroundColor(number) {
    switch(number){
        case 2: return "#eee4da"; 
        case 4: return "#ede0c8"; 
        case 8: return "#f2b179"; 
        case 16: return "#f59563"; 
        case 32: return "#f67c5f"; 
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#9c0";
        case 1024: return "#33b5e5";
        case 2048: return "#09c";
        case 4096: return "#a6c";
        case 8192: return "#93c";
    }
}

function getNumberColor(number){
    if (number <= 4) return '#776e65';
    else return 'white';
}

function noSpace(board){
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            if (board[i][j]==0)
                return false;
        }
    return true;
}

function noMove(board){
    if (canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board))
        return false;
    return true;
}

function canMoveLeft(board) {
    for (let i=0;i<4;i++)
        for (let j=1;j<4;j++){
            if (board[i][j]!=0){
                if (board[i][j-1]==0 || board[i][j-1]==board[i][j])
                    return true;}
        }
    return false;
}

function canMoveRight(board) {
    for (let i=0;i<4;i++)
        for (let j=0;j<3;j++){
            if (board[i][j]!=0){
                if (board[i][j+1]==0 || board[i][j+1]==board[i][j])
                    return true;}
        }
    return false;
}

function canMoveUp(board) {
    for (let i=1;i<4;i++)
        for (let j=0;j<4;j++){
            if (board[i][j]!=0){
                if (board[i-1][j]==0 || board[i-1][j]==board[i][j])
                    return true;}
        }
    return false;
}

function canMoveDown(board) {
    for (let i=0;i<3;i++)
        for (let j=0;j<4;j++){
            if (board[i][j]!=0){
                if (board[i+1][j]==0 || board[i+1][j]==board[i][j])
                    return true;}
        }
    return false;
}

function noBlockHorizontal(row, col1, col2, board){
    for (let i = col1 + 1; i < col2; i++){
        if (board[row][i]!=0)
            return false;
    }
    return true;
}

function noBlockVertical(col, row1, row2, board){
    for (let i = row1 + 1; i < row2; i++){
        if (board[i][col]!=0)
            return false;
    }
    return true;
}

function moveLeft() {
    if (!canMoveLeft(board)) return false;
    // moveLeft
    for (let i=0;i<4;i++)
        for (let j=1;j<4;j++){
            if (board[i][j]!=0){
                for (let k=0;k<j;k++){
                    if (board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i, j, i ,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflict[i][k]){
                        //move
                        showMoveAnimation(i, j, i ,k);

                        //add
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        hasConflict[i][k] = true;

                        //add score
                        score += board[i][k];

                        continue;
                    }
                }
            }
        }

    setTimeout(updateBoardView, 200);
    return true;
}

function moveRight(){
    if (!canMoveRight(board)) return false;
    //moveRight

    for (let i=0;i<4;i++)
        for(let j=2;j>=0;j--){
            if (board[i][j]!=0){
                for (let k=3;k>j;k--){

                    if (board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflict[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout(updateBoardView, 200);
    return true;
}


function moveUp(){
    if (!canMoveUp(board)) return false;

    //moveUp
    for (let j = 0; j < 4; j++){
        for (let i=1;i<4;i++){
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {

                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflict[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveDown(){
    if (!canMoveDown(board)) return false;
    //moveDown

    for (let j = 0; j < 4; j++) {
        for (let i=2;i>=0;i--){
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {

                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflict[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        hasConflict[k][j] =true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}