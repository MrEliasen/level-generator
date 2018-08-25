class Grid {
    constructor(width, height) {
        this.width = Math.floor(width);
        this.height = Math.floor(height);

        // Tiles types
        this.tiles = {
            void: {
                id: '0',
                texture: '55',
            },
            floor: {
                id: '1',
                texture: '0',
            },
        };

        // Generate initial matrix
        this.matrix = Array
            .from(this.tiles.void.id.repeat(this.width))
            .map((cell) => {
                return Array.from(this.tiles.void.id.repeat(this.height));
            }
        );

        this.setTile = this.setTile.bind(this);
    }

    /**
     * Checks if a tile is valid or out of bounds
     * @param {Number} x    Tile X position
     * @param {Number} y    Tile Y position
     * @return {Boolean}    Whether the tile is within bounds
     */
    isValidTile(x, y) {
        if (!this.matrix[x] || !this.matrix[x][y]) {
            return false;
        }

        return true;
    }

    /**
     * Checks if a given tile type is defined
     * @param {Number} x    Tile X position
     * @param {Number} y    Tile Y position
     * @return {Boolean}    Whether the tile type exists or not
     */
    isValidType(type) {
        if (!this.tiles[type]) {
            console.warn(`Tile type "${type}" does not exist`);
            return false;
        }

        return true;
    }

    /**
     * Set a tile type of a given tile
     * @param {Number} x    Tile X position
     * @param {Number} y    Tile Y position
     * @param {String} type Tile type name {void, wall, floor, etc}
     * @return {Bool}       Whether the tile was set or not
     */
    setTile(x,y, type) {
        if (!this.isValidType(type)) {
            return false;
        }

        if (!this.isValidTile(x, y)) {
            console.warn(`Tile "${x},${y}" is out of bounds`);
            return false;
        }

        this.matrix[x][y] = this.tiles[type].id;
        return true;
    }

    /**
     * Check if a tile exists, and if its of the specified type
     * @param  {Number} x    Tile X position
     * @param  {Number} y    Tile Y position
     * @param  {String} type The type name
     * @return {Bool}        True if exists and is of type
     */
    tileIsType(x, y, type) {
        if (!this.isValidType(type)) {
            return false;
        }

        if (!this.isValidTile(x, y)) {
            return false;
        }

        return this.matrix[x][y] === this.tiles[type].id;
    }

    /**
     * Returns the size of the grid
     * @return {Object}
     */
    get size() {
        return {
            x: this.width,
            y: this.height
        }
    }
}

export default Grid;
