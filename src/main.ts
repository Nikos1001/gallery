
import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, Raycaster, Vector3, AmbientLight, Object3D } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { World } from './world'
import { setupGallery } from './setupGallery';

const scene = new Scene();
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);

const raycaster = new Raycaster(new Vector3(0, 0, 0,), new Vector3(1, 0, 0), 0, 0.5);

const w = new World(scene);
setupGallery(w);

// const centralWindow = new RectAreaLight(0xE0E0FF, 0.2, 10, 30);
// centralWindow.position.set(0, 5, 0);
// centralWindow.lookAt(0, 0, 0);
// scene.add(centralWindow);
// centralWindow.castShadow = true;

const ambientLight = new AmbientLight(0xFFFFFF, 0.9);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xFFFFFF, 0.1);
const target = new Object3D();
target.position.set(1, 0.5, 0.2);
scene.add(target);
directionalLight.target = target;
scene.add(directionalLight);

const directionalLight2 = new DirectionalLight(0xFFFFFF, 0.1);
const target2 = new Object3D();
target2.position.set(-1, 0.5, -0.2);
scene.add(target2);
directionalLight2.target = target2;
scene.add(directionalLight2);


const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());


document.body.onclick = function() {
  controls.lock();
}

let moveFwd = false;
let moveBwd = false;

document.body.onkeydown = function(ev : KeyboardEvent) {
  if(ev.key == 'w') {
    moveFwd = true;
  }
  if(ev.key == 's') {
    moveBwd = true;
  }
}

document.body.onkeyup = function(ev : KeyboardEvent) {
  if(ev.key == 'w') {
    moveFwd = false;
  }
  if(ev.key == 's') {
    moveBwd = false;
  }
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

  raycaster.ray.origin.copy( controls.getObject().position);
  let vec = new Vector3(0, 0, -1);
  vec.applyQuaternion(camera.quaternion);
  raycaster.ray.direction.copy(vec);
  const intersections = raycaster.intersectObjects(w.collisionObjects);
  const hit = intersections.length > 0;

  if(moveFwd && !hit)
    controls.moveForward(0.025);
  if(moveBwd)
    controls.moveForward(-0.025);
}
animate();