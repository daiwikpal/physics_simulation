/*
starting code from physics code.com
link: http://physicscodes.com/bouncing-ball-simulation-in-javascript-on-html5-canvas/

input code adapted from: https://physics.weber.edu/schroeder/html5/TutorialPacket.pdf

I added the time factor and outputs for different variables
 */

// initialise canvas and context
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// physical variables
var g = -9.8; // gravity
var fac = 1; // velocity reduction factor per bounce
var radius = 20; // ball radius
var color = "#0000ff"; // ball color

// initialise all vars
var x;
var x_initial;
var y;
var vx_pixels;
var vy_pixels;
var vy_pixels_initial;
var vx_pixels_initial;
var time;
var time_final;
var x_distance;
var x_distance_pixels;
var y_initial_real;
var y_distance_pixels;
var v_real;
var angle;
var vx_real;
var vy_real;
var x_distance_scale;
var y_distance_scale;
var time_scale;
var g_pixels;
var y_initial;
var pause = false;

// ensure that code does not run before page has loaded
window.onload = init;

function sleep(ms) { //found from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
    //assign all the variables with data from user

    g = -9.8; // gravity
    fac = 1; // velocity reduction factor per bounce
    radius = 20; // ball radius
    color = "#0000ff"; // ball color

     x = 0; //this var changes as the ball moves; it is the current displacement
     x_initial = 0;
     y = 0; //this var changes as the ball moves; it is the current displacement
     vx_pixels;
     vy_pixels;
     vy_pixels_initial;
     vx_pixels_initial;
     time = 0;
     time_final;
     x_distance = 0; //meters
     x_distance_pixels;
     y_initial_real = Number(height_slider.value); //meters
     y_distance_pixels;
     v_real = Number(velocity_slider.value); // m/s
    angle = Number(angle_slider.value); //degrees
    vx_real = v_real * Math.cos(angle * (Math.PI/180));  // 40 * cos(60)
    vy_real = v_real * Math.sin(angle * (Math.PI/180));;// 40 * sin(60)
    x_distance_scale = 25;  //1px = 25 cm
    y_distance_scale = 18; //1px = 18 cm
    time_scale = 1; //1ms = 1ms
    g_pixels; // (-9.8 * 100 / 10) * -1
    y_initial = 600- ((y_initial_real * 100)/y_distance_scale) - radius;


    //convert all values to pixel units and find total time
    x_distance_pixels = x_distance * 100 / x_distance_scale;
    console.log(x_distance_pixels)

    vx_pixels = vx_real * 100/ x_distance_scale;
    vx_pixels_initial = vx_pixels;
    console.log(vx_pixels)

    y_distance_pixels = -1 * (y_initial_real * 100 / y_distance_scale);
    console.log("y distance:" + y_distance_pixels);

    vy_pixels = -1 * (vy_real * 100/ y_distance_scale);
    vy_pixels_initial = vy_pixels;
    console.log("y velocity:" + vy_pixels);

    //total time is calculated using quadratic equation
    time_final = (-vy_real - Math.pow(Math.pow(vy_real, 2) - 4 * (0.5 * g) * y_initial_real /* 30 meters is the initial */, 0.5))/g;
    console.log("time final:" + time_final);

    g_pixels = ((g * 100)/y_distance_scale) * -1;
    console.log("g_pixels:" + g_pixels);

    update();
};



async function update() {

    while(time < time_final + 0.01 && pause == false) { //this loop runs if the

        //round time to 6 decimal places
        time = Math.round(time * 100000)/100000;

        // update y - velocity based on gravitational constant
        vy_pixels = vy_pixels_initial + (g_pixels * time);


        // update position
        x =  x_initial + ((vx_pixels + vx_pixels_initial)/2 * time);
        y =  y_initial + ((vy_pixels + vy_pixels_initial)/2 * time);


        // update the ball
        drawBall();
        await sleep(10);  //10ms in the simulation = 1 ms in real life
        time += 0.01; //millisecond

        //update all values in HTML file
        showTime();
        showX();
        showY();
        showVelocityX();
        showVelocityY();
    }
};

//draws the ball at different

function drawBall() {
    with (context){
        clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        fillStyle = color;
        beginPath();
        arc(x, y, radius, 0, 2*Math.PI, true);
        closePath();
        fill();

    };
};

//functions used in HTML file to update

function showVelocity(){
    velocity_readout.innerHTML = velocity_slider.value;
}

function showAngle(){
    angle_readout.innerHTML = angle_slider.value;
}

function showHeight(){
    height_readout.innerHTML = height_slider.value;
}
function showTime(){
    time_readout.innerHTML = Math.round(time * 100)/100;
}

function showY(){
    yPos_readout.innerHTML = Math.round((y_initial - y) * y_distance_scale)/100;
}

function showX(){
    xPos_readout.innerHTML = Math.round((x - x_initial)* x_distance_scale)/100;
}

function showVelocityY(){
    yVelocity_readout.innerHTML = Math.round((vy_pixels) * y_distance_scale )/100;
}

function showVelocityX(){
    xVelocity_readout.innerHTML = Math.round(vx_real * 100) /100;
}

//this function runs when the pause button is pressed
function setPause(){
    if(pause){
        pause = false;
        update();
    }else {
        pause = true;
    }
    pause_readout.innerHTML = pause;
}
