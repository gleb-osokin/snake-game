define([],
function() {
   var consts = {
        Game: {
            Width: 800,
            Height: 800,
            InitialPlayerSpeed: 1 // move per second
        },
        Paths: {
            Images: 'images/'
        },
        Sprites: {
            BushVariationsCount: 4
        },
        Objects: {
            Turn: {
                Left: 4,
                Right: 2
            },
            Direction: {
                Up: 0,
                Right: 1,
                Down: 2,
                Left: 3
            },
            SnakeSegment: {
                Body: 0,
                Head: 1,
                TurnRight: 2,
                Tail: 3,
                TurnLeft: 4
            }
        }
    };
   
    consts.Game.Grid = {
        Side: 32
    };

    consts.Game.Grid.Width = consts.Game.Width / consts.Game.Grid.Side;
    consts.Game.Grid.Height = consts.Game.Height / consts.Game.Grid.Side;
   
    return consts;
});