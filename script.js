var spaceman=document.getElementById('spaceman');
var container=document.getElementById('container');

var spacemanLeft= 0;
var spacemanTop= 0;
function anim(e){
   if(e.keyCode==39){
        spacemanLeft +=10;
        spaceman.style.left = spacemanLeft + 'px';
         if(spacemanLeft >=930){
            spacemanLeft -= 10;
        }
    }
   
   if(e.keyCode==37){
        spacemanLeft -= 10;
       spaceman.style.left = spacemanLeft + 'px';
        if(spacemanLeft <=0){
            spacemanLeft += 10;
        }
   }
    if(e.keyCode==38){
        spacemanTop -= 10;
        spaceman.style.top = spacemanTop + 'px';
         if(spacemanTop >= 950){
            spacemanTop -= 10;
        }
   }
   if(e.keyCode==40){
        spacemanTop += 10;
        spaceman.style.top = spacemanTop + 'px';
        if(spacemanTop <=0){
            spacemanTop += 10;
        }

   }
}
document.onkeydown = anim;
