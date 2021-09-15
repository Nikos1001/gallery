
import { Scene, Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Texture, TextureLoader, PlaneGeometry, RepeatWrapping } from 'three'

class World {

    scene : Scene
    objects : Object3D[] = []
    collisionObjects : Object3D[] = []

    loader : TextureLoader = new TextureLoader();

    floorPanel : Texture

    constructor(scene : Scene) {
        this.scene = scene;

        this.floorPanel = this.loader.load('res/floorPanel.png');
        this.floorPanel.wrapS = RepeatWrapping;
        this.floorPanel.wrapT = RepeatWrapping;
        this.floorPanel.repeat.set(2.0, 2.0);
    }

    createWall(x : number, y : number, z : number, w : number, h : number, d : number) {
        const geometry = new BoxGeometry(w, h, d);
        const material = new MeshStandardMaterial({
            color: 0xFFFFF9
        });
        const cube = new Mesh(geometry, material);
        this.scene.add(cube);
        this.objects.push(cube);
        this.collisionObjects.push(cube);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
    }

    createFloor(x : number, y : number, z : number) {
        const geometry = new PlaneGeometry(1, 1);
        const material = new MeshStandardMaterial({
            map: this.floorPanel
        });
        const floor = new Mesh(geometry, material);
        this.scene.add(floor);
        this.objects.push(floor);

        floor.rotateX(-Math.PI / 2);
        floor.position.x = x;
        floor.position.y = y;
        floor.position.z = z;
    }

}

export { World }