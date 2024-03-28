import * as THREE from 'three';
import './style.css';
import WebGL from 'three/addons/capabilities/WebGL.js';

const axesHelper = new THREE.AxesHelper(3);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(axesHelper)
camera.position.z = 5;
// camera.position.y = 1;
// camera.lookAt(new THREE.Vector3(0,-1, 0))
// cube.position.x = -1;
// cube.position.y = -0.8;
// cube.position.z = 0.5;
// cube.scale.x = 0.5;
// cube.scale.y = 2;
// cube.scale.z = 0.7;
// cube.rotation.x = Math.PI * 0.25;
// cube.rotation.y = Math.PI *0.25;
// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }

// const group = new THREE.Group();
// group.scale.y = 1.4;
// group.rotation.x = Math.PI * 0.25;
// const cube1 = new THREE.Mesh(geometry, material);
// cube1.position.x = -1.2;
// const cube2 = new THREE.Mesh(geometry, material);
// cube2.position.x = 0;
// const cube3 = new THREE.Mesh(geometry, material);
// cube3.position.x = 1.2;
// group.add(cube1);
// group.add(cube2);
// group.add(cube3);
// scene.add(group);
const clock = new THREE.Clock();
const tick = () => {
  const elepsedTime = clock.getElapsedTime();
  // cube.rotation.y = elepsedTime;
  camera.position.x = Math.cos(elepsedTime);
  camera.position.y = Math.sin(elepsedTime);
  camera.lookAt(cube.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  tick();

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