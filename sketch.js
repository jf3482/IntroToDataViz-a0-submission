/* 
Proudly produced by Jit Soon Foo (jf3482)...

Welcome to my abstract clock!
Feel free to play around with the various patterns (related to math if you study closely).

Everything here are original ideas and programmed from scratch, except the following:
 - Gradient background idea from https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
 - Initial bee drawing obtained from https://editor.p5js.org/skgmmt/sketches/r1wu_qDCm
 - Initial smiley face drawing obtained from https://editor.p5js.org/skgmmt/sketches/r1wu_qDCm
*/

//Initialization
let disp = 0 // To visualize the exact time, set disp = 1.

let radio;
let newc;
let curr_s = 0;
let curr_h = 0;
let duration = 3;
let colour = [];
let f_stat = [];	
let f_posx = [];	
let f_posy = [];	
let offset_m_x = [0, 0, 0, 0, 0];
let offset_m_y = [0, 0, 0, 0, 0];
let offset_s_x = [0, 0, 0, 0, 0];
let offset_s_y = [0, 0, 0, 0, 0];

let c1, c2, c3;

function setup() {
	//Radio
	radio = createRadio();
	radio.option('1','Pattern 1'); // Circle
	radio.option('2','Pattern 2'); // Sinusoid
	radio.option('3','Pattern 3'); // Infinity
	radio.selected('1')
	radio.style('width', '87px');
	radio.position(650,50)
	textAlign(CENTER);
	
	fill(225, 0, 0);
	height = 600
	width = 800
	createCanvas(width,height); // make an HTML canvas element width x height pixels

	//Color of flower and petals
	colour[0] = new Array(192,64,0);	
	//colour[0] = new Array(181,154,122);
	colour[1] = new Array(255,128,0);
	colour[2] = new Array(256,256,0);
	
	for (var n = 0; n < 12; n++){ 
		f_stat[n] = -1 //-1: Dormant, 0: Active, Other numbers: Timer 
	}
}

