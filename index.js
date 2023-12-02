// Import Three.js from CDN
import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.min.js';
import { OrbitControls } from './OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a clock
const clock = new THREE.Clock();

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
const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Fade light intensity to 0 in 1 minute
const fadeDuration = 60; // 1 minute in seconds
const initialIntensity = sunlight.intensity;
let elapsedTime = 0;

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  if (elapsedTime <= fadeDuration) {
    const t = elapsedTime / fadeDuration;
    sunlight.intensity = initialIntensity * (1 - t);
  } else {
    sunlight.intensity = 0;
  }
  renderer.render(scene, camera);
}