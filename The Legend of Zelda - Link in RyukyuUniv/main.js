enchant()
var map, lib_pk1

var GameImages = ['Base_Tile_1.png','Link.png','Road_Library.png','kadan(1)_L2.png','wood_1.png']
window.onload = function() {
    var game = new Game(600, 600)
    game.fps = 35
    // game.preload('Base_Tile_1.png','Link.png','Road_Library.png','kadan(1)_L2.png','wood_1.png');
    game.preload(GameImages);

    var Player = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 32, 44)
            this.x = x
            this.y = y
            this.direction = 0
            this.spd = 4
            this.scaleX = 1.6
            this.scaleY = 1.6
            this.image = game.assets['Link.png']
            this.frame = 0
            this.addCount = 0
            game.rootScene.addChild(this)
        },
        onenterframe: function() {
            if (this.direction == 0) this.frame = 0
            else if (this.direction == 1) this.frame = 10
            else if (this.direction == 2) this.frame = 5
            else if (this.direction == 3) this.frame = 14
            
            if (game.input.left) {
                if (map.hitTest(this.x-12.5, this.y)||map.hitTest(this.x-12.5, this.y+54)||map.hitTest(this.x+32, this.y+54)||map.hitTest(this.x+32, this.y)) {
                    this.direction = 1
                    this.frame = [10,11,12,13][Math.floor(this.age/5) % 4]
                } else {
                    this.direction = 1
                    this.x -= this.spd
                    this.frame = [10,11,12,13][Math.floor(this.age/5) % 4]
                }
            }
            if (game.input.right) {
                if (map.hitTest(this.x, this.y)||map.hitTest(this.x, this.y+54)||map.hitTest(this.x+42, this.y+54)||map.hitTest(this.x+42, this.y)) {
                    this.direction = 3
                    this.frame = [14,15,16][Math.floor(this.age/5) % 3]
                } else {
                    this.direction = 3
                    this.x += this.spd
                    this.frame = [14,15,16][Math.floor(this.age/5) % 3]
                }
            }
            if (game.input.up) {
                if (map.hitTest(this.x-10, this.y-5)||map.hitTest(this.x-10, this.y+54)||map.hitTest(this.x+32, this.y+54)||map.hitTest(this.x+32, this.y-5)) {
                    this.direction = 2
                    this.frame = [5,6,7,8,9][Math.floor(this.age/5) % 5]
                } else {
                    this.direction = 2
                    this.y -= this.spd
                    this.frame = [5,6,7,8,9][Math.floor(this.age/5) % 5]
                }
            }
            if (game.input.down) {
                if (map.hitTest(this.x-10, this.y)||map.hitTest(this.x-10, this.y+58)||map.hitTest(this.x+32, this.y+58)||map.hitTest(this.x+32, this.y)) {
                    this.direction = 0
                    this.frame = [0,1,2,3,4][Math.floor(this.age/5) % 5]
                } else {
                    this.direction = 0
                    this.y += this.spd
                    this.frame = [0,1,2,3,4][Math.floor(this.age/5) % 5]                    
                }
            }
        }
    });

    game.onload = function() {
        map = new Map(32, 32)
        map.image = game.assets['Road_Library.png']
        map.loadData(Library_Park_1)
        map.collisionData = Collision_Library_Park_L2

        var map_L2 = new Map(32,32)
        map_L2.image = game.assets['kadan(1)_L2.png']
        map_L2.loadData(Library_Park_L2)

        var link = new Player(700, 10)

        var wood = new Sprite(256, 256)
        wood.x = 160
        wood.y = 290
        var wood_image = new Surface(256, 256)
        wood_image.draw(game.assets['wood_1.png'], 0, 0, 256, 256, 0, 0, 256, 256);
        wood.image = wood_image

        var wood2 = new Sprite(256, 256)
        wood2.x = -160
        wood2.y = 290
        var wood_image = new Surface(256, 256)
        wood_image.draw(game.assets['wood_1.png'], 0, 0, 256, 256, 0, 0, 256, 256);
        wood2.image = wood_image

        var wood3 = new Sprite(256, 256)
        wood3.x = 360
        wood3.y = 40
        var wood_image = new Surface(256, 256)
        wood_image.draw(game.assets['wood_1.png'], 0, 0, 256, 256, 0, 0, 256, 256);
        wood3.image = wood_image

        var stage = new Group();
        stage.addChild(map)
        stage.addChild(map_L2)
        stage.addChild(link)
        stage.addChild(wood)
        stage.addChild(wood2)
        stage.addChild(wood3)

        game.rootScene.addChild(stage)

        game.rootScene.addEventListener('enterframe', function(e) {
            var x = Math.min((game.width  - 32) / 2 - link.x, 0);
            var y = Math.min((game.height - 32) / 2 - link.y, 0);
            x = Math.max(game.width,  x + map.width)  - map.width;
            y = Math.max(game.height, y + map.height) - map.height;
            stage.x = x;
            stage.y = y;
        });
    }

    game.start()
}

