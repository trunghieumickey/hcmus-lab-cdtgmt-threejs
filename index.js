// Import Three.js from CDN
import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.min.js';
import { OrbitControls } from './OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-100, 100, 100);
camera.lookAt(scene.position);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create control
const controls = new OrbitControls(camera, renderer.domElement);

//texture loader
const textureLoader = new THREE.TextureLoader();

// Create a ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const sandTexture = textureLoader.load('./texture/desertsand.jpg');
const groundMaterial = new THREE.MeshStandardMaterial({ map: sandTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
//rotate z 45 degree
ground.rotation.z = Math.PI / 4;  
scene.add(ground);

// Create sunlight as a directional light
const sunlight = new THREE.DirectionalLight(0xffffff, 1);
sunlight.position.set(1, 1, 1);
scene.add(sunlight);

// Create skybox
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Create pyramid
const pyramidTexture = textureLoader.load('./texture/sandstone.jpg');
const pyramidMaterial = new THREE.MeshStandardMaterial({ map: pyramidTexture });
function createPyramid(side, height, west, south) {
  const pyramidGeometry = new THREE.ConeGeometry(side / 2, height, 4);
  const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  pyramid.position.set(west-50, height / 2, south-50);
  scene.add(pyramid);
}

createPyramid(23, 14.66, 0, 0); // Khufu pyramid
createPyramid(21.5, 13.65, 21.5, 44.8); // Khafre pyramid
createPyramid(10.85, 6.65, 54.4, 109.6); // Menkaure pyramid

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

