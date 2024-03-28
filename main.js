import * as THREE from 'three';
import './style.css';
import WebGL from 'three/addons/capabilities/WebGL.js';

const axesHelper = new THREE.AxesHelper(3);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'yellow',
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
camera.position.z = 3;

const group = new THREE.Group();

const mashes = [];
const colors = ['pink', 'red', 'yellow', 'green', 'pink', 'blue'];

for (let x = -1.2; x <= 1.2; x = x + 1.2) {
  for (let y = - 1.2; y <= 1.2; y = y + 1.2) {
    const material = new THREE.MeshBasicMaterial({
      color: colors[((Math.random() * 5) | 0) + 1],
      wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.5, 0.5, 0.5);
    mesh.position.set(x, y, 0);
    mashes.push(mesh);
  }
}

group.add(...mashes);

scene.add(group);
scene.add(axesHelper);
const clock = new THREE.Clock();

const MAX_SCALE = 1;
const MIN_SCALE = 0.5;
let grow = false;

const animate = () => {
  const delta = clock.getDelta();

  mashes.forEach((item, index) => {
    const mult = index % 2 === 0 ? 1 : -1;
    item.rotation.x += mult * delta;
    item.rotation.y += mult * delta * 0.4;
  });

  const elapsed = clock.getElapsedTime();
  camera.position.x = Math.sin(elapsed);
  camera.position.y = Math.cos(elapsed);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  const mult = grow ? 1 : -1;
  group.scale.x += mult * delta * 0.2;
  group.scale.y += mult * delta * 0.2;
  group.scale.z += mult * delta * 0.2;
  if (grow && group.scale.x >= MAX_SCALE) {
    grow = false;
  } else if (!grow && group.scale.y <= MIN_SCALE) {
    grow = true;
  } 
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}


if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  // renderer.render(scene, camera);
  animate()
} else {

  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);

}
// const material = new THREE.LineBasicMaterial({ color: 0x000ff });
// const points = [];
// points.push(new THREE.Vector2(-10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));
// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(geometry, material);
// scene.add(line);
// renderer.render(scene, camera);