/** IMPORT JSON */
var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "data.json";
console.log(constant)

/** SCENE */
//what you viewing, where you had objects in, what you interact with
var scene = new THREE.Scene();

//set the world's color to white
scene.background = new THREE.Color(constant.worldColor);



/** CAMERA */
//user see the world through this
//params: vertical field of view (how much you see), ratio of browser, near plane, far plane.
var cameraConstant = constant.camera
var camera = new THREE.PerspectiveCamera(cameraConstant.init.verticalField, window.innerWidth / window.innerHeight, cameraConstant.init.nearPlane, cameraConstant.init.farPlane, 100);
camera.position.set(cameraConstant.position.x, cameraConstant.position.y, cameraConstant.position.z);



/** RENDERER */
//make its own canvas element, because it have no params (not anymore hehe)
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
renderer.setSize(window.innerWidth/1.5, window.innerHeight);
document.body.appendChild(renderer.domElement);

//render the scene
var render = function() {
    renderer.render(scene, camera);
}

//responsive renderer size
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
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


/** LIGHT */
//add lighting
// var light1 = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light1);

// var ambientLight =  new THREE.AmbientLight(0xFFFFFF, 0.8);
// scene.add(ambientLight);



/** MODEL */
//render model
function addAllStudentChair() {
    //sisi kanan
    //kursi pertama ada di tengah, loopingnya ke kanan
    var studentChairConstant = constant.classProperties.studentChair
    var i,j,k,l,x=1.5,z=0; // x = 1.5 karena gamau mulai dari tengah 
    for(i=0 ; i<studentChairConstant.rightSideQuantity ; i++) {
        for(j=0 ; j<studentChairConstant.rightRowQuantity ; j++) {
            addStudentChair(x,z);
            z+=3.5;
        }
        x += 3;
        z = 0;
    }

    //sisi kiri
    //kursi pertama ada di kiri, looping ke kiri
    x = -4.5; // gap antara kursi-kursi di sisi kanan dan kiri
    for(i=0 ; i<studentChairConstant.leftSideQuantity ; i++) {
        for(j=0 ; j<studentChairConstant.leftRowQuantity ; j++) {
            addStudentChair(x,z);
            z+=3.5;
        }
        x -= 3;
        z = 0;
    }

    //baris paling belakang yang nyambung
    //kursi pertama ada di pojok kanan belakang
    x = 19.5;
    z = 14;
    for(j=0 ; j<studentChairConstant.lastRowQuantity ; j++) {
        addStudentChair(x,z);
        x-=3;
    }
}

function addAllWhiteBoard() {
    var i,x=-6;
    var whiteBoardConstant = constant.classProperties.whiteBoard
    for(i=0 ; i<whiteBoardConstant.quantity ; i++) {
        addWhiteBoard(x);
        x+=12.3;
    }
}

function addAllWindow() {
    var i,x = 19.5;
    var windowConstant = constant.classProperties.window
    for(i=0 ; i<windowConstant.quantity ; i++) {
        addWindow(x);
        x-=3;
    }
}

function addAllLecturerTable() {
    var i,x = 8;
    var lecturerTableConstant = constant.classProperties.lecturerTable
    for(i=0 ; i<lecturerTableConstant.quantity ; i++) {
        addLecturerTable(x);
        x+=6;
    }
}

function addAllScreen() {
    var i,x = -8;
    var screenConstant = constant.classProperties.screen
    for(i=0 ; i<screenConstant.quantity ; i++) {
        addScreen(x);
        x+=13;
    }
}

function addAllProjector() {
    var i,x = -4;
    var projectorConstant = constant.classProperties.projector
    for(i=0 ; i<projectorConstant.quantity ; i++) {
        addProjector(x);
        x+=13;
    }
}

function addAllAC() {
    var i,x = -15;
    var acConstant = constant.classProperties.ac
    for(i=0 ; i<acConstant.quantity ; i++) {
        addAC(x);
        x+=15;
    }
}

