/** SCENE */
//what you viewing, where you had objects in, what you interact with
var scene = new THREE.Scene();

//set the world's color to white
scene.background = new THREE.Color(0xa9d9ef);



/** CAMERA */
//user see the world through this
//params: vertical field of view (how much you see), ratio of browser, near plane, far plane.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 40);



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
controls.minDistance = 15;
controls.maxDistance = 42;



/** LIGHT */
//add lighting
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var ambientLight =  new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);



/** MODEL */
//render model
function addAllStudentChair() {
    //sisi kanan
    //kursi pertama ada di tengah, loopingnya ke kanan
    var i,j,k,l,x=1.5,z=0; // x = 1.5 karena gamau mulai dari tengah 
    for(i=0 ; i<7 ; i++) {
        for(j=0 ; j<4 ; j++) {
            addStudentChair(x,z);
            z+=3.5;
        }
        x += 3;
        z = 0;
    }

    //sisi kiri
    //kursi pertama ada di kiri, looping ke kiri
    x = -4.5; // gap antara kursi-kursi di sisi kanan dan kiri
    for(i=0 ; i<6 ; i++) {
        for(j=0 ; j<4 ; j++) {
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
    for(j=0 ; j<14 ; j++) {
        addStudentChair(x,z);
        x-=3;
    }
}

function addAllWhiteBoard() {
    var i,x=-6;
    for(i=0 ; i<2 ; i++) {
        addWhiteBoard(x);
        x+=12.3;
    }
}

function addAllWindow() {
    var i,x = 19.5;
    for(i=0 ; i<14 ; i++) {
        addWindow(x);
        x-=3;
    }
}

function addAllLecturerTable() {
    var i,x = 8;
    for(i=0 ; i<2 ; i++) {
        addLecturerTable(x);
        x+=6;
    }
}

function addAllScreen() {
    var i,x = -8;
    for(i=0 ; i<2 ; i++) {
        addScreen(x);
        x+=13;
    }
}

function addAllProjector() {
    var i,x = -4;
    for(i=0 ; i<2 ; i++) {
        addProjector(x);
        x+=13;
    }
}

function addAllAC() {
    var i,x = -15;
    for(i=0 ; i<3 ; i++) {
        addAC(x);
        x+=15;
    }
}

function addAllLamp() {
    //lampu tengah ke belakang
    //lampu pertama ada di kiri, loopingnya ke kanan
    var i,j,k,l,x=-13,z=-5;
    for(i=0 ; i<3 ; i++) {
        for(j=0 ; j<3 ; j++) {
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
    for(j=0 ; j<3 ; j++) {
        addLamp(x,z,Math.PI/2);
        x+=13;
    }
}

function addStudentChair(x,z) {
    var loader = new THREE.JSONLoader();
    var callbackKursiMahasiswa = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturekursimahasiswa.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,4,z);
        scene.add( mesh );
    };
    loader.load( "models/kursimahasiswa.json", callbackKursiMahasiswa);
}

function addLecturerTable(x) {
    var loader = new THREE.JSONLoader();
    var callbackMejaDosen = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturemejadosen.jpg" );
        var material = new THREE.MeshBasicMaterial( { map: texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = 'lecturerTable';
        mesh.position.set(x,4.7,-8)
        mesh.rotation.y = (Math.PI/2) + (Math.PI);
        mesh.scale.set(2,2,2);
        scene.add( mesh );

        domEvents.addEventListener(mesh, 'click', function(event){
            console.log('you clicked on the table');
            selectProperty(mesh.name);
        }, false)
    };
    loader.load( "models/mejadosen.json", callbackMejaDosen);
}

function addWhiteBoard(x) {
    var loader = new THREE.JSONLoader();
    var callbackWhiteBoard = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturepapantulis.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = 'board';
        mesh.position.set(x,10,-12);
        mesh.scale.set(3.5,3.5,3.5);
        scene.add( mesh );

        domEvents.addEventListener(mesh, 'click', function(event){
            console.log('you clicked on the board');
            selectProperty(mesh.name);
        }, false)
        };
    loader.load( "models/papantulis.json", callbackWhiteBoard);
}

function addClock() {
    var loader = new THREE.JSONLoader();
    var callbackClock = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturejamdinding.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = 'clock';
        mesh.position.set(2.7,14,-15.2);
        scene.add( mesh );

        domEvents.addEventListener(mesh, 'click', function(event){
            console.log('you clicked on the clock');
            selectProperty(mesh.name);
        }, false)
        };
    loader.load( "models/jamdinding.json", callbackClock);
}

function addDoor() {
    var loader = new THREE.JSONLoader();
    var callbackDoor = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturepintu.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(-13,7.5,-14.6)
        mesh.scale.set(2,2,2);
        scene.add( mesh );
        };
    loader.load( "models/pintu.json", callbackDoor);
}

