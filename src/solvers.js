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

  var board = new Board({n: n});

  var loop = function(y){

    if(y === n){
      if (solution === undefined) {
        solution = [];
        for (var i = 0; i < n; i++) {
          solution.push(board.get(i).slice());
        }
        console.log(solution);
      }
      return;
    }

    for(var x = 0; x < n; x++){
      // if (solution !== undefined) {
      //   return;
      // }
      board.togglePiece(y,x);
      if(!board.hasAnyRooksConflicts()){
        loop(y+1);
      }
      board.togglePiece(y,x);
    }

  };

  loop(0);

  return solution || undefined;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

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

  };

  loop(0);

  return solutionCount;

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
