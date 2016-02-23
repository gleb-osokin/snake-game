/* global Phaser */

define([
    'underscore',
    'Window',
    'GlobalConsts',
    'MathUtils',
    'Snake',
    'Map'
],
function(_, 
        Window, 
        GlobalConsts, 
        MathUtils, 
        Snake,
        Map) {
    'use strict';

    var bushVariationsCount = GlobalConsts.Sprites.BushVariationsCount,
        initials = GlobalConsts.Game.Initials,
        grid = GlobalConsts.Game.Grid,
        game, map, stepTime, snake, cursors;
        
    var counter = {
            FoodSpawn: 0
        };

    var gameParams = {
        preload: function() {
            var imagesPath = GlobalConsts.Paths.Images;
            game.load.spritesheet('bushes', imagesPath + 'bushes.png', grid.Side, grid.Side, bushVariationsCount);
            game.load.image('grass', imagesPath + 'grass.png');
            game.load.spritesheet('snake', imagesPath + 'snake.png', grid.Side, grid.Side, 5);
            game.load.image('food', imagesPath + 'apple.png');
        },
        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            // make background
            game.add.tileSprite(0, 0, game.width, game.height, 'grass');
            
            var bushMaxIndex = bushVariationsCount - 1;
            // make border
            for(var i = 0; i < grid.Width; i++) {
                var leftSprite = game.add.sprite(i * grid.Side, 0, 'bushes'),
                    rightSprite = game.add.sprite(i * grid.Side, game.width - grid.Side, 'bushes');
                    
                leftSprite.frame = MathUtils.randomInt(0, bushMaxIndex);
                rightSprite.frame = MathUtils.randomInt(0, bushMaxIndex);
            }
            for(var i = 1; i < grid.Height - 1; i++) {
                var topSprite = game.add.sprite(0, i * grid.Side, 'bushes'),
                    bottomSprite = game.add.sprite(game.height - grid.Side, i * grid.Side, 'bushes');
                    
                topSprite.frame = MathUtils.randomInt(0, bushMaxIndex);
                bottomSprite.frame = MathUtils.randomInt(0, bushMaxIndex);
            }
            
            stepTime = game.time.now;
            map = new Map(game);
            snake = new Snake(game);
            
            map.add(snake);
            
            cursors = game.input.keyboard.createCursorKeys();
        },
        update: function() {
            var now = game.time.now,
                timeLimit = stepTime + initials.PlayerSpeed * 1000;
            if (now > timeLimit) {
                stepTime = now;
                makeStep();
            }
            handleKeys();
        }
    };
    
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
    
    function handleCounter() {
        if (counter.FoodSpawn === 0) {
            map.addFood();
            counter.FoodSpawn = GlobalConsts.Game.Initials.FoodSpawnRate;
        }
        counter.FoodSpawn--;
    }
    
    function makeStep() {
        snake.move();
        handleCounter();
        map.checkFood();
    }

    game = new Phaser.Game(GlobalConsts.Game.Width, 
                            GlobalConsts.Game.Height, 
                            Phaser.AUTO, '', gameParams);
});