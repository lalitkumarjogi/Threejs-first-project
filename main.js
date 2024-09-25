import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 1000);

var canvas=document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// Set up camera position
camera.position.z=3;


//gltf loader
const loader = new GLTFLoader();
loader.load('./wooden_box.glb', function(gltf){
  // gltf.scene.position.x=-2;  
  gltf.scene.position.y=-1;  
  // gltf.scene.position.z=-3;  

  scene.add(gltf.scene);
});


// Create orbital controls
const controls = new OrbitControls(camera, renderer.domElement);

// Load HDRI environment map
new RGBELoader()
  .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/illovo_beach_balcony_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    scene.environment = texture;


    // Render loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  });


  // Handle window resizing

  window.addEventListener('resize',function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();

  });


