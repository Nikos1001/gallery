
import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight, Raycaster, Vector3 } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { World } from './world'

const scene = new Scene();
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);

const raycaster = new Raycaster(new Vector3(0, 0, 0,), new Vector3(1, 0, 0), 0, 0.5);

const w = new World(scene);
w.createWall(0, 0, -3, 3, 1, 1);
w.createWall(-1, 0, -3.5, 1, 1, 2);
w.createFloor(0, -0.5, -4);
w.createFloor(1, -0.5, -4);

const light = new AmbientLight( 0xe8e8e8 );
scene.add(light);
const directionalLight = new DirectionalLight(0xffffff, 0.1);
directionalLight.position.copy(new Vector3(0.8, 1, 1));
scene.add(directionalLight);

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