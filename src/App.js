import React, { Component } from "react";
import * as THREE from "three";

class App extends Component {
  componentDidMount() {
    let scene,
      camera,
      cloudGeo,
      cloudMaterial,
      cloudParticles = [],
      composer;
    // === THREE.JS CODE START ===
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0xadd264);
    scene.add(ambient);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.fog = new THREE.FogExp2(0xb57b93, 0.001);
    renderer.setClearColor(scene.fog.color);
    this.mount.appendChild(renderer.domElement);
    // === THREE.JS EXAMPLE CODE END ===
    renderer.render(scene, camera);
    //requestAnimationFrame(render);

    let loader = new THREE.TextureLoader();
    loader.load("smoke.png", function (texture) {
      cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
      cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });
      for (let p = 0; p < 50; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2 * Math.PI;
        cloud.material.opacity = 0.55;
        cloudParticles.forEach((p) => {
          p.rotation.z -= 0.001;
        });
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
export default App;
