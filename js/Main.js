/** READ LOCAL JSON */
var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "modeKuliah.json";
console.log(constant)


/** IMPORT JSON (UPLOAD) */
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    
}

function onReaderLoad(event){
    // console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    // console.log(obj.worldColor)
    loadJSON(obj);
}

document.getElementById('file').addEventListener('change', onChange);


var cubeMaterials;
var camera;
var constant;
var renderer;
function loadJSON(constant) {
    this.constant = constant;
    console.log(constant);

    /** SCENE */
    //what you viewing, where you had objects in, what you interact with
    var scene = new THREE.Scene();

    //set the world's color to white
    scene.background = new THREE.Color(constant.worldColor);



    /** CAMERA */
    //user see the world through this
    //params: vertical field of view (how much you see), ratio of browser, near plane, far plane.
    var viewConstant = constant.view
    camera = new THREE.PerspectiveCamera(viewConstant.init.verticalField, window.innerWidth / window.innerHeight, viewConstant.init.nearPlane, viewConstant.init.farPlane);
    camera.position.set(viewConstant.outside.cameraPosition.x, viewConstant.outside.cameraPosition.y, viewConstant.outside.cameraPosition.z);

    /** RENDERER */
    //make its own canvas element, because it have no params (not anymore hehe)
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setSize(window.innerWidth/1.5, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    document.getElementById('model').appendChild(renderer.domElement);

    //render the scene
    var render = function() {
        renderer.render(scene, camera);
    }

    //responsive renderer size
    window.addEventListener('resize', function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width/1.5, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    })



    /** CONTROL */
    //making control of the camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //initialize camera zoom
    var controlConstant = constant.control
    controls.minDistance = controlConstant.minZoom;
    controls.maxDistance = controlConstant.maxZoom;

    function loadModelFromJSON() {
        var classProperties = constant.classProperties;
    
        var i,a,b;
        for(i=0 ; i<classProperties.length ; i++) {
            var property = classProperties[i];
            var dx = property.dx;
            var dy = property.dy;
            var dz = property.dz;
            var distancex = property.distancex;
            var distancez = property.distancez;
            for(a=0 ; a<property.repeatz ; a++) {
                for(b=0 ; b<property.repeatx ; b++) {
                    addPropertyToScene(property, dx, dy, dz);
                    dx = dx + distancex;
                }
                dx = property.dx;
                dz = dz + distancez;
            }
        }
    
    
        function addPropertyToScene(property, dx, dy, dz) {
            var loader = new THREE.JSONLoader();
            var callbackProperty = function(geometry) {
                var texture = new THREE.TextureLoader().load(property.texture);
                var material = new THREE.MeshBasicMaterial( { map : texture } ); 
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(dx,dy,dz);
                mesh.scale.set(property.scale,property.scale,property.scale);
                mesh.rotation.y = property.rotation;
                scene.add(mesh);
            };
            loader.load(property.model, callbackProperty);
        }
    }

    //room's attribute
    var texture = constant.room.texture
    cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[0]), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[0]), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.ceiling), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.floor[0]), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[0]), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[0]), side: THREE.BackSide })
    ]

    var size = constant.room.size
    var length = size.length;
    var width = size.width;
    var height = size.height;


    function createRoom() {
        var previousRoom = scene.getObjectByName('room');
        scene.remove(previousRoom);
        previousRoom = undefined;

        // create shape
        // params: x, y, and z axis
        var geometry = new THREE.BoxGeometry(length, width, height);

        // create a material, colour, and image texture
        var material = new THREE.MeshFaceMaterial(cubeMaterials);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.y = 9.05;
        cube.name = 'room';
        scene.add(cube);
    }

    


    //+++++++++++++++++++++++++++++
    //change the room size
    //+++++++++++++++++++++++++++++
    function setRoomLength(length) {
        length = length;
        createRoom();
    }

    function setRoomWidth(width) {
        width = width;
        createRoom();
    }

    function setRoomHeight(height) {
        height = height;
        createRoom();
    }

    var wallDiv = document.getElementById('wallTextures');
    while(wallDiv.firstChild) {
        wallDiv.removeChild(wallDiv.firstChild);
    }

    var floorDiv = document.getElementById('floorTextures');
    while(floorDiv.firstChild) {
        floorDiv.removeChild(floorDiv.firstChild);
    }

    var wallTextureArr = constant.room.texture.wall;
    console.log("length wall ", wallTextureArr.length);
    for (i = 0; i < wallTextureArr.length; i++) { 
        var x = document.createElement("IMG");
        var id = "dwall" + i;
        x.setAttribute("src", wallTextureArr[i]);
        x.setAttribute("class", "img-thumbnails");
        x.setAttribute("id", id);
        document.getElementById('wallTextures').appendChild(x);
    }

    var floorTextureArr = constant.room.texture.floor;
    console.log("length florr ", floorTextureArr.length);
    for (i = 0; i < floorTextureArr.length; i++) { 
        var x = document.createElement("IMG");
        var id = "ewall" + i;
        x.setAttribute("src", floorTextureArr[i]);
        x.setAttribute("class", "img-thumbnails");
        x.setAttribute("id", id);
        document.getElementById('floorTextures').appendChild(x);
    }


    /** MAIN */
    //update the scene
    var update = function(){
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.005;
    }

    //run all the animation (update, render, repeat )
    var main = function() {
        requestAnimationFrame(main);
        // update();
        render ();
    }

    main();

    function startDesign() {
        createRoom();
        loadModelFromJSON();
    }
    startDesign();
}

