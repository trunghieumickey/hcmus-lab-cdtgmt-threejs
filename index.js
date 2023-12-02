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

// Create pyramid geometry
const pyramidGeometry = new THREE.ConeGeometry(1, 2, 4);

// Create pyramid material
const pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create pyramid mesh
const pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
scene.add(pyramidMesh);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  pyramidMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
