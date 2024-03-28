import * as THREE from 'three';
import './style.css';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const axesHelper = new THREE.AxesHelper(3);


const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};

renderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(axesHelper)
camera.position.z = 3;
const controls = new OrbitControls(camera, canvas)

window.addEventListener('mousemove', (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = event.clientY / sizes.height - 0.5;
});

const tick = () => {
  camera.position.x = Math.sin((cursor.x * Math.PI * 2 ) * 2);
  camera.position.z = Math.cos((cursor.x * Math.PI * 2 ) * 2);
  camera.position.y = cursor.y * 2;
  camera.lookAt(cube.position)
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

if (WebGL.isWebGLAvailable()) {
 
  renderer.render(scene, camera);
  tick();
} else {

  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);

}
