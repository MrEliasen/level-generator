import Phaser from 'phaser';
import Generator from './generator';
import TiledMapScene from './scenes';

class App {
    constructor() {
        this._config = {
            type: Phaser.AUTO,
            parent: 'level',
            width: 1024,
            height: 768,
            transparent: true,
            fps: {
                min: 5,
                target: 10,
            },
        };
        this.game = new Phaser.Game(this._config);
        this.game.scene.add('map', TiledMapScene, true);

        // load level generator
        this.levelGenerator = new Generator({
            canvasWidth: this._config.width * 3,
            canvasHeight: this._config.height * 3,
            cellHeight: 128,
            cellWidth: 128,
            game: this.game,
        });

        // setup our event listeners
        document.addEventListener('keydown', (e) => {
            // only react to R key presses
            if (e.key.toLowerCase() !== 'r') {
                return;
            }
            //"steps" the generator should take. higher number = bigger level on avg.
            this.levelGenerator.generate(100);
        }, false);

    }
}

document.addEventListener('DOMContentLoaded', function() {
    const app = new App();
}, false);