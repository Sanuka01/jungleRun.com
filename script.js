
var runSound = new Audio("run.wav")

var jumpSound = new Audio("jump.wav")

var deadSound = new Audio("dead.wav")

var gameover = new Audio("gameover.mp3")

var rap = new Audio("tinkiri.mp3")

function k(event){
    if (event.which==13){
        if (runWorker == 0){
            runWorker = setInterval(run,100);

            rap.play();

            runSound.play();

            backgroundWorker = setInterval(background,100);
            scoreWorker = setInterval(score,100);

            boxId = box();
            boxWorker = setInterval(movebox, 100);
        }
    }

    if (event.which==32){

        if (jumpWorker == 0){
            clearInterval(runWorker);
            runSound.pause();

            jumpWorker = setInterval(jump,100);
            jumpSound.play();
        }
        
    }
}

var runWorker = 0;

var runImage = 1;

function run(){
    runImage = runImage + 1;

    if(runImage == 11){
        runImage = 1;        
    }

    document.getElementById("boy").src = "Run ("+runImage+").png";
}

var backgroundWorker = 0;

var x = 0;

function background(){
    x = x - 20 ;
    document.getElementById("background").style.backgroundPositionX = x +"px";
}

var jumpWorker = 0;

var jumpImage = 1;

var bmt = 396;

function jump(){

    if (jumpImage <= 5){
        bmt = bmt - 40;
        document.getElementById("boy").style.marginTop = bmt + "px";
    }

    if (jumpImage >= 6){
        bmt = bmt + 40;
        document.getElementById("boy").style.marginTop = bmt + "px";
    }

    jumpImage = jumpImage + 1;

    if (jumpImage==11){
        jumpImage = 1;

        clearInterval(jumpWorker)
        runWorker = setInterval(run,100);

        runSound.play();

        jumpWorker = 0;

        if (backgroundWorker == 0){
            backgroundWorker = setInterval(background,100);
        }

        if (scoreWorker == 0){
            scoreWorker = setInterval(score,300);
        }

        if(boxId == 0){
            boxId = box();
        }

        if(boxWorker == 0){
            boxWorker = setInterval(movebox, 100);
        }
    }

    document.getElementById("boy").src = "Jump ("+jumpImage+").png";
}


var scoreWorker = 0;

var s = 0;

function score(){
    s = s + 10;
    document.getElementById("score").innerHTML = s;
}

var boxId = 0;

var bml = 0;

function box(){
    for(var a = 0; a < 100; a++){
        var box = document.createElement("div");
        box.className = "box"
        box.id = "d" + a;

        if(a <= 5){
            bml = bml + 1000;
        }

        if(a >= 6){
            bml = bml + 800;
        }

        box.style.marginLeft = bml + "px";
        document.getElementById("background").appendChild(box);
    }
}

var boxWorker = 0;

var b = 0;

function movebox(){

    for (var a = 0; a < 100; a++){

        var z = getComputedStyle(document.getElementById("d" + a));

        var p = parseInt(z.marginLeft);
        p = p - 20;
        document.getElementById("d" + a).style.marginLeft = p +"px";

        if (p >= 70 & p <= 130){
            
            if (bmt > 385){
                
                clearInterval(runWorker);
                runWorker = -1;
                runSound.pause();

                clearInterval(jumpWorker);
                jumpWorker = -1;
                jumpSound.pause();

                clearInterval(boxWorker);
                clearInterval(backgroundWorker);
                clearInterval(scoreWorker);

                setInterval(dead,100);
                deadSound.play();

                gameover.play();

                rap.play();
            }
        }

    }
}

var deadImage = 1;

function dead(){
    deadImage = deadImage + 1;

    if (deadImage == 11){
        deadImage = 10;
        document.getElementById("boy").style.marginTop = "396px";

        document.getElementById("end").style.visibility = "visible";

        document.getElementById("endscore").innerHTML = s;
    }

    document.getElementById("boy").src = "Dead ("+deadImage+").png";
}



function r(){

    location.reload();
}

function j(){

    
    document.getElementById("start").style.visibility = "hidden";
    
}
