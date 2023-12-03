// Import Three.js from CDN
import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.min.js';
import { OrbitControls } from './OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-9, 1, -6);
camera.lookAt(scene.position);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Create control
const controls = new OrbitControls(camera, renderer.domElement);

//texture loader
const textureLoader = new THREE.TextureLoader();

// Create a ground
const groundGeometry = new THREE.BoxGeometry(20, 0.01, 20);
const sandTexture = textureLoader.load('./texture/desertsand.jpg');
const groundMaterial = new THREE.MeshStandardMaterial({ map: sandTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
scene.add(ground);

// Create sunlight as a directional light
const sunlight = new THREE.DirectionalLight(0xffffff, 1);
sunlight.castShadow = true;
scene.add(sunlight);

//create a speare representing the sun
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// create moonlight as a directional light
const moonlight = new THREE.DirectionalLight(0xb0c4de, 0);
moonlight.castShadow = true;
scene.add(moonlight);

//create a speare representing the moon
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

//create ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight);


// Create skybox
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Create pyramid
const pyramidTexture = textureLoader.load('./texture/sandstone.jpg');
const pyramidMaterial = new THREE.MeshStandardMaterial({ map: pyramidTexture });
function createPyramid(side, height, west, south) {
  const pyramidGeometry = new THREE.ConeGeometry(side / 2, height, 4, 5);
  const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  pyramid.position.set(west-5, height / 2, south-5);
  pyramid.castShadow = true;
  pyramid.rotation.y = Math.PI / 4;
  scene.add(pyramid);
}

createPyramid(2.3, 1.466, 0, 0); // Khufu pyramid
createPyramid(2.15, 1.365, 2.15, 4.48); // Khafre pyramid
createPyramid(1.085, 0.665, 5.44, 10.96); // Menkaure pyramid

// Render the scene
function animate() {
  // Get current time
  const time = Date.now();

  // Calculate the position of the sunlight based on time
  const angle = (time / 1000) % (Math.PI * 2);
  const radius = 15;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  // change the sunlight intensity
  sunlight.intensity = Math.max(0, Math.sin(angle));

  // Update the position of the sunlight
  sunlight.position.set(x, y, 1);
  sun.position.set(x, y, 1);

  //change the moonlight intensity
  moonlight.intensity = (1-sunlight.intensity)*0.3;

  // Update the position of the moonlight
  moonlight.position.set(-x, -y, 1);
  moon.position.set(-x, -y, 1);

  //adjust the skybox color
  skybox.material.color.setHSL(0.6, 1, 0.5 * (0.01+sunlight.intensity));

  // Request the next animation frame
  requestAnimationFrame(animate);

  // Render the scene
  renderer.render(scene, camera);
}
animate();


