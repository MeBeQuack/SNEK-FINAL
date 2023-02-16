var t=0;  //sets the number of iterations to zero
var m=3;  //sets the snake size to 3 (and in turn the entire grid size to 3)
var l=m;  //sets the snakes initial length to three segments
var n=60; //sets the level size to 60x60 (pixels)
var p=[30,30];  //sets the head position to the center of the level
var du=[t,-m];  //sets the direction "UP" for later usage
var dd=[t,m];   //sets the direction "DOWN" for later usage
var dl=[-m,t];  //sets the direction "LEFT" for later usage
var dr=[m,t];   //sets the direction "RIGHT" for later usage
                //these are needed because javascript treats [0,m] === [0,m] as false (so that would prevent being able to check controls further down)
var d=du;   //sets the start direction to upwards
var s=[p];  //sets the first segment to the head position
var f=F();  //stores a random x and y for the "fruit", using the function F()
var j = prompt("tab prefix")    //prompt the user to provide a prefix to the tab (optional)

document.body.innerHTML+=`<canvas id="canvasIsMine" width="${n}" height="${n}" style="top:0;border:none;">c</canvas>`;  //adds a canvas to document.body
var c=document.getElementById("canvasIsMine");  //fetches that canvas
c.style.position="fixed"; //stops the canvas in place, so that when you scroll on the page without the canvas moving
var x=c.getContext("2d"); //gets the ctx of the canvas (to be able to draw on it)

document.body.addEventListener("keydown",(e)=>{   //runs this arrow function when any key down (while the document.body is focused)
    if(d!=dr&&(e.key=="ArrowLeft"||e.key=="a")){d=dl;}  //checks for "LEFT" input and makes sure it does not try to do a 180 degree turn 
    if(d!=dl&&(e.key=="ArrowRight"||e.key=="d")){d=dr;} //checks for "RIGHT" input and makes sure it does not try to do a 180 degree turn
    if(d!=dd&&(e.key=="ArrowUp"||e.key=="w")){d=du;}    //checks for "UP" input and makes sure it does not try to do a 180 degree turn 
    if(d!=du&&(e.key=="ArrowDown"||e.key=="s")){d=dd;}  //checks for "DOWN" input and makes sure it does not try to do a 180 degree turn
                                                    //IF TRUE then sets direction accordingly for the four inputs listed above
});


function D(){   //this function is triggered uppon death conditions are met
    document.title= j +` ${l} : ${Math.floor(t*100/8)/100}`; //sets the title of the page to the score and uses ` and ${} to easier format a string
    c.remove(); //deletes the canvas.
}
function G(){ //this function is triggered uppon the snek "eating" a fruit
    l++;     //adds the one segment to the snake length
    return F(); //returns a new set fruit position
}
function S(){
    p=[p[0]+d[0],p[1]+d[1]];  //adds the direction onto the head position (because p += d doesn't work sadly)
    if (p[0]>n||p[1]>n||p[0]<0||p[1]<0||s.some((e)=>e.includes(p)))return D(); //first, check if the head goes out of bounds, or if the it hits its tail
                                      //IF TRUE it returns -and runs- the self destruct function (D)
    if(f[0]==p[0]&&f[1]==p[1])f=G();  //checks if the snake's head is on the fruit, and IF SO runs the gain function (G). Then the fruit position is set to the returned value.
    s.push([p]);  //appends the head to the bottom of the snake list
    x.fillStyle="#F79F1F";//sets the color to a bright orange
    x.fillRect(f[0],f[1],m,m); //draws a unit square at the stored fruit position
    x.fillStyle="#009432";  //sets the color to a nice green
    x.fillRect(p[0],p[1],m,m);  //draws the head of the snake
    if(s.length>l){let g=s.shift()[0];x.clearRect(g[0],g[1],m,m);} //IF the snake is longer than it should be, it's tail is cut off
                                                //(The first element in the list is removed, and the position it was on is erased from the canvas)
    document.title= j+` ${l} : ${Math.floor(t/8)}`; //sets the title of the "tab" to be the score along with the predefined tab prefix (j)
    t++;    //increments the number of iterations
    var v=setTimeout((e)=>{requestAnimationFrame(S);},80) //Runs the whole FUNCTION again after 80ms
}
function F(){ //generates a random x and y for the "fruit", that is returned and then stored (by the script that calls the function)
    var f=[Math.floor(Math.random()/m*n/2)*m,Math.floor(Math.random()/m*n/2)*m] //calculates two random numbers along the grid, that are inside of the level
    return f; //returns that positon to set a variable defined above
}

S();    //!!MOST IMPORTANT!! calls the main snake function (initially, since the function has to be started before being able to run itself again).
void(0);    //Just to fix some bugs for later, when converting to bookmarklets (one continuous line of code prefixed "javascript:")
