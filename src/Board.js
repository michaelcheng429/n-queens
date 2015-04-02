// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        //console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        //console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        //console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
      this.n = this.get('n');
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //HI DO YOU SEE THIS
    // test if a specific row on this board contains a conflict
    getSquareValue: function(y,x){
      return this.get(y)[x];
    },
    countCurrentPieces: function(){
      var count = 0;
      for(var i = 0; i < this.n; i++){
        for(var j = 0; j < this.get(i).length; j++){
          count += this.get(i)[j];
        }
      }
      return count;
    },
    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    _arrHas2Queens: function(arr){
      var count = 0;
     for(var i = 0; i < arr.length; i++){
      count+=arr[i];
      if(count > 1){
        return true;
      }
     }
     return false;
    },

    hasRowConflictAt: function(rowIndex) {
      return this._arrHas2Queens(this.get(rowIndex));
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      for(var i = 0; i < this.n; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    _getColumnArr: function(colIndex){
      var column = [];
      for(var i = 0; i < this.n; i++){
        var row = this.get(i);
        column.push(row[colIndex]);
      }

      return column;
    },
    hasColConflictAt: function(colIndex) {

      return this._arrHas2Queens(this._getColumnArr(colIndex));
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for(var i = 0; i < this.n; i++){
        if(this.hasColConflictAt(i) === true ){
          return true;
        }
      }
      return false;
    },

    _getMajorArr: function(xAty0){
      var diag = [];
      var count = xAty0;
      for(var i = 0; i < this.n; i++){
        diag.push(this.get(i)[count]);
        if(count < this.n - 1){
          count++;
        }else{
          break;
        }
      }

      return diag;
    },
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(xAty0) {
      return this._arrHas2Queens(this._getMajorArr(xAty0));
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for(var i = 0; i < this.n; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },


    _getMinorArr: function(xAty0){
      var diag = [];
      var count = xAty0;
      for(var i = 0; i < this.n; i++){
        diag.push(this.get(i)[count]);
        if(count > 0){
          count--;
        }else{
          break;
        }
      }
      return diag;
    },
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(xAty0) {
      return this._arrHas2Queens(this._getMinorArr(xAty0));
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

       for(var i = 0; i < this.n; i++){
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
