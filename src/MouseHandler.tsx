import * as THREE from 'three';

class MouseHandler{

    constructor(){
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
    }

    pick(position, scene, camera){

        if (this.pickedObject){
            console.log("Goal");
            this.pickedObject=null;
        }

        this.raycaster.setFromCamera(position, camera);
        const capturedObjects = this.raycaster.intersectObjects(scene.children);

        if(capturedObjects.length){
            this.pickedObject = capturedObjects[0].object;
        }
    }

}

export default MouseHandler;
