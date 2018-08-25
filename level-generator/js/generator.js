import Grid from './grid';

class Generator {
    constructor(options) {
        this.game = options.game;

        this.options = {
            canvasId: options.canvasId,
            canvasWidth: options.canvasWidth || 800,
            canvasHeight: options.canvasHeight || 600,
            cellHeight: options.cellHeight || 32,
            cellWidth: options.cellWidth || 32
        };

        // Canvas details
        this.canvas = { 
            height: this.options.canvasHeight,
            width: this.options.canvasWidth
        };

        // Cell details
        this.cell = { 
            height: this.options.cellHeight,
            width: this.options.cellWidth
        };
    
        // Directions
        this.directions = {
            north: {
                x: 0,
                y: -1,
            },
            west: {
                x: -1,
                y: 0,
            },
            south: {
                x: 0,
                y: 1,
            },
            east: {
                x: 1,
                y: 0,
            },
        };

        // bind methods
        this.generate = this.generate.bind(this);
    }

    /**
     * Generates a new level
     * @param {Number} steps    The number of steps the generator should take
     * @return {Void}
     */
    generate(steps = 100) {
        this.grid = new Grid(
            this.canvas.width / this.cell.width,
            this.canvas.height / this.cell.height
        );

        // position the stepper closest to the middle of the grid.
        let stepperX = Math.floor(this.grid.size.x / 2);
        let stepperY = Math.floor(this.grid.size.y / 2);
        let stepperDirection = this.getRandomDirection();

        while (steps >= 1) {
            // 50% change it will change direction
            if (Math.random() < 0.5) {
                stepperDirection = this.getRandomDirection();
            }

            // move the stepper
            if (stepperDirection.x != 0) {
                stepperX += stepperDirection.x;
            }
            if (stepperDirection.y != 0) {
                stepperY += stepperDirection.y;
            }

            // check if the stepper X is out of bounds,
            // if so, reverse the direction
            if (stepperX < 0 || stepperX >= this.grid.size.x) {
                // Reverse the number and double the value to
                // reverse the initial change and walk 1 step in the opporsite direction
                stepperX += (stepperDirection.x * 2) * -1;
            }

            // check if the stepper Y is out of bounds, if so,
            // reverse the direction
            if (stepperY < 0 || stepperY >= this.grid.size.y) {
                // Reverse the number and double the value to
                // reverse the initial change and walk 1 step in the opporsite direction
                stepperY += (stepperDirection.y * 2) * -1;
            }

            // set the current tile to floor type
            this.grid.setTile(stepperX, stepperY, 'floor');

            steps--;
        }

        this.postProccess();
    }

    /**
     * Removes standalone tiles to make it less "random" looking
     * @return {Void}
     */
    postProccess() {
        this.grid.matrix.forEach((row, x) => {
            row.forEach((tile, y) => {
                if (tile !== this.grid.tiles.void) {
                    return;
                }

                // check if there are any other void tiles next to the this void.
                // if there are none, remove it to make it look a bit better
                let isTileAlone =   !this.grid.tileIsType(x + 1, y, 'void') && 
                                    !this.grid.tileIsType(x - 1, y, 'void') && 
                                    !this.grid.tileIsType(x, y + 1, 'void') && 
                                    !this.grid.tileIsType(x, y - 1, 'void');
                if (isTileAlone) {
                    this.grid.setTile(x, y, 'floor');
                }
            });
        });

        // render the floor tiles
        this.generateTiles();
    }

    /**
     * Generates the coloured tile where there is floor
     * @return {Void}
     */
    generateTiles() {
        const tileTypes = Object.values(this.grid.tiles);
        const scene = this.game.scene.getScene('map');
        scene.clear();

        this.grid.matrix.forEach((row, x) => {
            row.forEach((tile, y) => {
                let tileData = tileTypes.find((t) => t.id === tile);

                scene.renderTile(
                    x * this.cell.width,
                    y * this.cell.height,
                    tileData.id,
                    tileData.texture
                );
            });
        });
    }

    /**
     * Gets a new random direction
     * @return {Number}
     */
    getRandomDirection() {
        const keys = Object.keys(this.directions);
        return this.directions[keys[Math.floor(Math.random() * keys.length)]];
    }
}

export default Generator;
