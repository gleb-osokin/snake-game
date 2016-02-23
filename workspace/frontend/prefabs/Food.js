define([
    'GameUtils',
    'MathUtils',
    'GlobalConsts'
],
function(GameUtils, MathUtils, GlobalConsts) {
    
    function Food(game) {
        if (!game) {
            throw new Error('game argument must be present') ;
        }
        this.game = game;
        this.pos = GameUtils.tileToPos(this.getRandomTile());
        this.sprite = game.add.sprite(this.pos.x, this.pos.y, 'food');
        this.lifespan = GlobalConsts.Game.Initials.FoodLifeSpan;
        this.isDestroyed = false;
    }
    
    Food.prototype.getRandomTile = function() {
        var grid = GlobalConsts.Game.Grid;
        return {
            x: MathUtils.randomInt(1, grid.Width - 2),
            y: MathUtils.randomInt(1, grid.Height - 2)
        };
    };
    
    Food.prototype.spendTime = function() {
      this.lifespan--;
      if (this.lifespan === 0) {
          this.sprite.destroy();
          this.isDestroyed = true;
      }
    };
    
    return Food;
});