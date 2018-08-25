import Phaser from 'phaser';

class MapTexture extends Phaser.GameObjects.Image {
    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('contra');
        this.setPosition(x, y);
        this.setScale(2);
    }
}

export default MapTexture;
