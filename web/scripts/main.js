SCREEN_X_SIZE = 800
SCREEN_Y_SIZE = 400

var canvas = document.getElementById('root');                       
var context = canvas.getContext ('2d');                             
var inputNumberTarget1 =  document.getElementById('inputNumberTarget1');
var inputNumberActual1 =  document.getElementById('inputNumberActual1');
var inputNumberTarget2 =  document.getElementById('inputNumberTarget2');
var inputNumberActual2 =  document.getElementById('inputNumberActual2');
var inputNumberTarget3 =  document.getElementById('inputNumberTarget3');
var inputNumberActual3 =  document.getElementById('inputNumberActual3');
var myFont = new FontFace('Inter', 'url(static/inter.ttf)');

myFont.load().then(function(font){
    // with canvas, if this is ommited won't work
    document.fonts.add(font);
    console.log('Font loaded');
    reload();
});

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 * Docs:
 * 
 * # context # 
 * arc - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
 */

/**
 * Basic method that draws a dial.
 * @param {vec2} pos 
 * @param {float} cut
 * @param {float} targetAngle
 * @param {float} radius
 * @param {color} accentColor 
 * @param {color} actualAngle 
 */
function drawDial(pos, targetAngle, radius, accentColor, actualAngle) {

    targetAngle /= 57;
    actualAngle /= 57;


    // decorative parameters
    // if it's a choice, put it here. everything else should be mathematical
    var cut = Math.PI / 4;
    var indicatorLineWidth = (2 ** 0.5) * radius;
    var actualLengthMult = indicatorLineWidth * 1.2;
    // end parmas 
    var startAngle = targetAngle + cut;
    var endAngle = targetAngle - cut;
    var corner = [pos[0] + Math.cos(targetAngle) * indicatorLineWidth, pos[1] + Math.sin(targetAngle) * indicatorLineWidth];

    var actualCorner = [pos[0] + Math.cos(actualAngle) * actualLengthMult , pos[1] + Math.sin(actualAngle) * actualLengthMult];


    console.log(actualCorner);
    context.strokeStyle = 'black';        // set the color for the circle to 'green'
    context.lineWidth = 5.0;
    // draw the circle
    // draw our "actual" indicator line
    context.beginPath();
    context.moveTo(pos[0], pos[1]);
    context.lineTo(actualCorner[0], actualCorner[1]);
    context.stroke();
    context.closePath();
    
    context.beginPath(); 
    context.arc(pos[0], pos[1], radius, startAngle, endAngle);
    context.stroke();                     // draw the path; in this case only the circle

    // drawing the indicator line
    // drawing color accent

    // start
    var start = [pos[0] + Math.cos(startAngle) * radius, pos[1] + Math.sin(startAngle) * radius]
    var end = [pos[0] + Math.cos(endAngle) * radius, pos[1] + Math.sin(endAngle) * radius]

    context.moveTo(start[0], start[1]);
    context.lineTo(corner[0], corner[1]);
    context.lineTo(end[0], end[1]);

    context.fillStyle = accentColor;
    context.fill();
    context.stroke();
    context.closePath();

    // draw the indicator line 
    context.beginPath();
    context.moveTo(pos[0], pos[1]);
    context.lineTo(corner[0], corner[1]);
    context.stroke();
    context.closePath();



}

function drawText(pos, fontStyle, fontColor, text) {
    context.beginPath();
    context.fillStyle = fontColor;
    context.font = fontStyle;
    context.fillText(text, pos[0], pos[1]);
    context.fill();
    context.stroke();
    context.closePath(); 
}




/** GENERAL CONFIGURATION 
I think raw-dogging this with canvas will be fun 
But holy shit this is probably going to be a nightmare lol
This is all hard-coded with respect to 3 dials
*/

CLOCK_FORMAT = false;
const CLOCK_OPTIONS = { hour: 'numeric', minute: '2-digit' };

D1_X = SCREEN_X_SIZE * (1 / 6);
D2_X = SCREEN_X_SIZE * (3 / 6);
D3_X = SCREEN_X_SIZE * (5 / 6);
D_Y = 280;

CLOCK_X = 30;
CLOCK_Y = 90;
CLOCK_FONT_STYLE = '60pt Inter';
CLOCK_FONT_COLOR = '#000000';

function reload() {
    clearCanvas();
    drawDial([D1_X, D_Y], inputNumberTarget1.value, 50, "#FFF72D", inputNumberActual1.value)
    drawDial([D2_X, D_Y], inputNumberTarget2.value, 50, "#5BCDE7", inputNumberActual2.value)
    drawDial([D3_X, D_Y], inputNumberTarget3.value, 50, "#D03232", inputNumberActual3.value)
    
    drawText([CLOCK_X, CLOCK_Y], CLOCK_FONT_STYLE, CLOCK_FONT_COLOR,  CLOCK_FORMAT ? new Date().toLocaleTimeString('en-US', CLOCK_OPTIONS) : new Date().toLocaleTimeString('en-US', CLOCK_OPTIONS));
}

setInterval(reload, 16);