function draw() {
	//Setting up
	let val = radio.value();
	noCursor()
	
	//Update status and position of flowers
	for (var n = 0; n < 12; n++){  		
		i_digit = (i%12) + 1
		i_angle = i_digit*30
		if (val == 1){
			f_posx[n] = 300+200*sin(i_angle)
			f_posy[n] = 300-200*cos(i_angle)
		}
		else if (val == 2){
			f_posx[n] = (i_digit) * 60
			f_posy[n] = 300-220*cos(1.5*i_angle)
		}
		else if (val == 3){
			f_posx[n] = abs(-550 + 100*(i_digit-1))
			f_posy[n] = 300+200*sin(30+(i_angle-30)*2)
			if (f_posy[n]>300) {
				f_posy[n] = f_posy[n]-30
			}
			else {				
				f_posy[n] = f_posy[n]+30
			}
		} 
	}
	
	//Extract time
	var s = second();
	var m = minute();
	var h = hour();
	s2 = s; m2 = m; h2 = h;	
	if (s2 == 0){s2 = 60;}
	if (m2 == 0){m2 = 60;}
	if (h2 == 0){h2 = 24;}
	
	//Updating flower status
	if (curr_s != s2) {
		for (var n = 0; n < 12; n++){  	
			if (f_stat[n] >0) {
				f_stat[n] = f_stat[n] - 1
			}
		}
		curr_s = s2
	}
	if (curr_h != h2) { // Initial 3 seconds of smiley to welcome you!
		for (var n = 0; n < 12; n++){  	
			if (f_stat[n] < 0) {
				f_stat[n] = 3
			}
		}
		curr_h = h2
	} 
	
	//Setting up clock, to invert colors between am and pm.
	angleMode(DEGREES)
	pm = (h>11)
	
	//Display time if disp == 1 (to set manually above)
	if (disp == 1) {
		textSize(32);
		fill(64);
		offset_text_x = 250
		offset_text_y = 30
		text(nf(h,2), 0+offset_text_x, offset_text_y);
		text(':', 25+offset_text_x, offset_text_y);
		text(nf(m,2), 50+offset_text_x, offset_text_y);
		text(':', 75+offset_text_x, offset_text_y);
		text(nf(s,2), 100+offset_text_x, offset_text_y);
	}

	//Background with gradient
	c1 = color(255);
	c2 = color(63, 63, 127);
    c3 = color(28, 192, 0);
	
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
	  if (pm){
		newc = lerpColor(c1,c2,n);
      }
	  else{
		newc = lerpColor(c1,c3,n);
      }
	  stroke(newc);
      line(0,y,width, y);
    }
	
	//Print to console after each minute
	if (s==0){
		console.log("Minute is : " + nf(m,2));
	}
	
	//Initialization of ball sizes in each mode
	dia_h = 50
	dia_m = 30
	dia_s = 30
			
	//Seconds (Compute angles of petals, then to compute position and draw)	
	for (var n = 0; n < 5; n++){
		offset_s_x[n] = dia_h/2*cos(72*n)
		offset_s_y[n] = dia_h/2*sin(72*n)	
	}
	for (var k = 1; k <= 60	; k++){ 
		k_seg = k%5
		k_digit = floor((k-1)/5)+1
		k_angle = k_digit*30
		
		if (val == 1){
			x_s = 300+200*sin(k_angle)+offset_s_x[k_seg]
			y_s = 300-200*cos(k_angle)+offset_s_y[k_seg]
		}
		else if (val == 2){
			x_s = (k_digit) * 60+offset_s_x[k_seg]
			y_s = 300-220*cos(1.5*k_angle)+offset_s_y[k_seg]
		}
		else if (val == 3){			
			x_s = abs(-550 + 100*(k_digit-1))+offset_s_x[k_seg]		
			y_s = 300+200*sin(30+(k_angle-30)*2)
			if (y_s>300) {
				y_s = y_s-30+offset_s_y[k_seg]
			}
			else {				
				y_s = y_s+30+offset_s_y[k_seg]
			}
		}
		
		if ((k_seg+(k_digit-1)*5)<s2){
			drawBall(x_s, y_s, dia_s, 0, pm, 0);
		}
		else {
			//drawBall(x_s, y_s, dia_s, 1, pm, 0); //Looks better without printing the white parts
		}
	}
	
	//Minute (Compute angles of petals, then to compute position and draw)
	for (var n = 0; n < 5; n++){
		offset_m_x[n] = dia_h/2*sin(72*n)
		offset_m_y[n] = dia_h/2*cos(72*n)	
	}
	for (var j = 1; j <= 60; j++){ 
		j_seg = j%5
		j_digit = floor((j-1)/5)+1
		j_angle = j_digit*30
		if (val == 1){
			x_m = 300+200*sin(j_angle)+offset_m_x[j_seg]
			y_m = 300-200*cos(j_angle)+offset_m_y[j_seg]
		}
		else if (val == 2){
			x_m = (j_digit) * 60+offset_m_x[j_seg]
			y_m = 300-220*cos(1.5*j_angle)+offset_m_y[j_seg]
		}
		else if (val == 3){		
			x_m = abs(-550 + 100*(j_digit-1))+offset_m_x[j_seg]		
			y_m = 300+200*sin(30+(j_angle-30)*2)
			if (y_m>300) {
				y_m = y_m-30+offset_m_y[j_seg]
			}
			else {				
				y_m = y_m+30+offset_m_y[j_seg]
			}
		}

		if ((j_seg+(j_digit-1)*5)<m2){
			drawBall(x_m, y_m, dia_m, 0, pm, 1);
		}
		else {
			//drawBall(x_m, y_m, dia_m, 1, pm, 1); //Looks better without printing the white parts
		}
	}
	
	//Hour(Compute position and draw)
	for (var i = 1; i <= 12; i++){ 
		i_digit = (i-1)%12+1
		i_angle = i_digit*30
		if (val == 1){
			x_h = 300+200*sin(i_angle)
			y_h = 300-200*cos(i_angle)
		}
		else if (val == 2){
			x_h = (i_digit) * 60
			y_h = 300-220*cos(1.5*i_angle)
		}
		else if (val == 3){
			x_h = abs(-550 + 100*(i_digit-1))
			y_h = 300+200*sin(30+(i_angle-30)*2)
			if (y_h>300) {
				y_h = y_h-30
			}
			else {				
				y_h = y_h+30
			}
		} 
		
		if (i_digit<=(h2-1)%12+1){
			drawBall(x_h, y_h, dia_h, 0, pm, 2);
			// Update flower stat if bee has just visited
			if (dist(x_h, y_h, mouseX, mouseY)<20){
				f_stat[i-1] = duration
			}
			
			//Draw flower face
			if (f_stat[i-1] == 0){
				drawSad(x_h, y_h, dia_h, pm)
			} else if (f_stat[i-1] >0) {
				drawSmiley(x_h, y_h, dia_h, pm)
			}			
		}
		else {
			//drawBall(x_h, y_h, dia_h, 1, pm, 2); //Looks better without printing the white parts
		}
	}
	
	//Drawing a bee that corresponds to pointer	
	drawBee(mouseX,mouseY)		
}

