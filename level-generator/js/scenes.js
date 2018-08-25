import Phaser from 'phaser';

// game assets
import DungeonTiles from '../data/dungeon.png';

const TILE_SIZE = 128;

class TiledMapScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    clear() {
        this.zoneHighlighter.clear();

        [...this.children.list].forEach((gameObject) => {
            if (!gameObject.data || gameObject.data.get('keep') !== true) {
                gameObject.destroy();
            }
        });
    }

    /**
     * Phaser scene preloader
     */
    preload() {
        // preload the game assets
        this.load.spritesheet('dungeon', DungeonTiles, {
            frameWidth: TILE_SIZE,
            frameHeight: TILE_SIZE
        });
    }

    /**
     * Phaser scene creator
     */
    create() {
        // This gameobject will change shape and visibility based on the moused-over'ed zone's hitarea
        this.zoneHighlighter = this.add.graphics().setData({'keep': true}).setDepth(998);

        // Setup the main camera
        this.cameras.main.setBackgroundColor('0xffffff');

        // setup camera controls
        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.45,
        };
        this._controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        // setup event listeners
        this.input.on('gameobjectdown', this._onClick);
        this.input.on('gameobjectover', this._onMouseOver);
    }

    /**
     * Phaser scene update tick handler
     * @param  {number} time  [description]??
     * @param  {number} delta [description]??
     */
    update(time, delta) {
        this._controls.update(delta);
    }

    _onMouseOver = (pointer, gameObject) => {
        // clear the current shape
        this.zoneHighlighter.clear();
        // set the highlight colour
        this.zoneHighlighter.fillStyle('0xffffff', 0.25);
        this.zoneHighlighter.fillRectShape(gameObject.input.hitArea);
        this.zoneHighlighter.setPosition(gameObject.x - 64, gameObject.y - 64); // why is the offset wrong?! temp fix
    }

    _onClick = (pointer, gameObject) => {
        console.log('Clicked:', gameObject);
    }

    renderTile(x, y, tileId, textureId) {
        const image = this.add.image(x, y, 'dungeon', parseInt(textureId));

        if (tileId !== '0') {
            image.setInteractive({useHandCursor: true});
        }
    }

    generateMap(tileMapKey) {
        // clear the map of existing objects
        this.clear();

        // update the main camera bounds to fit the map
        this.cameras.main.setBounds(0, 0, gameMap.widthInPixels, gameMap.heightInPixels);
        this.cameras.main.setScroll(0, gameMap.heightInPixels - this.sys.game.config.height);
    }
}

export default TiledMapScene;