loadJSON(constant);

    


/** LIGHT */
//add lighting
// var light1 = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light1);

// var ambientLight =  new THREE.AmbientLight(0xFFFFFF, 0.8);
// scene.add(ambientLight);



/** MODEL */
//render model

/** FEATURE */
//++++++++++++++++++++++++++++
//the main function to change the wall and tile's color
//++++++++++++++++++++++++++++
function changeMaterial(id, src) {
    if(id.charAt(0)=='a' || id.charAt(0)=='d') {
        setWallColor(src);
    } else if(id.charAt(0)=='e' || id.charAt(0)=='b'){
        setTileColor(src);
    }
}

//++++++++++++++++++++++++++++
//change the wall color
//++++++++++++++++++++++++++++
function setWallColor(src) {
    cubeMaterials[0] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(src), side: THREE.BackSide });
    cubeMaterials[1] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(src), side: THREE.BackSide });
    cubeMaterials[4] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(src), side: THREE.BackSide });
    cubeMaterials[5] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(src), side: THREE.BackSide });
}


//+++++++++++++++++++++++++++++
//change the tile color
//+++++++++++++++++++++++++++++
function setTileColor(src) {
    cubeMaterials[3] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(src), side: THREE.DoubleSide });
}


document.getElementById("wallTextures").addEventListener("click", function(e) {
    if(e.target && e.target.nodeName == "IMG") {
        thumbnailClicked(e.target.id, e.target.src);
    }
})


document.getElementById("floorTextures").addEventListener("click", function(e) {
    if(e.target && e.target.nodeName == "IMG") {
        thumbnailClicked(e.target.id, e.target.src);
    }
})



/** JS FOR THE INTERFACE */
//refresh page when click the 'buat ulang desain'
//refresh the page because it will remove all of the current choice
var btn = document.getElementById('refreshBtn');
btn.onclick = function () {
    location.reload();
}

//view the print option when click the 'print hasil desain'
function printPage() {
    window.print();
}

//++++++++++++++++++++++++++++++++++
//VIEW THINGS
//view the room from inside and outside
//++++++++++++++++++++++++++++++++++
function changeViewMode(mode) {
    var view = constant.view
    if(mode=='inside') {

        var inside = view.inside
        camera.position.set(inside.cameraPosition.x, inside.cameraPosition.y, inside.cameraPosition.z);
        controls.minDistance = inside.control.minZoom;
        controls.maxDistance = inside.control.maxZoom;

        controls.target = new THREE.Vector3(inside.target.x, inside.target.y, inside.target.z);
    } else {

        var outside = view.outside
        camera.position.set(outside.cameraPosition.x, outside.cameraPosition.y, outside.cameraPosition.z);
        controls.minDistance = outside.control.minZoom;
        controls.maxDistance = outside.control.maxZoom;

        controls.target = new THREE.Vector3(outside.target.x, outside.target.y, outside.target.z);
    }
}

/** RECEIVING INPUT FROM INTERFACE */
function thumbnailClicked(id, src) {
    // console.log(id);
    for(i=1 ; i<=constant.room.texture.wall.length ; i++) {
        if(id.charAt(0) == 'a') {
            var removeId = 'awall' + i;
        } else if (id.charAt(0) == 'b') {
            var removeId = 'btile' + i;
        } else if(id.charAt(0) == 'c') {
            var removeId = 'cprop' + i;
        } else if(id.charAt(0) == 'd') {
            var removeId = 'dwall' + i;
        } else {
            var removeId = 'etile' + i;
        }
        // document.getElementById(removeId).style.border = "none";
    }
    // document.getElementById(id).style.border = "3px solid";

    changeMaterial(id, src);
}

window.addEventListener("error", handleError, true);

function handleError(evt) {
    if (evt.message) { // Chrome sometimes provides this
      alert("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
      console.log("error: ",evt.message ," at linenumber: ",evt.lineno," of file: ",evt.filename);
    } else {
      alert("TERDAPAT KESALAHAN PADA BERKAS JSON YANG ANDA UNGGAH PADA BAGIAN "+(evt.srcElement || evt.target));
      console.log("error: ",evt.type," from element: ",(evt.srcElement || evt.target));
    }
}