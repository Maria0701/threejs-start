import * as THREE from 'three';
import './style.css';
import WebGL from 'three/addons/capabilities/WebGL.js';

const axesHelper = new THREE.AxesHelper(3);
const renderer = new THREE.WebGLRenderer();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 500);
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