function drawBall(x, y, dia, blank, pm, seg) {
	ellipseMode(CENTER);
	stroke(64);
	strokeWeight(2);
	if (pm == 0) {
		// AM
		col = seg
	}
	else {
		// PM (inverted colors)
		col = 2-seg
	}
	
	if (blank==1){
		//No fill 
		fill(255,255,255,255);
	}
	else {
		//Color based on second/minute/hour
		fill(colour[col][0],colour[col][1],colour[col][2], 255); 
	}
	ellipse(x, y, dia, dia); //Plotting circle to create flower
} 

function drawBee(x,y){
	wingspan = 15
	bw = wingspan + random(-5,5);
	
	//wings
	ellipseMode(RADIUS);
	noStroke();
	fill(171, 240, 255);
	ellipse(x+10, y-5,bw,8);
	ellipse(x-10, y+5,bw,8);
	ellipse(x+10, y+5,bw,8);
	ellipse(x-10, y-5,bw,8);

	//body
	fill(255, 244, 61);
	angleMode(DEGREES);
	ellipse (x, y, 15, 20);
	stroke(0);
	strokeWeight(5);
	line(x-10, y-5, x+10, y-5);	
	line(x-10, y+5, x+10, y+5); 
	
	//feelers	
	strokeWeight(2);
	fill(0);
	line(x-8, y-30, x-4, y-20);	
	line(x+4, y-20, x+8, y-30);
	ellipse (x-8, y-30, 3, 3);
	ellipse (x+8, y-30, 3, 3);
}

function drawSmiley(x,y, diam, pm){
	// Smile
    var smileDiam = .6*diam;
    arc(x, y, smileDiam, smileDiam, 10, 170);
      
    // Eyes
    var offset = .2*diam;
    var eyeDiam = .1*diam;
	if (pm){
		fill(255);
	}
	else{
		fill(0);
	}
    ellipse(x-offset, y-offset, eyeDiam, eyeDiam);
    ellipse(x+offset, y-offset, eyeDiam, eyeDiam);
}

function drawSad(x,y, diam, pm){
	// Lesser smile
    var smileDiam = .6*diam;
    arc(x, y, smileDiam, smileDiam, 65, 115);
	
	if (pm){
		fill(255);
	}
	else{
		fill(0);
	}
      
    // Eyes
    var offset = .2*diam;
    var eyeDiam = .1*diam;
    ellipse(x-offset, y-offset, eyeDiam, eyeDiam);
    ellipse(x+offset, y-offset, eyeDiam, eyeDiam);
}
