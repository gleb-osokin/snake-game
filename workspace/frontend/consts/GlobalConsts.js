define([],
function() {
   var consts = {
        Game: {
            Width: 800,
            Height: 800,
            TileWidth: 32
        },
        Paths: {
            Images: 'images/'
        },
        Sprites: {
            BushVariationsCount: 4
        }
   };
   
   consts.Game.Grid = {
        Width: consts.Game.Width / consts.Game.TileWidth,
        Height: consts.Game.Height / consts.Game.TileWidth
   }
   
   return consts;
});