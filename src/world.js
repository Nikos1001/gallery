
import * as THREE from './three.module.js'

class World {

    scene = null
    objects = []
    collisionObjects = []

    loader = new THREE.TextureLoader();
    
    currPaintingIdx = 0

    constructor(scene) {
        this.scene = scene;
    }

    createWall(x, y, z, w, h, d) {
        const geometry = new THREE.BoxGeometry(w, h, d);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFFFF9
        });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.objects.push(cube);
        this.collisionObjects.push(cube);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        return cube;
    }

    createFloor(x, y, z, w, h) {
        const texture = this.loader.load('./res/floorPanel.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2 * w, 2 * h);

        const geometry = new THREE.PlaneGeometry(w, h);
        const material = new THREE.MeshStandardMaterial({
            map: texture
        });
        const floor = new THREE.Mesh(geometry, material);
        this.scene.add(floor);
        this.objects.push(floor);

        floor.rotateX(-Math.PI / 2);
        floor.position.x = x;
        floor.position.y = y;
        floor.position.z = z;
    }

    createPainting(x, y, z, rotation, scale) {
        console.log(this.currPaintingIdx);
        return new Promise((resolve, reject) => {
            this.currPaintingIdx++;
            this.loader.load(`https://raw.githubusercontent.com/Nikos1001/gallery/master/paintings/${this.currPaintingIdx - 1}.png`, texture => {

                let width = scale;
                let height = scale;
                if(texture.image.width < texture.image.height) {
                    width *= texture.image.width / texture.image.height;
                } else {
                    height *= texture.image.height / texture.image.width;
                }

                const geometry = new THREE.PlaneGeometry(width, height);
                const material = new THREE.MeshStandardMaterial({
                    map: texture
                });
                const painting = new THREE.Mesh(geometry, material);
                this.scene.add(painting);
                this.objects.push(painting);

                painting.rotateY(rotation);
                painting.position.x = x;
                painting.position.y = y;
                painting.position.z = z;

                resolve();
            });
            resolve();
            setTimeout(resolve, 500);
        });
    }

}

export { World }