var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var fovMax = 95,
fovMin = 5,
fovTmp = 0;
//responsive renderer size
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
})

//making control of the camera
controls = new THREE.OrbitControls(camera, renderer.domElement);

var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

//render model


// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.load( "kursiftis.mtl", function( materials ) {
//     materials.preload();
//     var objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials( materials );
//     objLoader.load("models/kursiftis.obj", function ( object ) {
//         scene.add(object);
//     });
// });




// var loader = new THREE.OBJLoader();

// // load a resource
// loader.load(
//     // resource URL
//     'models/kursiftis.obj',
//     // Function when resource is loaded
//     function ( object ) {
//         scene.add( object );
//     }
// );



// var loader = new THREE.ObjectLoader();
// loader.load("models/kursiftis.json",function ( obj ) {
//     scene.add( obj );
// });



// var loader = new THREE.ObjectLoader();
// loader.load("models/monster.obj",function ( obj ) {
//     scene.add( obj );
// });

// var loader = new THREE.JSONLoader();
// loader.load( 'models/monster.json', function ( geometry, materials ) {
//     var mesh = new THREE.Mesh( geometry, new (THREE.MultiMaterial)(materials) );
//     scene.add( mesh );
// });

// var loader = new THREE.JSONLoader();
// loader.load( 'models/dog.json', function ( geometry, materials ) {
//     var material = [
//         new THREE.MeshStandardMaterial( { color: 0x00ff00 } ),
//     ];
//     var mesh = new THREE.Mesh( geometry, material );
//     scene.add( mesh );
//     var loader = new THREE.TextureLoader();
//     loader.load("models/dogUV.png", function(texture) {
//         console.log("masuk kok")
//         // Apply texture to material.
//         materials.map = texture;
//         // Maybe this is needed.
//         materials.needsUpdate = true;
//     })
// });





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
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,4.7,-8)
        mesh.rotation.y = (Math.PI/2) + (Math.PI);
        mesh.scale.set(2,2,2);
        scene.add( mesh );
        };
    loader.load( "models/mejadosen.json", callbackMejaDosen);
}

function addWhiteBoard(x) {
    var loader = new THREE.JSONLoader();
    var callbackWhiteBoard = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturepapantulis.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x,10,-12);
        mesh.scale.set(3.5,3.5,3.5);
        scene.add( mesh );
        };
    loader.load( "models/papantulis.json", callbackWhiteBoard);
}

function addClock() {
    var loader = new THREE.JSONLoader();
    var callbackClock = function( geometry ) {
        var texture = new THREE.TextureLoader().load( "models/texturejamdinding.jpg" );
        var material = new THREE.MeshBasicMaterial( { map : texture } ); 
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(2.7,14,-15.2);
        scene.add( mesh );
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

function createRoom() {
    // create shape
    // params: x, y, and z axis
    var geometry = new THREE.BoxGeometry( 43, 12, 31 )
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding.jpg'), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding.jpg'), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/textureatap.jpg'), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturelantai.jpg'), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding.jpg'), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/texturedinding.jpg'), side: THREE.DoubleSide }),
    ]

    // create a material, colour, and image texture
    var material = new THREE.MeshFaceMaterial(cubeMaterials);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.y = 9.05;
    scene.add(cube);
}

function init() {
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

init();

camera.position.set(-1, 8, 10);

var ambientLight =  new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);

//update the scene
var update = function(){
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.005;
}

//render the scene
var render = function() {
    renderer.render(scene, camera);
}

//run all the animation (update, render, repeat )
var main = function() {
    requestAnimationFrame(main);
    update();
    render ();
}

main();