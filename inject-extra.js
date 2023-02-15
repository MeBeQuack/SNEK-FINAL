var t=0;  //sets the number of iterations to zero
var m=3;  //sets the snake size to 3 (and in turn the entire grid size to 3)
var l=5;  //sets the snakes initial length to 5 units
var n=60; //sets the level size to 60x60 (pixels)
var p=[n/2,n/2];  //sets the head of the worm to the middle of the level
var d=[0,-m];     //starts the worm facing upward
var s=[[0,0]];    //creates the first segment of the snake,at 0, 0?
var f=F();        //stores a random x and y for the "fruit", and draws it on the canvas using the function F() 

document.body.innerHTML+=`<canvas id="canvasIsMine" width="${n}" height="${n}" style="top:0;border:none;">c</canvas>`;  //adds a canvas to document.body
var c=document.getElementById("canvasIsMine");  //fetches that canvas
c.style.position="fixed"; //stops the canvas in place, so that when you scroll on the page without the canvas moving
var x=c.getContext("2d"); //gets the ctx of the canvas (to be able to draw on it)

document.body.addEventListener("keydown",(e)=>{   //runs this arrow function when any key down (while the document.body is focused)
    if(e.key=="ArrowLeft"||e.key=="a"){d=[-m,0];} //Checks for "left" input, and rotates the snake accordingly
    if(e.key=="ArrowRight"||e.key=="d"){d=[m,0];} //Checks for "right" input, and rotates the snake accordingly
    if(e.key=="ArrowUp"||e.key=="w"){d=[0,-m];}   //Checks for "up input, and rotates the snake accordingly
    if(e.key=="ArrowDown"||e.key="s"){d=[0,m];}   //Checks for "down" input, and rotates the snake accordingly
});


function D(){   //this function is triggered uppon death conditions are met
    document.title=`Total score: ${Math.floor(l*(t/80))}!` //sets the title of the page to the score -uses ` and ${} to easier format a string
    c.remove(); //deletes the canvas.
}
function G(){ //this function is triggered uppon the snek "eating" a fruit
    l+=m;     //adds the snake size to the snake length
  //-WORK IN PROGRESS-
}
function S(){
    p=[p[0]+d[0],p[1]+d[1]];  //adds the direction onto the head position (because p += d doesn't work sadly)
    if (s.includes(p)||p[0]>n||p[1]>n||p[0]<0||p[1]<0)return D(); //first, check if the head hits its tail, or if it goes out of bounds
                                      //IF TRUE it stops following the scripts (return) and runs the self destruct function (D)
    if(f[0]==p[0]&&f[1]==p[1])G();  //checks if the snake's head is on the fruit, and IF SO runs the gain function (G) -that isn't complete just yet-
    s.push([p]);  //appends the head to the bottom of the snake list
    x.fillStyle="#009432";  //sets the color to a nice green
    x.fillRect(p[0],p[1],m,m);  //draws the head of the snake
    if(s.length>l){let g=s.shift()[0];x.clearRect(g[0],g[1],m,m);} //IF the snake is longer than it should be, it's tail is cut off
                                                //(The first element in the list is removed, and the position it was on is erased from the canvas)
    document.title=l*(t/80); //sets the title of the "tab" to be the score
    t++;    //increments the number of iterations
    var v=setTimeout((e)=>{requestAnimationFrame(S);},80) //Runs the whole FUNCTION again after 80ms
}
function F(){ //generates a random x and y for the "fruit"
    var f=[Math.floor(Math.random()/m*n/2)*m,Math.floor(Math.random()/m*n/2)*m] //calculates two random numbers along the grid, that are inside of the level
    x.fillStyle="#F79F1F"; //sets the color to a bright orange
    x.fillRect(f[0],f[1],m,m); //draws a unit square at the random position (in the color specified above) 
    return f; //returns that positon to set a variable defined above
}

S();    //!!MOST IMPORTANT!! calls the main snake function (first, since the function has to be triggered before it can run itself again).
void(0);    //Just to fix some bugs for later, when converting to bookmarklets (one continuous line of code prefixed "javascript:")
