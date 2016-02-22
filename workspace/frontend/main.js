define([
    'underscore',
    'Window',
    'GlobalConsts',
    'MathUtils',
    'Snake'
],
function(_, 
        Window, 
        GlobalConsts, 
        MathUtils, 
        Snake) {
    'use strict';

    var bushVariationsCount = GlobalConsts.Sprites.BushVariationsCount,
        grid = GlobalConsts.Game.Grid,
        game, background, bushes, grass, stepTime, snake, cursors;

    var gameParams = {
        preload: function() {
            var imagesPath = GlobalConsts.Paths.Images;
                bushVariationsCount = GlobalConsts.Sprites.BushVariationsCount;
            for (var i = 0; i < bushVariationsCount; i++) {
                game.load.image('bush' + i, imagesPath + 'bush' + i + '.png');
            }
            game.load.image('grass', imagesPath + 'grass.png');
            game.load.spritesheet('snake', imagesPath + 'snake.png', grid.Side, grid.Side, 5);
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
            
            stepTime = game.time.now;
            snake = new Snake(game);
            
            cursors = game.input.keyboard.createCursorKeys();
        },
        update: function() {
            var now = game.time.now,
                timeLimit = stepTime + GlobalConsts.Game.InitialPlayerSpeed * 1000;
            if (now > timeLimit) {
                stepTime = now;
                makeStep();
            }
            handleKeys();
        }
       
    }
    
    function handleKeys() {
        var direction = GlobalConsts.Objects.Direction;
        if (cursors.left.isDown) {
            snake.turn(direction.Left);
        } else if (cursors.right.isDown) {
            snake.turn(direction.Right);
        } else if (cursors.up.isDown) {
            snake.turn(direction.Up);
        } else if (cursors.down.isDown) {
            snake.turn(direction.Down);
        }
    }
    
    function makeStep() {
        snake.move();
    }

    game = new Phaser.Game(GlobalConsts.Game.Width, 
                            GlobalConsts.Game.Height, 
                            Phaser.AUTO, '', gameParams);
});