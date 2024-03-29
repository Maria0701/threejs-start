import * as THREE from 'three';

import init from './init';

import './style.css';

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.z = 3;

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
// 	color: 'gray',
// 	wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const group = new THREE.Group();

const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.ConeGeometry(1, 2, 32, 1),
  new THREE.RingGeometry(0.5, 1, 16),
  new THREE.TorusGeometry(1, 0.5, 16, 100),
  new THREE.DodecahedronGeometry(1, 0),
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1, 5),
  new THREE.OctahedronGeometry(1, 0),
  new THREE.CylinderGeometry(0.5, 1, 2, 16, 4),
]
let index = 0;
for (let j = -5; j <= 5; j += 5) {
  for (let i = -5; i <= 5; i += 5) {
    const material = new THREE.MeshBasicMaterial({
      color: 'gray',
      wireframe: true,
    });
    
    const mesh = new THREE.Mesh(geometries[index], material);
    mesh.position.set(j, i, 10);
    group.add(mesh);
    index += 1;
  }
}

scene.add(group);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
  // Обновляем размеры
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Обновляем соотношение сторон камеры
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Обновляем renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});