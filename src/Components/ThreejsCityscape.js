import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

const ThreejsCityscape = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // CSS2D Renderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    mountRef.current.appendChild(labelRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Camera position
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Custom building geometries
    const buildingTypes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
      new THREE.ConeGeometry(0.5, 1, 32),
      new THREE.TorusGeometry(0.5, 0.2, 16, 100)
    ];

    // Create buildings
    const buildings = [];
    const buildingMaterials = [
      new THREE.MeshPhongMaterial({ color: 0xcccccc }),
      new THREE.MeshPhongMaterial({ color: 0x8888ff }),
      new THREE.MeshPhongMaterial({ color: 0xff8888 }),
      new THREE.MeshPhongMaterial({ color: 0x88ff88 })
    ];

    const projectTypes = ['Residential', 'Commercial', 'Industrial', 'Cultural'];
    const architectStyles = ['Modern', 'Classical', 'Art Deco', 'Minimalist'];

    for (let i = 0; i < 50; i++) {
      const geometryIndex = Math.floor(Math.random() * buildingTypes.length);
      const materialIndex = Math.floor(Math.random() * buildingMaterials.length);
      const building = new THREE.Mesh(buildingTypes[geometryIndex], buildingMaterials[materialIndex]);
      
      const x = Math.random() * 40 - 20;
      const z = Math.random() * 40 - 20;
      const height = Math.random() * 5 + 1;
      building.position.set(x, height / 2, z);
      building.scale.set(1, height, 1);
      
      const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
      const architectStyle = architectStyles[Math.floor(Math.random() * architectStyles.length)];
      
      building.userData = { 
        id: i, 
        name: `Project ${i + 1}`,
        description: `A ${height.toFixed(1)}-story ${projectType} building in ${architectStyle} style.`,
        details: `This ${projectType.toLowerCase()} project showcases our expertise in ${architectStyle.toLowerCase()} design. It features innovative use of space and materials, optimizing for both aesthetics and functionality.`,
        image: `/api/placeholder/300/200`  // Placeholder image
      };
      scene.add(building);
      buildings.push(building);

      // Add label
      const labelDiv = document.createElement('div');
      labelDiv.className = 'label';
      labelDiv.textContent = building.userData.name;
      labelDiv.style.marginTop = '-1em';
      const label = new CSS2DObject(labelDiv);
      label.position.set(0, height + 0.5, 0);
      building.add(label);
    }

    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // Raycaster for mouse picking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildings);
      if (intersects.length > 0) {
        setSelectedBuilding(intersects[0].object.userData);
      } else {
        setSelectedBuilding(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Day/Night cycle
    const skyColor = new THREE.Color();
    const nightColor = new THREE.Color(0x001133);
    const dayColor = new THREE.Color(0x87CEEB);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate buildings
      buildings.forEach((building, index) => {
        building.rotation.y = Math.sin(elapsedTime * 0.5 + index) * 0.1;
        building.position.y = Math.sin(elapsedTime * 0.5 + index) * 0.1 + building.scale.y / 2;
      });

      // Day/Night cycle
      const dayNightCycle = (Math.sin(elapsedTime * 0.1) + 1) / 2;
      skyColor.copy(nightColor).lerp(dayColor, dayNightCycle);
      scene.background = skyColor;
      setIsNightMode(dayNightCycle < 0.5);

      // Update light intensity based on time of day
      ambientLight.intensity = 0.5 + dayNightCycle * 0.5;
      directionalLight.intensity = 0.8 * dayNightCycle;

      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    // Loading transition
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating loading time

    animate();

    // Resize handler
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeChild(labelRenderer.domElement);
      }
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          fontSize: '24px',
          zIndex: 1000,
        }}>
          Loading...
        </div>
      )}
      {selectedBuilding && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '300px',
        }}>
          <h3 style={{ marginTop: 0 }}>{selectedBuilding.name}</h3>
          <p>{selectedBuilding.description}</p>
          <p>{selectedBuilding.details}</p>
          <img src={selectedBuilding.image} alt={selectedBuilding.name} style={{ width: '100%', marginTop: '10px' }} />
        </div>
      )}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
      }}>
        {isNightMode ? '🌙 Night Mode' : '☀️ Day Mode'}
      </div>
    </div>
  );
};

export default ThreejsCityscape;