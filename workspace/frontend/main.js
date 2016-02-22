define([
    'underscore',
    'Window',
    'GlobalConsts',
    'MathUtils'
],
function(_, Window, GlobalConsts, MathUtils) {
    'use strict';

    var bushVariationsCount = GlobalConsts.Sprites.BushVariationsCount,
        grid = GlobalConsts.Game.Grid,
        game, background, bushes, grass;

    var gameParams = {
        preload: function() {
            var imagesPath = GlobalConsts.Paths.Images;
                bushVariationsCount = GlobalConsts.Sprites.BushVariationsCount;
            for (var i = 0; i < bushVariationsCount; i++) {
                game.load.image('bush' + i, imagesPath + 'bush' + i + '.png');
            }
            game.load.image('grass', imagesPath + 'grass.png');
        },
        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            // make background
            grass = game.add.tileSprite(0, 0, game.width, game.height, 'grass');
            
            // make border
            for(var i = 0; i < grid.Width; i++) {
                var bushTypeIndex = MathUtils.randomInt(0, 3);
                game.add.sprite(i * 32, 0, 'bush' + bushTypeIndex);
                game.add.sprite(i * 32, game.width - 32, 'bush' + bushTypeIndex);
            }
            for(var i = 1; i < grid.Height - 1; i++) {
                var bushTypeIndex = MathUtils.randomInt(0, 3);
                game.add.sprite(0, i * 32, 'bush' + bushTypeIndex);
                game.add.sprite(game.height - 32, i * 32, 'bush' + bushTypeIndex);
            }
            
            bushes = game.add.group();
            //bushes.enableBody = true;
        },
        update: function() {
        
        }
       
    }

    game = new Phaser.Game(GlobalConsts.Game.Width, 
                            GlobalConsts.Game.Height, 
                            Phaser.AUTO, '', gameParams);
});