
import { World } from "./world.js";
import * as THREE from './three.module.js'
import { setupGallery } from "./setupGallery.js";
import { PointerLockControls } from "./PointerLockControls.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);

camera.position.set(0, 0, 0);

const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0,), new THREE.Vector3(1, 0, 0), 0, 0.5);

const w = new World(scene);
setupGallery(w);

// const centralWindow = new RectAreaLight(0xE0E0FF, 0.2, 10, 30);
// centralWindow.position.set(0, 5, 0);
// centralWindow.lookAt(0, 0, 0);
// scene.add(centralWindow);
// centralWindow.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.1);
const target = new THREE.Object3D();
target.position.set(1, 0.5, 0.2);
scene.add(target);
directionalLight.target = target;
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.1);
const target2 = new THREE.Object3D();
target2.position.set(-1, 0.5, -0.2);
scene.add(target2);
directionalLight2.target = target2;
scene.add(directionalLight2);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const elevator = w.createWall(0, -0.99, 14, 3.5, 1, 2);

const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());


document.body.onclick = function() {
  controls.lock();
}

let elevatorPos = -1;

let moveFwd = false;
let moveBwd = false;

document.body.onkeydown = function(ev) {
  if(ev.key == 'w') {
    moveFwd = true;
  }
  if(ev.key == 's') {
    moveBwd = true;
  }
}

document.body.onkeyup = function(ev) {
  if(ev.key == 'w') {
    moveFwd = false;
  }
  if(ev.key == 's') {
    moveBwd = false;
  }
}

let prevFrame = performance.now();
let elevatorOn = false;
let elevatorTimer = 0;
let yVel = 0;

function animate() {
  let dt = performance.now() - prevFrame;
  dt = 1 / dt;
  prevFrame = performance.now();
	requestAnimationFrame( animate );
	renderer.render(scene, camera);

  if(moveFwd)
    controls.moveForward(dt / 2);
  if(moveBwd)
    controls.moveForward(-dt / 2);

  raycaster.ray.origin.copy(controls.getObject().position);
  for(let angle = 0; angle < Math.PI * 2; angle += Math.PI / 20) {
    raycaster.ray.direction.set(Math.cos(angle), 0, Math.sin(angle));
    const intersections = raycaster.intersectObjects(w.collisionObjects);
    let hit = intersections.length > 0;
    if(hit) {
      camera.position.add(new Vector3(-0.1 * dt * Math.cos(angle), 0, -0.1 * dt * Math.sin(angle)));
    }
  }

  const onPlatform = Math.abs(camera.position.x) < 1.75 && camera.position.z > 13 && camera.position.z < 15;
  if(onPlatform)
    elevatorTimer += dt;
  if(!onPlatform)
    elevatorTimer = 0;
  if(elevatorTimer > 8) {
    elevatorTimer = -5;
    elevatorOn = !elevatorOn;
  }

  if(elevatorOn) {
    elevatorPos += 0.5 * dt;
    camera.position.y += 0.5 * dt;
  } else {
    elevatorPos -= 0.5 * dt;
    camera.position.y -= 0.5 * dt;
  }
  elevatorPos = Math.min(elevatorPos, 1.5);
  elevatorPos = Math.max(elevatorPos, -1);

  elevator.position.y = elevatorPos + 0.01;

  const inAir = camera.position.z < 12.75 && Math.abs(camera.position.x) < 4.25;
  if(inAir) {
    elevatorOn = false;
    camera.position.y += yVel * dt;
    yVel -= 0.75 * dt;
  }
  if(camera.position.y < 0) {
    camera.position.y = 0;
    yVel = 0;
  }
  if(camera.position.y > 2.5) {
    camera.position.y = 2.5;
    yVel = 0;
  }

  console.log(dt);
}
animate();