
let player_turn;  // holds which player is playing (X,O)
let game_array;   // holds the main tictactoe array
let timesPlayed;  // holds number of chances played in current game

function init(){
    //initializing every variable
    let grids=document.getElementsByClassName("grid");
    for(let i=0;i<grids.length;i++)
        grids[i].innerText=' '; 

    document.getElementById("turn").innerText=`O's turn`
    document.getElementsByClassName("Overlay")[0].style.display="none";

    player_turn=0; // 0:O turns ; 1:X turns
    game_array=[['*','*','*'],['*','*','*'],['*','*','*']];
    timesPlayed=0;   //game tie if timesPlayed reached 9
}

function set_array(i,j,turn){
    game_array[i][j]=turn;
}

function check([fi,fj],[si,sj],[ti,tj]){
    if(game_array[fi][fj]==='*') return false;

    return game_array[fi][fj]===game_array[si][sj] && game_array[fi][fj]===game_array[ti][tj] ;
}
function didAnyoneWon(){
    if(check([0,0],[0,1],[0,2])) return game_array[0][0]; //First Row
    if(check([1,0],[1,1],[1,2])) return game_array[1][0]; //Second Row
    if(check([2,0],[2,1],[2,2])) return game_array[2][0]; //Third Row

    if(check([0,0],[1,0],[2,0])) return game_array[0][0]; //First Column
    if(check([0,1],[1,1],[2,1])) return game_array[0][1]; //Second Column
    if(check([0,2],[1,2],[2,2])) return game_array[0][2]; //Third Column

    if(check([0,0],[1,1],[2,2])) return game_array[0][0]; //Left Diagonal
    if(check([0,2],[1,1],[2,0])) return game_array[0][2]; //Right Diagonal

    return "*";
}

function gameEnd(endText){
    /*
    1. Display the overlay
    2. Display the message
    */
    document.getElementsByClassName("Overlay")[0].style.display="flex";
    document.getElementsByClassName("alert")[0].innerText=endText;
}

function clicked(id){
    current=document.getElementById(id); //Get the grid that was clicked

    if(current.innerText!==' '){        //if already marked then throw error and return
        alert("This place is already selected");
        return;
    }

    current.innerText=player_turn===0?'O':'X'; //Mark on the actual ticktactoe

    set_array(parseInt(id/3),parseInt(id%3),player_turn); //set the game_array
    
    let won=didAnyoneWon(); //check if anyone won
    
    if(won!=="*"){ //if Someone has won then end the game
        gameEnd(`Player ${won===0?'O':'X'} Won!`);
        return;
    }
 
    //alternate players turns and increase time Played
    player_turn=1-player_turn;
    document.getElementById("turn").innerText=`${player_turn===0?'O':'X'}'s turn`
    timesPlayed++;

    if(timesPlayed===9){ //if Both  player have tied then end the game
        gameEnd(`Both players have tied`);
    }
}

init();