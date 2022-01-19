var c = document.getElementById("comdraw");
var ctx = c.getContext("2d");
var distributeAngle = (2*Math.PI)/1;
var distributionDivision = 1;
var img = new Image();
wX = c.clientHeight; //returns the canvas's height
wY = c.clientWidth; //returns the canvas's width
innerwidth = .65;
circleR = 300;
circleOffset = 45*(Math.PI/180);
//circleOffset = 0*(Math.PI/180);
img.src="tree_testing1.png"
var eventclick=false;

// the commented out part below has two lines place 90 degrees from eachother and will be used for testing area collision
function drawTextAlongArc(context, str, hei, centerX, centerY, radius, angle, above, posAngle) { //http://jsfiddle.net/6uQSS/1/
var met, wid;
context.save();
context.translate(centerX, centerY);
if (!above) {
    radius = -radius;
    angle = -angle;
}
else{
    hei = 0;
}
context.rotate(posAngle);
context.rotate(-1 * (angle / str.length) / 2);

for (var n = 0; n < str.length; n++) {
    var char = str[n];
    met = context.measureText(char);
    wid = met.width;
    //console.log(met);
   
    context.rotate(angle / str.length);
    context.fillText(char, -wid / 3, -radius - hei*.5); 
    // context.strokeText(char, -wid / 3, -radius + hei);
}
context.restore();
}



function circlesize(a) {
distributionDivision = a;
distributeAngle = ((2*Math.PI)/distributionDivision); // !! make sure that this converts to radians properly
//console.log(distributeAngle)
//if you want to rotate the option you can change this value
ctx.beginPath();//required to start drawing on the canvas
ctx.arc(wX/2,wY/2,circleR,0,2*Math.PI);//draws a circle in the middle of the screen by multiplying an arcs angle by two pi
ctx.strokeStyle= "green";
// ctx.stroke();//finalizes the line

ctx.save();
ctx.clip();
ctx.beginPath();
ctx.fillStyle = "#319C7A";
ctx.fillRect(0, 0, wX, wY);
ctx.restore();

for (i=1;i<distributionDivision+1;i++) {//for i loop that finds an even distribution in degrees for variable distribute angle

//console.log(i*distributeAngle);//the angles at which the lines should be drawn

ctx.beginPath();
ctx.moveTo(wX/2+(Math.cos(i*distributeAngle+circleOffset)*circleR*innerwidth),wY/2+(Math.sin(i*distributeAngle+circleOffset)*circleR*innerwidth));
ctx.lineTo(wX/2+(Math.cos(i*distributeAngle+circleOffset)*circleR),wY/2+(Math.sin(i*distributeAngle+circleOffset)*circleR));
ctx.strokeStyle = "black";
ctx.stroke();
// //ran out of time, find out how to get the coordinates for the end of the line using the radius of the circle and the angle given,
//THIS CONTROLS THE SECTORS OF LINE< DOESNT AFFECT ANGLE COMMENT BACK WHEN NEEDED
}
ctx.beginPath();
ctx.arc(wX/2,wY/2,circleR*innerwidth,0,2*Math.PI);
ctx.strokeStyle = "#319C7A";
ctx.stroke();//innercircle
}
document.getElementById('comdraw').addEventListener('mousemove', (event) => {
var bounding = c.getBoundingClientRect();//this function helps to remove offset from the mouses position from different window sizes
  var mX = event.clientX - bounding.left;//returns mouse x in relation to the canvas coordinates
  var mY = event.clientY - bounding.top;//returns mouse y in relation to the canvas coordinates
  var mA = (Math.atan2(mY-wY/2,mX-wX/2)+Math.PI);
  let mH = Math.sqrt((mX)^2 + (mY)^2);


  ctx.clearRect(0, 0, wX, wY);

circlesize(distributionDivision);



ctx.beginPath();
ctx.font = '50px Overpass';
ctx.fillStyle = '#000';
ctx.strokeStyle = '#319C7A';
ctx.lineWidth = 2;
 
ctx.save();

ctx.beginPath();//required to start drawing on the canvas
ctx.arc(wX/2,wY/2,circleR,0,2*Math.PI);//draws a circle in the middle of the screen by multiplying an arcs angle by two pi
// ctx.strokeStyle= "red";
ctx.clip();
ctx.stroke();//finalizes the line

 ctx.beginPath();
//    ctx.fillStyle='red'
//    ctx.fillRect(wX/2,wY/2,wX/2.5,wY/2.5)
// if (mH > circleR*.65 || mH < circleR) {
//   eventclick = false;
//    ctx.beginPath
//    ctx.fillStyle='green'
//    ctx.fillRect(wX/2,wY/2,wX/2.5,wY/2.5)
// }//here
// console.log(mH, circleR, circleR*.65)
// ctx.beginPath();
// ctx.strokeStyle= "green";
// ctx.arc(mX, mY,circleR*.4 ,0,2*Math.PI);

//anything in the circle
ctx.beginPath();
ctx.moveTo(wX/2,wY/2);
ctx.lineTo(mX,mY)
// ctx.stroke();
ctx.beginPath();
ctx.arc(wX/2,wY/2,circleR*innerwidth,0,2*Math.PI);
ctx.clip();
ctx.stroke();//innercircle
switch(Math.ceil(((Math.atan2(mY-wY/2,mX-wX/2))/(circleOffset))+distributionDivision)) {
  case 1:
  case 8:
    img.src="lightning_bolt.png" 
    if (eventclick) {
      window.location.href = 'page_4.html'
    };
   break;
  case 2:
  case 3:
    img.src="path57.png"
    if (eventclick) {
      window.location.href = 'page_1.html'
    };
   break;
  case 5:
  case 4:
    img.src='Bycycle.png'
    if (eventclick) {
      window.location.href = 'page_2.html'
    };
   break;
  case 6:
  case 7:
    img.src="greenhouse.png"
    if (eventclick) {
      window.location.href = 'page_3.html'
    };
   break;
  
}
eventclick = false;
ctx.beginPath();
ctx.clearRect(0, 0, wX, wY);
//img.onload = function() {
 
 if (img.width>img.height) {
   ctx.drawImage(img, (wX-circleR*.65)/2, (wY-(circleR*.65/img.width)*img.height)/2, circleR*.65, (circleR*.65/img.width)*img.height);
   } else {ctx.drawImage(img, (wX-(circleR*.65/img.height)*img.width)/2, (wY-circleR*.65)/2, (circleR*.65/img.height)*img.width, circleR*.65)}
 
//};
ctx.restore();
  document.getElementById('angtxt').innerText = Math.ceil(((Math.atan2(mY-wY/2,mX-wX/2))/(circleOffset))+distributionDivision); //writes the mouses angle on the document by using the inverse tangent function. It has a negative side and a positive side, each for 180 degrees
  document.getElementById('ang').innerText = (Math.atan2(mY-wY/2,mX-wX/2)+Math.PI);
  //console.log(mX, mY, mA);
  //console.log((distributeAngle-circleOffset)/(Math.PI/180) + "wassup");
}) //only runs when cursor is over the canvas
//document.getElementById('angtxt').innerText = Math.ceil(((Math.atan2(mY-wY/2,mX-wX/2))/(distributeAngle))+1);

document.getElementById('comdraw').addEventListener('click', (event) => {
  
  
  eventclick=true;  
  
})// here 2