function addWindow(x) {
    var loader = new THREE.JSONLoader();
    var callbackWindow = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturejendela.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,10.2,17.1)
        mesh.scale.set(2,2,2);
        mesh.rotation.y = Math.PI;
        scene.add( mesh );
        };
    loader.load( "models/jendela.json", callbackWindow);
}

function addLecturerChair() {
    var loader = new THREE.JSONLoader();
    var callbackLecturerChair = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturekursidosen.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(10,5.5,-12);
        mesh.scale.set(1.5,1.5,1.5);
        scene.add( mesh );
        };
    loader.load( "models/kursidosen.json", callbackLecturerChair);
}

function addScreen(x) {
    var loader = new THREE.JSONLoader();
    var callbackScreen = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/textureacproyektorlayar.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,14.5,-14.9);
        scene.add( mesh );
        };
    loader.load( "models/layar.json", callbackScreen);
}

function addProjector(x) {
    var loader = new THREE.JSONLoader();
    var callbackProjector = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/textureacproyektorlayar.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,14,0);
        mesh.rotation.y = Math.PI;
        scene.add( mesh );
        };
    loader.load( "models/proyektor.json", callbackProjector);
}

function addAC(x) {
    var loader = new THREE.JSONLoader();
    var callbackAC = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/textureacproyektorlayar.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,13,14);
        mesh.rotation.y = Math.PI;
        scene.add( mesh );
        };
    loader.load( "models/ac.json", callbackAC);
}

function addLamp(x,z,rotation) {
    var loader = new THREE.JSONLoader();
    var callbackLamp = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturelampu.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,14.9,z);
        mesh.rotation.y = rotation;
        scene.add( mesh );
        };
    loader.load( "models/lampu.json", callbackLamp);
}

//room's attribute
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding8.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding8.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/textureatap.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturelantai8.jpg'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding8.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding8.jpg'), side: THREE.BackSide })
]

var length = 43;
var width = 12;
var height = 31;


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
//+++++++++++++++++++++++++
//select mesh feature
//the current selected mesh will be green
//+++++++++++++++++++++++++
var domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
function selectProperty(meshName) {
    var unselectedMesh = scene.getObjectByName('selectedMesh');
    scene.remove(unselectedMesh);
    unselectedMesh = undefined;

    var oriMesh = scene.getObjectByName(meshName);
    
    var selectedMaterial = new THREE.MeshBasicMaterial({ color: 0x3bff41, transparent: true, opacity: 0.5 });
    var selectedMesh = new THREE.Mesh( oriMesh.geometry, selectedMaterial );
    selectedMesh.name = 'selectedMesh';

    selectedMesh.position.set(oriMesh.position.x, oriMesh.position.y, oriMesh.position.z);
    selectedMesh.rotation.y = oriMesh.rotation.y;
    selectedMesh.scale.set(oriMesh.scale.x, oriMesh.scale.y, oriMesh.scale.z);

    scene.add(selectedMesh);
}

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
function getPanjangValue() {
    var e = document.getElementById("panjang");
    var strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
}

function getLebarValue() {
    var e = document.getElementById("lebar");
    var strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
}

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

//+++++++++++++++++++++++++++++++
//MODAL THINGS
//pop up the modal when the app opened for the first time
//+++++++++++++++++++++++++++++++
//get the modal
var modal = document.getElementById('start-modal');

//get the button
var btn = document.getElementById('modalBtn');

//refresh page when click the 'buat ulang desain'
//refresh the page because it will remove all of the current choice and bringing back the modal
btn.onclick = function () {
    location.reload();
}

//view the print option when click the 'print hasil desain'
function printPage() {
    window.print();
}

//++++++++++++++++++++++++++++++++
//MENU THINGS
//show which menu to show after the user select the how to start with
//++++++++++++++++++++++++++++++++
function showMenu(menu) {
    var divScracth = document.getElementById('menu-scratch');
    var div91Room = document.getElementById('menu-91room');

    if(menu=='scracth') {
        divScracth.style.display = "block";
        div91Room.style.display = "none";
    } else {
        divScracth.style.display = "none";
        div91Room.style.display = "block";
    }
}

//++++++++++++++++++++++++++++++++++
//VIEW THINGS
//view the room from inside and outside
//++++++++++++++++++++++++++++++++++
function changeViewMode(mode) {
    if(mode=='inside') {
        createRoom(undefined, 1);

        camera.position.set(0, 10, 0);
        controls.minDistance = 5;
        controls.maxDistance = 15;

        controls.target = new THREE.Vector3(0, 10, 0);
    } else {
        createRoom();

        camera.position.set(0, 10, 40);
        controls.minDistance = 10;
        controls.maxDistance = 42;
    }
}