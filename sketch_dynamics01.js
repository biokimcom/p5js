let circleX, circleY;  // Position of circle button
let circleSize = 80;   // Diameter of circle

var spdX, spdY, accX, accY, preX, preY;
var prespdX, prespdY, preaccX, preaccY;
var acc_scale, g ;
var angle = 0;
var current_angle = 0;
let object1;
let slider;
let extraCanvas;

function setup() {
  createCanvas(1000, 700);
  circleX = width/2+circleSize/2-100;
  circleY = height/2-100;
  preX = mouseX;
  preY = mouseY;
  prespdX = 0;
  prespdY = 0;
  preaccX = 0;
  preaccY = 0;
  angleMode(DEGREES);
  object1 = new makecircle(circleX,circleY,circleSize);
 
  slider = createSlider(0, 3, 1,0.5);
  slider.position(100, 100);
  slider.style('width', '120px');
  //extraCanvas = createGraphics(1000,700);
  //extraCanvas.clear();
}

function draw() {
  background(255)    
    
  strokeWeight(2); stroke(0);
  line(width/2-50,height/2,width/2+50,height/2);
  line(width/2,height/2-50,width/2,height/2+50);

  if (mouseIsPressed && object1.rollover(mouseX,mouseY)) {

    circleX = mouseX;
    circleY = mouseY;
      
    let v1 = createVector(object1.x-width/2, object1.y-height/2, 0);
    let v2 = createVector(width-width/2, 0, 0);
      
    current_angle = -1*v1.angleBetween(v2); 
    if (current_angle < 0) {
        current_angle += 360;
    }
    angle = 0 ;
    acc_scale=10000;
    g=5;
      
  } 
    
 if (!mouseIsPressed) {
     
    angle += slider.value();
    cr = dist(object1.x,object1.y,width/2,height/2);
    circleX = (cr)*cos(angle+current_angle)+width/2;
    circleY = (cr)*sin(angle+current_angle)+height/2;
     
     acc_scale = 100000;
     g=0;   
  }
    
    object1.move(circleX, circleY);
    object1.display(125,5);
    
    spdX = (circleX - preX)/16.7; // pixel/mms
    spdY = (circleY - preY)/16.7;

      accX = (spdX - prespdX)/16.7;
  accY = (spdY - prespdY)/16.7; 
    
  let v0 = createVector(object1.x,object1.y);
  let v1_v = createVector(spdX*200,spdY*200);
  let v2_a = createVector(accX*acc_scale,accY*acc_scale);
    
  drawArrow(v0,v1_v,'red');
  drawArrow(v0.add(createVector(g,g)),v2_a,'blue');

  preX = circleX;
  preY = circleY;
  prespdX = spdX;
  prespdY = spdY;
    
  //image(extraCanvas, 0, 0);
  textSize(26);
  textFont('Arial');
  text('[Dynamics] Circular Motion: Velocity & Acceleration', 10, 30);
  textSize(18);
  text('Angular Speed', 100, 100);
    
  text(': Velocity',170,155);
  drawArrow(createVector(100,150),createVector(50,0),'red');
  text(': Acceleration',170,185);
  drawArrow(createVector(100,180),createVector(50,0),'blue');
}


function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

class makecircle {
  constructor(px,py,pr) {
    this.x = px;
    this.y = py;
    this.r = pr;
  }
  
  rollover(px,py) {
    let d = dist(px,py,this.x,this.y);
      console.log(d,this.x,this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }
  
  intersect(ohter) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d<this.r+other.r);
  }
  
  move(px,py) {
    this.x = px;
    this.y = py;
  }
  
  display(pstroke,pstrokeweight) {
    stroke(pstroke);
    strokeWeight(pstrokeweight);
    ellipse(this.x, this.y, this.r, this.r);
    strokeWeight();
  }
}
