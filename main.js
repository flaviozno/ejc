let scene, camera, renderer, globe;
const container = document.getElementById("globe-container");

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const isMobile = window.innerWidth < 768;
  camera.position.z = isMobile ? 6 : 4;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight - 15);
  renderer.setClearColor(0x111827, 1);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./2k.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });

  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  window.addEventListener("resize", onWindowResize, false);

  animate();
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);

  const isMobile = window.innerWidth < 768;
  camera.position.z = isMobile ? 6 : 4;
};

const animate = () => {
  requestAnimationFrame(animate);

  globe.rotation.y += 0.001;

  renderer.render(scene, camera);
};

init();

document.getElementById("submit-btn").addEventListener("click", async () => {
  const name = document.getElementById("name-input").value.trim();
  if (name) {
    try {
      await fetch("https://grbserver.onrender.com/qr_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: "senha",
        },
        body: JSON.stringify({ Name: name }),
      });
      document.getElementById("form-container").style.display = "none";
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
