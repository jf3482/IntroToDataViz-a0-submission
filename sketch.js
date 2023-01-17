//Initialization
let disp = 0 // To visualize the exact time, set disp = 1.

let radio;
let color = [];
let offset_m_x = [0, 0, 0, 0, 0];
let offset_m_y = [0, 0, 0, 0, 0];
let offset_s_x = [0, 0, 0, 0, 0];
let offset_s_y = [0, 0, 0, 0, 0];


function setup() {
	//Radio
	radio = createRadio();
	radio.option('1','Pattern 1'); // Circle
	radio.option('2','Pattern 2'); // Sinusoid
	radio.option('3','Pattern 3'); // Zigzag
	radio.selected('1')
	radio.style('width', '85px');
	radio.position(650,50)
	textAlign(CENTER);
	
	fill(225, 0, 0);
	createCanvas(800,600); // make an HTML canvas element width x height pixels

	//Color of flower and petals
	color[0] = new Array(128,64,0);
	color[1] = new Array(255,128,0);
	color[2] = new Array(256,256,0);
}

function draw() {
	//Setting up
	let val = radio.value();
	background(225);
	
	//Extract time
	var s = second();
	var m = minute();
	var h = hour(); 
	
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
	
	//Print to console after each minute
	if (s==0){
		console.log("Minute is : " + nf(m,2));
	}
	
	//Setting up clock, to invert colors between am and pm.
	angleMode(DEGREES)
	pm = (h>11)
	
	//Initialization of ball sizes in each mode
	dia_h = 50
	dia_m = 30
	dia_s = 30
			
	//Seconds (Compute angles of petals, then to compute position and draw)	
	for (var n = 0; n < 5; n++){
		offset_s_x[n] = dia_h/2*cos(72*n)
		offset_s_y[n] = dia_h/2*sin(72*n)	
	}
	for (var k = 0; k < 60	; k++){ 
		k_seg = k%5
		k_digit = floor(k/5)+1
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
			x_s = 150+300*(k_digit%2)+k_digit*k_digit*1.5+offset_s_x[k_seg]
			y_s = (k_digit) * 45+offset_s_y[k_seg]
		}
		
		if ((k_seg+(k_digit-1)*5)<s){
			drawBall(x_s, y_s, dia_s, 0, pm, 0);
		}
		else {
			drawBall(x_s, y_s, dia_s, 1, pm, 0);
		}
	}
	
	//Minute (Compute angles of petals, then to compute position and draw)
	for (var n = 0; n < 5; n++){
		offset_m_x[n] = dia_h/2*sin(72*n)
		offset_m_y[n] = dia_h/2*cos(72*n)	
	}
	for (var j = 0; j < 60; j++){ 
		j_seg = j%5
		j_digit = floor(j/5)+1
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
			x_m = 150+300*(j_digit%2)+j_digit*j_digit*1.5+offset_m_x[j_seg]
			y_m = (j_digit) * 45+offset_m_y[j_seg]
		}

		if ((j_seg+(j_digit-1)*5)<m){
			drawBall(x_m, y_m, dia_m, 0, pm, 1);
		}
		else {
			drawBall(x_m, y_m, dia_m, 1, pm, 1);
		}
	}
	
	//Hour(Compute position and draw)
	for (var i = 0; i < 12; i++){ 
		i_digit = (i%12) + 1
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
			x_h = 150+300*(i_digit%2)+i_digit*i_digit*1.5
			y_h = (i_digit) * 45
		}
		
		if (i<(h%12)){
			drawBall(x_h, y_h, dia_h, 0, pm, 2);
		}
		else {
			drawBall(x_h, y_h, dia_h, 1, pm, 2);
		}
	}
}

function drawBall(x, y, dia, blank, pm, seg) {
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
		fill(color[col][0],color[col][1],color[col][2], 255); 
	}
	ellipse(x, y, dia, dia); //Plotting circle to create flower
} 