var spaceman = document.getElementById('spaceman');

var rocks = document.getElementById('rocks');
var spacemanLeft= 500;
var spacemanTop= 800;

document.onkeydown = anim;
function anim(e){
    //move right
   if(e.keyCode==39){
        spacemanLeft +=10;
        spaceman.style.left = spacemanLeft + 'px';
         if(spacemanLeft >=950){
            spacemanLeft -= 10;
        }
    }
    //move left
   else if(e.keyCode==37){
        spacemanLeft -= 10;
       spaceman.style.left = spacemanLeft + 'px';
        if(spacemanLeft <=0){
            spacemanLeft += 10;
        }
   }
   //move up
    else if(e.keyCode==38){
        spacemanTop -= 10;
        spaceman.style.top = spacemanTop + 'px';
         if(spacemanTop < 10){
            spacemanTop -= -10;
        }
   }
   //move down
   else if(e.keyCode==40){
        spacemanTop += 10;
        spaceman.style.top = spacemanTop + 'px';
        if(spacemanTop >= 950){
            spacemanTop += -10;
        }

   }
} 
/*--------------------------------------------------------------------------*/
function preload() {
    asteroid = loadimage ('\Asteroids\asteroid1.png');
}
var asteroidArray = new Array();

asteroidArray[0] = new Image();
asteroidArray[0].src = 'assets\Asteroids\asteroid1.png';

asteroidArray[1] = new Image();
asteroidArray[1].src = 'assets\Asteroids\asteroid2.png';

asteroidArray[2] = new Image();
asteroidArray[2].src = 'assets\Asteroids\asteroid3.png';

asteroidArray[3] = new Image();
asteroidArray[3].src = 'assets\Asteroids\asteroid4.png';

asteroidArray[4] = new Image();
asteroidArray[4].src = 'assets\Asteroids\asteroid5.png';

asteroidArray[5] = new Image();
asteroidArray[5].src = 'assets\Asteroids\asteroid6.png';

asteroidArray[6] = new Image();
asteroidArray[6].src = 'assets\Asteroids\asteroid7.png';

asteroidArray[7] = new Image();
asteroidArray[7].src = 'assets\Asteroids\asteroid8.png';

/*--------------------------------------------------------------------------*/

function nextImage(element)
{
    var img = document.getElementById(element);

    for(var i = 0; i < asteroidArray.length;i++)
    {
        if(asteroidArray[i].src == img.src) // << check this
        {
            if(i === asteroidArray.length){
                document.getElementById(element).src = asteroidArray[0].src;
                break;
            }
            document.getElementById(element).src = asteroidArray[i+1].src;
            break;
        }
    }
}
/*--------------------------------------------------------------------------*/
// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// newly spawned objects start at Y=25
var spawnLineY = 25;

// spawn a new object every 1500ms
var spawnRate = 250;

// set how fast the objects will fall
var spawnRateOfDescent = 1.00;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start animating
animate();


function spawnRandomObject() {

    // select a random type for this new object
    var t;

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,
    }

    // add the new object to the objects[] array
    objects.push(object);
}

function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the line where new objects are spawned
    ctx.beginPath();
    ctx.moveTo(0, spawnLineY);
    ctx.lineTo(canvas.width, spawnLineY);
    ctx.stroke();

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }

}