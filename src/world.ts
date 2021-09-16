
import { Scene, Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Texture, TextureLoader, PlaneGeometry, RepeatWrapping } from 'three'
//@ts-ignore
import floorPanelUrl from '../res/floorPanel.png'

class World {

    scene : Scene
    objects : Object3D[] = []
    collisionObjects : Object3D[] = []

    loader : TextureLoader = new TextureLoader();

    floorPanel : Texture
    
    currPaintingIdx : number = 0

    constructor(scene : Scene) {
        this.scene = scene;

        this.floorPanel = this.loader.load(floorPanelUrl);
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
        cube.castShadow = true;
        cube.receiveShadow = true;
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
        floor.castShadow = true;
        floor.receiveShadow = true;
    }

    createPainting(x : number, y : number, z : number, rotation : number, scale : number) {
        this.currPaintingIdx++;
        this.loader.load(`https://raw.githubusercontent.com/Nikos1001/gallery/master/paintings/${this.currPaintingIdx - 1}.png`, texture => {

            let width = scale;
            let height = scale;
            if(texture.image.width < texture.image.height) {
                width *= texture.image.width / texture.image.height;
            } else {
                height *= texture.image.height / texture.image.width;
            }

            const geometry = new PlaneGeometry(width, height);
            const material = new MeshStandardMaterial({
                map: texture
            });
            const painting = new Mesh(geometry, material);
            this.scene.add(painting);
            this.objects.push(painting);

            painting.rotateY(rotation);
            painting.position.x = x;
            painting.position.y = y;
            painting.position.z = z;
            painting.castShadow = true;
            painting.receiveShadow = true;
        });
    }

}

export { World }