function addAllLamp() {
    //lampu tengah ke belakang
    //lampu pertama ada di kiri, loopingnya ke kanan
    var i,j,k,l,x=-13,z=-5;
    var lampConstant = constant.classProperties.lamp
    for(i=0 ; i<lampConstant.sideQuantity ; i++) {
        for(j=0 ; j<lampConstant.rowQuantity ; j++) {
            addLamp(x,z,(Math.PI));
            z+=8;
        }
        x += 13;
        z = -5;
    }

    //lampu depan dekat papan tulis
    //kursi pertama ada di pojok kiri depan
    x = -14;
    z = -10;
    for(j=0 ; j<lampConstant.frontQuantity ; j++) {
        addLamp(x,z,Math.PI/2);
        x+=13;
    }
}

function addStudentChair(x,z) {
    var studentChair = constant.classProperties.studentChair
    var loader = new THREE.JSONLoader();
    var callbackKursiMahasiswa = function( geometry ) {
        var texture = new THREE.TextureLoader().load(studentChair.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,4,z);
        scene.add( mesh );
    };
    loader.load(studentChair.model, callbackKursiMahasiswa);
}

function addLecturerTable(x) {
    var lecturerTable = constant.classProperties.lecturerTable
    var loader = new THREE.JSONLoader();
    var callbackMejaDosen = function( geometry ) {
        var texture = new THREE.TextureLoader().load(lecturerTable.texture);
        var material = new THREE.MeshBasicMaterial( { map: texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,4.7,-8)
        mesh.rotation.y = (Math.PI/2) + (Math.PI);
        mesh.scale.set(2,2,2);
        scene.add( mesh );
    };
    loader.load(lecturerTable.model, callbackMejaDosen);
}

function addWhiteBoard(x) {
    var loader = new THREE.JSONLoader();
    var whiteBoard = constant.classProperties.whiteBoard
    var callbackWhiteBoard = function( geometry ) {
        var texture = new THREE.TextureLoader().load(whiteBoard.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = 'board';
        mesh.position.set(x,10,-12);
        mesh.scale.set(3.5,3.5,3.5);
        scene.add( mesh );
        };
    loader.load(whiteBoard.model, callbackWhiteBoard);
}

function addClock() {
    var loader = new THREE.JSONLoader();
    var clock = constant.classProperties.clock
    var callbackClock = function( geometry ) {
        var texture = new THREE.TextureLoader().load(clock.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = 'clock';
        mesh.position.set(2.7,14,-15.2);
        scene.add( mesh );
        };
    loader.load(clock.model, callbackClock);
}

function addDoor() {
    var loader = new THREE.JSONLoader();
    var door = constant.classProperties.door
    var callbackDoor = function( geometry ) {
        var texture = new THREE.TextureLoader().load(door.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(-13,7.5,-14.6)
        mesh.scale.set(2,2,2);
        scene.add( mesh );
        };
    loader.load(door.model, callbackDoor);
}

function addWindow(x) {
    var loader = new THREE.JSONLoader();
    var window = constant.classProperties.window
    var callbackWindow = function( geometry ) {
        var texture = new THREE.TextureLoader().load(window.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,10.2,17.1)
        mesh.scale.set(2,2,2);
        mesh.rotation.y = Math.PI;
        scene.add( mesh );
        };
    loader.load(window.model, callbackWindow);
}

function addLecturerChair() {
    var loader = new THREE.JSONLoader();
    var lecturerChair = constant.classProperties.lecturerChair
    var callbackLecturerChair = function( geometry ) {
        var texture = new THREE.TextureLoader().load(lecturerChair.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(10,5.5,-12);
        mesh.scale.set(1.5,1.5,1.5);
        scene.add( mesh );
        };
    loader.load(lecturerChair.model, callbackLecturerChair);
}

function addScreen(x) {
    var loader = new THREE.JSONLoader();
    var screen = constant.classProperties.screen
    var callbackScreen = function( geometry ) {
        var texture = new THREE.TextureLoader().load(screen.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,14.5,-14.9);
        scene.add( mesh );
        };
    loader.load(screen.model, callbackScreen);
}

function addProjector(x) {
    var loader = new THREE.JSONLoader();
    var projector = constant.classProperties.projector
    var callbackProjector = function( geometry ) {
        var texture = new THREE.TextureLoader().load(projector.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,14,0);
        mesh.rotation.y = Math.PI;
        scene.add( mesh );
        };
    loader.load(projector.model, callbackProjector);
}

function addAC(x) {
    var loader = new THREE.JSONLoader();
    var ac = constant.classProperties.ac
    var callbackAC = function( geometry ) {
        var texture = new THREE.TextureLoader().load(ac.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,13,14);
        mesh.rotation.y = Math.PI;
        scene.add( mesh );
        };
    loader.load(ac.model, callbackAC);
}

function addLamp(x,z,rotation) {
    var loader = new THREE.JSONLoader();
    var lamp = constant.classProperties.lamp
    var callbackLamp = function( geometry ) {
        var texture = new THREE.TextureLoader().load(lamp.texture);
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,14.9,z);
        mesh.rotation.y = rotation;
        scene.add( mesh );
        };
    loader.load(lamp.model, callbackLamp);
}

//room's attribute
var texture = constant.room.texture
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[7]), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[7]), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.ceiling), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.floor[7]), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[7]), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture.wall[7]), side: THREE.BackSide })
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



