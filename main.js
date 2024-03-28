import * as THREE from 'three';
import './style.css';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const axesHelper = new THREE.AxesHelper(3);
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
renderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 500);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
// const geometry =  new THREE.CircleGeometry(1,20, 0, Math.PI);
// const geometry = new THREE.PlaneGeometry(1, 2, 10, 10);
// const geometry = new THREE.ConeGeometry(1,2,32, 1, true, 0, Math.PI);
// const geometry = new THREE.CylinderGeometry(0.5,1,2,32, 4, true, 0, Math.PI / 2);
// const geometry = new THREE.RingGeometry(0.5, 1, 30, 10, 0, Math.PI / 2);
// const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100, Math.PI)
// const geometry = new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1, 6)
// const geometry = new THREE.DodecahedronGeometry(1, 0);
// const geometry = new THREE.OctahedronGeometry(1, 0);
// const geometry = new THREE.TetrahedronGeometry(1, 0);
// const geometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
const geometry = new THREE.BufferGeometry();
const amount = 500;
const points = new Float32Array(amount * 3 * 3);
for ( let i = 0; i < amount *3 * 3; i++) {
  points[i] = (Math.random() - 0.5) * 4;
}
const pointsBuffer = new THREE.BufferAttribute(points, 3);
geometry.setAttribute('position', pointsBuffer)


const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(axesHelper)
camera.position.z = 5;

const clock = new THREE.Clock();
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
if (WebGL.isWebGLAvailable()) {
  tick();

} else {

  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);

}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    console.log(sizes)
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
  }
}
);

resizeObserver.observe(document.querySelector('body'), {
  childList: true,
  subtree: true,
});

window.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.querySelector('canvas').requestFullscreen();
  }
})