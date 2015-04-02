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



window.loop = function(y, n, board, solutionCount){

  if(y === n){
    solutionCount.count = solutionCount.count + 1;
    return;
  }

  for(var x = 0; x < n; x++){

    board.togglePiece(y,x);
    if(!board.hasAnyRooksConflicts()){

      loop(y+1,n,board,solutionCount);
    }
    board.togglePiece(y,x);
  }

};



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
      }
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

  return solution || undefined;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = {count:0}; //fixme

  var board = new Board({n: n});

  // var loop = function(y){

  //   if(y === n){
  //     solutionCount++;
  //     return;
  //   }

  //   for(var x = 0; x < n; x++){
  //     board.togglePiece(y,x);
  //     if(!board.hasAnyRooksConflicts()){
  //       loop(y+1);
  //     }
  //     board.togglePiece(y,x);
  //   }

  // };
  window.loop(0,n,board,solutionCount);

  return solutionCount.count;

};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

 var solution = undefined; //fixme

  var board = new Board({n: n});

  var loop = function(y){

    if(y === n){
      if (solution === undefined) {
        solution = [];
        for (var i = 0; i < n; i++) {
          solution.push(board.get(i).slice());
        }
      }
      return;
    }

    for(var x = 0; x < n; x++){

      board.togglePiece(y,x);
      if(!board.hasAnyQueensConflicts()){
        loop(y+1);
      }
      board.togglePiece(y,x);
    }

  };

  loop(0);
  console.log(n);
  console.log(solution);
  return solution || (new Board({n:n})).rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    var solutionCount = 0; //fixme

  var board = new Board({n: n});

  var loop = function(y){

    if(y === n){
      solutionCount++;
      return;
    }

    for(var x = 0; x < n; x++){
      board.togglePiece(y,x);
      if(!board.hasAnyQueensConflicts()){
        loop(y+1);
      }
      board.togglePiece(y,x);
    }

  };

  loop(0);

  return solutionCount;

};
