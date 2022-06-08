var spaceman=document.getElementById('spaceman');
var container=document.getElementById('container');

var spacemanLeft= 500;
var spacemanTop= 800;

document.onkeydown = anim;

function anim(e){
   if(e.keyCode==39){
        spacemanLeft +=10;
        spaceman.style.left = spacemanLeft + 'px';
         if(spacemanLeft >=950){
            spacemanLeft -= 10;
        }
    }
   
   else if(e.keyCode==37){
        spacemanLeft -= 10;
       spaceman.style.left = spacemanLeft + 'px';
        if(spacemanLeft <=0){
            spacemanLeft += 10;
        }
   }
    else if(e.keyCode==38){
        spacemanTop -= 10;
        spaceman.style.top = spacemanTop + 'px';
         if(spacemanTop < 10){
            spacemanTop -= -10;
        }
   }
   else if(e.keyCode==40){
        spacemanTop += 10;
        spaceman.style.top = spacemanTop + 'px';
        if(spacemanTop >= 950){
            spacemanTop += -10;
        }

   }
} 

