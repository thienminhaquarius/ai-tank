
function createScene(container)	// tao scene cho game
{
  scene = new THREE.Scene({ antialias: true });
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio * 2);
  // renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
}
function createLights() // tạo ánh sáng chiếu, tạo đổ bóng
{
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
  ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -40;
  shadowLight.shadow.camera.right = 40;
  shadowLight.shadow.camera.top = 40;
  shadowLight.shadow.camera.bottom = -40;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 4096;
  shadowLight.shadow.mapSize.height = 4096;
  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}
