let spaceman = document.getElementById('spaceman');
let spacemanLeft= 1008;
let spacemanTop= 840;
let start_time = Date.now();

let pauseSpeedup = 0;

document.onkeydown = anim;
function anim(e){
    //move right
   if(e.keyCode==39){
        spacemanLeft += 10;
        spaceman.style.left = spacemanLeft + 'px';
         if(spacemanLeft >=1480){
            spacemanLeft -= 10;
        }
    }
    //move left
   else if(e.keyCode==37){
        spacemanLeft -= 10;
       spaceman.style.left = spacemanLeft + 'px';
        if(spacemanLeft <=532){
            spacemanLeft += 10;
        }
   }
   //move up
    else if(e.keyCode==38){
        spacemanTop -= 10;
        spaceman.style.top = spacemanTop + 'px';
         if(spacemanTop < 30){
            spacemanTop -= -10;
        }
   }
   //move down
   else if(e.keyCode==40){
        spacemanTop += 10;
        spaceman.style.top = spacemanTop + 'px';
        if(spacemanTop >= 940){
            spacemanTop += -10;
        }

   }
} 
/*--------------------------------------------------------------------------*/

let asteroidArray = [];

asteroidArray[0] = new Image();
asteroidArray[0].src = 'assets/Asteroids/asteroid1.png';

asteroidArray[1] = new Image();
asteroidArray[1].src = 'assets/Asteroids/asteroid2.png';

asteroidArray[2] = new Image();
asteroidArray[2].src = 'assets/Asteroids/asteroid3.png';

asteroidArray[3] = new Image();
asteroidArray[3].src = 'assets/Asteroids/asteroid4.png';

asteroidArray[4] = new Image();
asteroidArray[4].src = 'assets/Asteroids/asteroid5.png';

asteroidArray[5] = new Image();
asteroidArray[5].src = 'assets/Asteroids/asteroid6.png';

asteroidArray[6] = new Image();
asteroidArray[6].src = 'assets/Asteroids/asteroid7.png';

asteroidArray[7] = new Image();
asteroidArray[7].src = 'assets/Asteroids/asteroid8.png';

/*--------------------------------------------------------------------------*/

let RareItemsArray = [];

RareItemsArray[0] = new Image();
RareItemsArray[0].src = 'assets/RareItems/moon1.png';

RareItemsArray[1] = new Image();
RareItemsArray[1].src = 'assets/RareItems/moon2.png';

RareItemsArray[2] = new Image();
RareItemsArray[2].src = 'assets/RareItems/orb1.png';

RareItemsArray[3] = new Image();
RareItemsArray[3].src = 'assets/RareItems/orb2.png';

RareItemsArray[4] = new Image();
RareItemsArray[4].src = 'assets/RareItems/orb3.png';

RareItemsArray[5] = new Image();
RareItemsArray[5].src = 'assets/RareItems/planet1.png';

RareItemsArray[6] = new Image();
RareItemsArray[6].src = 'assets/RareItems/planet2.png';

RareItemsArray[7] = new Image();
RareItemsArray[7].src = 'assets/RareItems/planet3.png';

RareItemsArray[8] = new Image();
RareItemsArray[8].src = 'assets/RareItems/planet4.png';
/*--------------------------------------------------------------------------*/
function nextImage(element)
{
    let img = document.getElementById(element);

    for(let i = 0; i < asteroidArray.length;i++)
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

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
/*--------------------------------------------------------------------------*/
// get a refrence to the canvas and its context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// newly spawned objects start at Y=25
let spawnLineY = -30;

// spawn a new object every 1500ms
let spawnRate = 200;

// set how fast the objects will fall
let spawnRateOfDescent = 1.00;

// when was the last object spawned
let lastSpawn = -1;

// this array holds all spawned object
let objects = [];

// save the starting time (used to calc elapsed time)
let startTime = Date.now();

// start animating
animate();


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function spawnRandomObject() {
    let t = ""
    if (randomIntFromInterval(1,100) > 5) {
        // select a random type for this new object
         t =  asteroidArray [randomIntFromInterval(0, asteroidArray.length-1)]
    }else{
         t =  RareItemsArray [randomIntFromInterval(0, RareItemsArray.length-1)]
    }
    
// console.log(t.src)
    // create the new object
    let object = {
        // set this objects type
        image: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,

        AngleDegrees: randomIntFromInterval(0, 360),
        
        RotationSpeed: randomIntFromInterval(0, 1)
    }
    // add the new object to the objects[] array
    objects.push(object);
}

function animate() {

    // get the elapsed time
    let time = Date.now();


    var time_elapsed = time - start_time; //in ms
    // strip the ms
    time_elapsed /= 1000;  34

    // get seconds 
    var seconds = Math.round(time_elapsed);
    console.log(seconds + " seconds");

    if(pauseSpeedup == 0 & seconds % 2 == 0 & seconds  != 0){
        pauseSpeedup = 1
        spawnRateOfDescent=Math.min(spawnRateOfDescent*1.05,8)
    }else if(seconds % 2 != 0){
        pauseSpeedup = 0
    }

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // move each object down the canvas
    for (let i = 1; i < objects.length; i++) {
        let object = objects[i];
        
       // console.log(object.AngleDegrees)
        object.AngleDegrees = (object.AngleDegrees + object.RotationSpeed) % 360
       // console.log(object.AngleDegrees)
        object.y += spawnRateOfDescent;
        //ctx.beginPath();
        ctx.drawImage(object.image, object.x, object.y)    
    }

}