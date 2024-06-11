

 var player1 = "P1"; 
var player2 = "P2";
var currPlayer = player1; 

var gameOver = false; 
var board; 

var rows = 6; 
var columns = 7; 
var currColumns = []; 

function setGame() { 
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]; 

    for (let r = 0; r < rows; r++) { 
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //kliknes na policko a JS zisti suradnice tohto policka
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    //potom prepocita ze vo vzduchu nemoze byt a presunie ho dole podla currColumns = [5, 5, 5, 5, 5, 5, 5];
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' ' inak povedane ak neni policko prazdne
        return;
    }
    // velmi jednoducho policko na ktore si klikol a ktore sa potom posunulo dole podla currColumns = [5, 5, 5, 5, 5, 5, 5]; tak ho zaplni farbou
    // tiez tu chcem vytvorit skiny
    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == player1) {
        tile.classList.add("red-piece");
        currPlayer = player2;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = player1;
    }

    r -= 1; 
    currColumns[c] = r; //v currColumns = [5, 5, 5, 5, 5, 5, 5]; sa odcita o jedno policko napr currColumns = [5, 4, 5, 5, 5, 5, 5];

    checkWinner();
}
//toto je funkcia kde po kazdom tahu skontroluje ci niekto vyhral
//je to znova na dlhsie rozpravanie takze napis ak to moc chces vediet 
function checkWinner() {
     // horizontal (sliding window algorithm)
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical (sliding window algorithm)
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal (sliding window algorithm)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal (sliding window algorithm)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}
//funkcia ktora oznami vyhercu jednoducho
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == player1) {
        winner.innerText = "Player1 Wins";             
    } else {
        winner.innerText = "Player2 Wins";
    }
    gameOver = true;
    over();
}
