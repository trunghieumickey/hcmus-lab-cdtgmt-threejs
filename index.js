// Import Three.js from CDN
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.module.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Track mouse movements
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };

    const deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        'XYZ'
      ));

    camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);

    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  pyramidMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
