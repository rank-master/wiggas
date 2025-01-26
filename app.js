const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add a light source
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5).normalize();
scene.add(directionalLight);
directionalLight.castShadow = true;

// Create player cube
const playerGeometry = new THREE.BoxGeometry(2, 2, 2);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const playerCube = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(playerCube);
playerCube.position.y = -2;
playerCube.castShadow = true;

// Function to add cubes
function addCube(size, x, y, z, color) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
  cube.castShadow = true;
}

// Add cubes above the borders
const cubeColors = [0xff0000, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const cubeSize = 0.3;
const cubeY = 0; // Same height as borders

[-4, 4].forEach((borderX) => {
  for (let i = -10; i <= 10; i += 2) {
    const color = cubeColors[Math.floor(Math.random() * cubeColors.length)];
    addCube(cubeSize, borderX, cubeY, i, color);
  }
});

// Create borders
const borderGeometry = new THREE.BoxGeometry(0.5, 1, 9999);
const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const borderLeft = new THREE.Mesh(borderGeometry, borderMaterial);
scene.add(borderLeft);
borderLeft.position.set(-4, -3, 0);

const borderRight = new THREE.Mesh(borderGeometry, borderMaterial);
scene.add(borderRight);
borderRight.position.set(4, -3, 0);

// Create Plane
const planeGeometry = new THREE.PlaneGeometry(8, 10000);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = Math.PI / 2;
plane.position.y = -3;
plane.receiveShadow = true;

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Movement variables
const jumpHeight = 1.5;
const gravity = -0.05;
let velocity = 0;
let isJumping = false;
let jumpForce = 0.3;
let moveSpeed = 0.1;
let movingForward = false;
let movingBackward = false;

// Add keyboard controls
window.addEventListener('keydown', (event) => {
  if (event.key === ' ' && !isJumping) isJumping = true, velocity = jumpForce;
  if (event.key === 'w') movingForward = true;
  if (event.key === 's') movingBackward = true;
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'w') movingForward = false;
  if (event.key === 's') movingBackward = false;
});

// Add button controls
document.getElementById('jump').addEventListener('click', () => {
  if (!isJumping) isJumping = true, velocity = jumpForce;
});

document.getElementById('moveAhead').addEventListener('mousedown', () => movingForward = true);
document.getElementById('moveAhead').addEventListener('mouseup', () => movingForward = false);

document.getElementById('moveBack').addEventListener('mousedown', () => movingBackward = true);
document.getElementById('moveBack').addEventListener('mouseup', () => movingBackward = false);

// Animate function
function animate() {
  requestAnimationFrame(animate);

  if (movingForward) playerCube.position.z -= moveSpeed;
  if (movingBackward) playerCube.position.z += moveSpeed;

  if (isJumping) {
    velocity += gravity;
    playerCube.position.y += velocity;
    if (playerCube.position.y <= -2) {
      playerCube.position.y = -2;
      isJumping = false;
      velocity = 0;
    }
  }

  camera.position.z = playerCube.position.z + 10;
  camera.position.x = playerCube.position.x + 7;
  camera.position.y = 5;
  camera.lookAt(playerCube.position);

  renderer.render(scene, camera);
}

animate();
