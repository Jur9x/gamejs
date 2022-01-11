//by jur9x

//konstanty
const inrskore = document.getElementById("skore");
const inrnewyx = document.getElementById("newyx");
const inrstart = document.getElementById("start");
const inrperfect = document.getElementById("newperfect");
const inrtxt = document.getElementById("txt");
const newY = 28;

//proměnné
let canvas, phb, phb_active;
let spid = 2;
let counter = 0;
let prfct = 0;
let skore = 0;
let oldX = 0;
let color = "yellow";
let promena = 0;
let newX = 300;
let active_coords1 = 201;
let active_coords2 = 799;

let moving = "true";
let direction = "true";

//horní obdelník
class kostka {
    constructor(x) {
        this.x = (width / 2);
    }

    draw() {
        push();
        rect((this.x - (newX / 2)), ((height / 2) - 28), newX, newY);
        pop();
    }
}

//pohyb horního obdelníku
function moving_piece() {
    if (moving == "true") {
        if (direction == "false") {
            phb.x = phb.x - spid;
        }
        if (direction == "true") {
            phb.x = phb.x + spid;
        }
        if (phb.x >= width - 150) {
            direction = "false";
        }
        if (phb.x <= 150) {
            direction = "true";
        }
    }
}

//měnič rychlosti
function speedchange() {
    if (counter == 2) {
        spid = 4;
    }
    if (counter == 4) {
        spid = 6;
    }
    if (counter == 6) {
        spid = 8;
    }
    if (counter == 8) {
        spid = 10;
    }
    if (counter == 10) {
        spid = 12;
    }
    if (counter == 12) {
        spid = 14;
    }
    if (counter == 14) {
        spid = 16;
    }
}

//hlavní funkce, vzorečky, kontrola
function kontrola() {
    if (phb.x < active_coords1 || phb.x > active_coords2) {
        moving = "false";
        game_end();
    } else {
        if (phb.x == 500) {
            console.log("nice")
        } else if (phb.x < 500) {
            newX = newX - (500 - phb.x);
        } else if (phb.x > 500) {
            newX = newX - (phb.x - 500);
        }
        skore += newX;
        active_coords1 = 501 - newX;
        active_coords2 = 499 + newX;
        inrskore.innerHTML = `${skore}`;
        inrnewyx.innerHTML = `${newX}`;
        counter++;
        speedchange();
        console.log(skore, newX, active_coords1, active_coords2);
        if (oldX == newX) {
            color = "blue";
            prfct = prfct + 1;
        } else {
            color = "yellow";
        }
    }
}



//center canvas
function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

//setup
function setup() {
    canvas = createCanvas(1000, 100);
    centerCanvas();
    canvas.parent("myCanvas");
    phb = new kostka();
}

//main draw
function draw() {
    if (promena == 1) {
        inrperfect.innerHTML = `${prfct}`;
        fill(color);
        background(255);
        rect((width / 2) - newX / 2, (height / 2), newX, 28);
        phb_active = phb.draw();
        moving_piece();
        oldX = newX;
    }
    if (promena == 0) {
        background(255);
    }
}

//reakce na kliknutí
function mousePressed() {
    if (promena == 1) {
        kontrola();
        console.log(phb.x);
    }
}

//resetuje hru
function reset() {
    phb.x = 500;
    spid = 2;
    counter = 0;
    prfct = 0;
    skore = 0;
    oldX = 0;
    color = "yellow";
    promena = 0;
    newX = 300;
    active_coords1 = 201;
    active_coords2 = 799;
    moving = "true";
    direction = "true";
}

//funkce konce hry
function game_end() {
    reset();
    promena = 0;
    inrstart.innerHTML = `Play Again`;
    inrnewyx.innerHTML = ``;
    inrperfect.innerHTML = ``;
}

//funkce startu hry
function game_start() {
    promena = 1;
    inrstart.innerHTML = ``;
    inrnewyx.innerHTML = `0`;
    inrskore.innerHTML = `0`;
    inrperfect.innerHTML = `0`;
    inrtxt.innerHTML = ``;
}