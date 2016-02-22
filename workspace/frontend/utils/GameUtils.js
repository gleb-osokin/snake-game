define([
    'GlobalConsts'
],
function(GlobalConsts) {
    'use strict';
   
    return {
        getCenterTile: function() {
            var grid = GlobalConsts.Game.Grid;
            return {
                x: (grid.Width - 1) * grid.Side / 2,
                y: (grid.Height - 1) * grid.Side / 2
            };
        },
        getRelativeTile: function(pos, xOffset, yOffset) {
            var grid = GlobalConsts.Game.Grid;
            return {
                x: pos.x + xOffset * grid.Side,
                y: pos.y + yOffset * grid.Side
            }
        },
        getNewDirection: function(currentDirection, turn) {
            return currentDirection == turn ||
                    currentDirection + 2 == turn ||
                    currentDirection - 2 == turn
                ? currentDirection
                : turn;
        },
        getTurnType: function(currentDirection, newDirection) {
            var turns = GlobalConsts.Objects.Turn,
                direction = GlobalConsts.Objects.Direction;
            switch(newDirection) {
                case (currentDirection + 1):
                    return turns.Right;
                case (currentDirection - 1):
                case direction.Left:
                    return turns.Left;
                case direction.Up:
                    return turns.Right;
            }
            return currentDirection === newDirection - 1
                ? turns.Right
                : currentDirection === newDirection + 1
                ? currentDirection != (newDirection + 1)
                    ? turns.Left
                    : turns.Right
                : turns.Right;
        }
    };
});