/** FEATURE */
//++++++++++++++++++++++++++++
//the main function to change the wall and tile's color
//++++++++++++++++++++++++++++
function changeMaterial(id) {
    if(id.charAt(0)=='a' || id.charAt(0)=='d') {
        setWallColor(id.charAt(5));
    } else if(id.charAt(0)=='e' || id.charAt(0)=='b'){
        setTileColor(id.charAt(5));
    }
}

//++++++++++++++++++++++++++++
//change the wall color
//++++++++++++++++++++++++++++
function setWallColor(number) {
    cubeMaterials[0] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding' + number + '.jpg'), side: THREE.BackSide });
    cubeMaterials[1] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding' + number + '.jpg'), side: THREE.BackSide });
    cubeMaterials[4] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding' + number + '.jpg'), side: THREE.BackSide });
    cubeMaterials[5] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding' + number + '.jpg'), side: THREE.BackSide });
    createRoom();
}

//+++++++++++++++++++++++++++++
//change the tile color
//+++++++++++++++++++++++++++++
function setTileColor(number) {
    cubeMaterials[3] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturelantai' + number +'.jpg'), side: THREE.DoubleSide });
    createRoom();
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
    addAllStudentChair();
    addAllLecturerTable();
    addAllWhiteBoard();
    addClock();
    addDoor();
    addAllWindow();
    addLecturerChair();
    addAllScreen();
    addAllProjector();
    addAllAC();
    addAllLamp();
}
startDesign();

/** RECEIVING INPUT FROM INTERFACE */
function thumbnailClicked(id) {
    for(i=1 ; i<=8 ; i++) {
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
        document.getElementById(removeId).style.border = "none";
    }
    document.getElementById(id).style.border = "3px solid";
    console.log(id);

    changeMaterial(id);
}



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
        createRoom();

        var inside = view.inside
        camera.position.set(inside.cameraPosition.x, inside.cameraPosition.y, inside.cameraPosition.z);
        controls.minDistance = inside.control.minZoom;
        controls.maxDistance = inside.control.maxZoom;

        controls.target = new THREE.Vector3(inside.target.x, inside.target.y, inside.target.z);
    } else {
        createRoom();

        var outside = view.outside
        camera.position.set(outside.cameraPosition.x, outside.cameraPosition.y, outside.cameraPosition.z);
        controls.minDistance = outside.control.minZoom;
        controls.maxDistance = outside.control.maxZoom;

        controls.target = new THREE.Vector3(outside.target.x, outside.target.y, outside.target.z);
    }
}