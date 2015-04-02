/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other




window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  var board = new Board({n:n});
  var counter = 0;

  var loop = function(){

  }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  /*
  var board = new Board({n:n});
  var count = 0;
  var solver = function() {
    for (var x = 0; x < n; x++) {
      for (var y = 0; y < n; y++) {
        if (board.getSquareValue(y, x) === 0) {
          board.togglePiece(y, x);
        }
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(y, x);
        }
      }
    }
  }

  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      board.togglePiece(y, x);
      solver();
      if (!board.hasAnyRooksConflicts() && board.countCurrentPieces() === n) {
        console.log(JSON.stringify(board.rows()))
        count++;
      }
      board = new Board({n:n});
    }
  }
  */


// For 2x2
 //toggle top left piece
  // No conflicts, so do recursion for second row
  // New for loop for second row
  // Toggle bottom left
  // Conflict, so remove piece
  // Toggle bottom right
  // No conflict, so increment row count in recursive function
  // Row count now equals this.n (n), so solution count is incremented
  // return to break out of if statement at top
  // bottom right piece is removed
  // top left piece is removed
  // Continue to top right spot
  // No conflict, so recursion for second row
  // Place bottom left spot
  // No conflict, so recursion for third row
  // row count equals this.n, so solution count is incremented
  // return to for loop
  // bottom left spot is removed
  // place bottom right piece
  // Conflict, so piece is removed
  // Top right piece is removed
  // End of for loop
  // return solution count, which is 2

  var board = new Board({n: n});

  var loop = function(y){

    if(y === n){
      solutionCount++;
      return;
    }

    for(var x = 0; x < n; x++){
      board.togglePiece(y,x);
      if(!board.hasAnyRooksConflicts()){
        loop(y+1);
      }
      board.togglePiece(y,x);
    }

  }

  loop(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount
};

var rockPaperScissors = function (/* START SOLUTION */rounds/* END SOLUTION */) {
  // TODO: your solution here
  /* START SOLUTION */
    rounds = rounds || 3;
    var outcomes = [];

    var plays = ['rock', 'paper', 'scissors'];

    var combos = function(roundsToGo, playedSoFar) {
      if( roundsToGo === 0 ){
        outcomes.push( playedSoFar );
        return;
      }

      for( var i = 0; i < plays.length; i++ ){
        var currentPlay = plays[i];
        combos( roundsToGo-1, playedSoFar.concat(currentPlay) );
      }
    };
    combos( rounds, [] );

    return outcomes;
  /* END SOLUTION */
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
