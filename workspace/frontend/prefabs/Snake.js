define([
    'GlobalConsts',
    'GameUtils'
],
function(GlobalConsts, GameUtils) {

    function Segment(game, pos, type, direction, previousSegment) {
        this.pos = pos,
        this.type = type;
        this.direction = direction || GlobalConsts.Objects.Direction.Up;
        this.sprite = game.add.sprite(pos.x, pos.y, 'snake');
        this.sprite.anchor.setTo(.5,.5);
        this.previousSegment = previousSegment;
        this.updateFrame();
    }
    
    Segment.prototype.updateFrame = function() {
        var direction = GlobalConsts.Objects.Direction;
        this.sprite.frame = this.type;
        switch(this.direction) {
            case direction.Up:
                this.sprite.angle = 0;
                break;
            case direction.Down:
                this.sprite.angle = 180;
                break;
            case direction.Left:
                this.sprite.angle = -90;
                break;
            case direction.Right:
                this.sprite.angle = 90;
                break;
        }
    };
   
    function Snake(game) {
        if (!game) {
            throw new Error('game argument must be present') ;
        }
        var center = GameUtils.getCenterTile(),
            segmentTypes = GlobalConsts.Objects.SnakeSegment,
            head = new Segment(game, center, segmentTypes.Head),
            body = new Segment(game, GameUtils.getRelativeTile(head.pos, 0, 1),
                segmentTypes.Body, null, head),
            tail = new Segment(game, GameUtils.getRelativeTile(body.pos, 0, 1),
                segmentTypes.Tail, null, body);
                
        this.game = game;
        this.head = head;
        this.tail = tail;
        this.direction = GlobalConsts.Objects.Direction.Up;
    }

    Snake.prototype.turn = function(turn) {
        this.direction = GameUtils.getNewDirection(this.head.direction, turn);
    }

    Snake.prototype.move = function() {
        var direction = GlobalConsts.Objects.Direction,
            segmentTypes = GlobalConsts.Objects.SnakeSegment,
            xOffset = 0,
            yOffset = 0;
            
        switch(this.direction) {
            case direction.Up:
                yOffset = -1;
                break;
            case direction.Down:
                yOffset = 1;
                break;
            case direction.Left:
                xOffset = -1;
                break;
            case direction.Right:
                xOffset = 1;
                break;
        }
        
        var currentHead = this.head;
        currentHead.type = this.direction === currentHead.direction
            ? segmentTypes.Body
            : GameUtils.getTurnType(currentHead.direction, this.direction);
            
        currentHead.direction = this.direction;
        this.head = new Segment(this.game, 
            GameUtils.getRelativeTile(currentHead.pos, xOffset, yOffset),
            segmentTypes.Head, this.direction, null);
        currentHead.previousSegment = this.head;
            
        this.tail.previousSegment.type = this.tail.type;
        this.tail.sprite.destroy();
        this.tail = this.tail.previousSegment;

        this.head.updateFrame();
        currentHead.updateFrame();
        this.tail.updateFrame();
    };
   
    return Snake;
});