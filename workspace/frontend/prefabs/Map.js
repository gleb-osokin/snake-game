define([
    'underscore',
    'GameUtils',
    'Food'
],
function(_, GameUtils, Food) {
    
    function Map(game) {
        if (!game) {
            throw new Error('game argument must be present') ;
        }
        this.game = game;
        this.objects = [];
        this.food = [];
    }
    
    Map.prototype.add = function(gameObj) {
        this.objects.push(gameObj);
    };
    
    Map.prototype.addFood = function() {
        var food = new Food(this.game);
        this.objects.push(food);
        this.food.push(food);
    };
    
    Map.prototype.remove = function(gameObj) {
        var index = this.objects.indexOf(gameObj);
        if (index >= 0) {
            this.objects.splice(index, 1);
        }
    };
    
    Map.prototype.isTileOccupied = function(xOffset, yOffset) {
        for(var i = 0, len = this.objects.length; i < len; i++) {
            return GameUtils.isTileOccupied(this.objects[i], xOffset, yOffset);
        }
        return false;
    };
    
    Map.prototype.checkFood = function() {
        for (var i = 0, len = this.food.length; i < len; i++) {
            var food = this.food[i];
            food.spendTime();
        }
        this.food = _.filter(this.food, function(value) {
           return !this.isDestroyed;
        });
    };
    
    return Map;
});