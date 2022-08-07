import Generator from './generator.js';

class App {
    constructor() {
        const tileSize = 32;

        this.canvas = document.createElement('canvas');
        this.canvas.width = tileSize * 24;
        this.canvas.height = tileSize * 24;
        this.canvasContext = this.canvas.getContext('2d');

        document.querySelector('#level').appendChild(this.canvas);

        // load level generator
        this.levelGenerator = new Generator({
            canvasWidth: this.canvas.width,
            canvasHeight: this.canvas.height,
            cellHeight: tileSize,
            cellWidth: tileSize,
        });

        // setup our event listeners
        document.addEventListener('keydown', (e) => {
            // only react to R key presses
            if (e.key.toLowerCase() !== 'r') {
                return;
            }
            //"steps" the generator should take. higher number = bigger level on avg.
            const scene = this.levelGenerator.generate(100);

            this.render(scene);
        }, false);
    }

    render(scene) {
        console.debug(scene);

        const textures = {
            '0': '#000000',
            '55': '#a0a0a0',
        };
        const tiles = {};

        Object.values(scene.tiles).forEach((value) => {
            tiles[value.id] = value;
        });

        scene.matrix.forEach((row, y) => {
            row.forEach((type, x) => {
                const w = scene.cell.width;
                const h = scene.cell.height;
                const tile = tiles[type];
                const texture = textures[tile.texture];

                this.canvasContext.fillStyle = texture;
                this.canvasContext.fillRect(w * x, h * y, w, h);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const app = new App();
}, false);
