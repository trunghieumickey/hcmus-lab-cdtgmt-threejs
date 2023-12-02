// Import Three.js from CDN
import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.min.js';
import { OrbitControls } from './OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(scene.position);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create control
const controls = new OrbitControls(camera, renderer.domElement);

// Create a ground
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Create sunlight as a directional light
const sunlight = new THREE.DirectionalLight(0xffffff, 1);
sunlight.position.set(1, 1, 1);
scene.add(sunlight);

// Create skybox
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMaterial = new THREE.MeshBasicMaterial({
  color: 0x87ceeb, // Light blue (sky) color
  side: THREE.BackSide,
  vertexColors: THREE.VertexColors
});
// Set up gradient colors
const skyColor = new THREE.Color(0x87ceeb); // Light blue (sky) color
const groundColor = new THREE.Color(0x808080); // Gray (ground) color
// Set up gradient vertices
const vertices = skyboxGeometry.attributes.position;
const colors = [];
for (let i = 0; i < vertices.count; i++) {
  const y = vertices.getY(i);

  if (y > 0) {
    colors.push(skyColor.r, skyColor.g, skyColor.b);
  } else {
    colors.push(groundColor.r, groundColor.g, groundColor.b);
  }
}
skyboxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

