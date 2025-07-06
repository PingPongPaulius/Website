import * as THREE from 'three';
import { useEffect, useRef } from "react";
import MouseHandler from "./MouseHandler";

function Canvas() {
    const refContainer = useRef(null);
    const pickPosition = {x: 0,y: 0};

    function createPlanet(size, colour, X, Y, Z) {
    var geometry = new THREE.SphereGeometry(size);
    var material = new THREE.MeshBasicMaterial({color: colour});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = X;
    mesh.position.y = Y;
    mesh.position.z = Z;

    return mesh
    };


    function createSystem(planet){
    let system = new THREE.Group();
    system.add(planet)
    return system;
    }

    function rotateAxis(planet, radius, angle, tilt){
      planet.position.x = radius * Math.cos(angle);
      planet.position.y = radius * Math.sin(angle) * Math.sin(tilt);
      planet.position.z = radius * Math.sin(angle) * Math.cos(tilt);
    }

    function getCanvasRelativePosition(event) {
      return {
        x: (event.clientX / window.innerWidth) * 2 - 1, 
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    function setPickPosition(event) {
      const pos = getCanvasRelativePosition(event);
      pickPosition.x = (pos.x);
      pickPosition.y = (pos.y);
      console.log(pickPosition);
    };

    const mousePointer = new MouseHandler();

    useEffect(() => {

    window.addEventListener("mouseup", setPickPosition);
    window.addEventListener("resize", onWindowResize);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 128;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var sun = createPlanet(16, 0xfd9f2b, 0, 0, 0);
    var earth = createPlanet(8, 0x5ae721, 40, 0, 0);

    let sunSystem = createSystem(sun)
    let earthSystem = createSystem(earth)

    let solarSystem = new THREE.Group();
    solarSystem.add(sunSystem, earthSystem);

    scene.add(solarSystem);


    let angle = 0.01;
    var animate = function () {
      requestAnimationFrame(animate);

      mousePointer.pick(pickPosition, scene, camera);

      angle += 0.01;
      sun.rotation.x += 0.01;
      sun.rotation.y += 0.01;
      rotateAxis(earth, 40, angle, 10);
      renderer.render(scene, camera)// Diagonal orbit equations
    };
    animate();
    }, []);

return (
    <div ref={refContainer}></div>
);}

export default Canvas;



