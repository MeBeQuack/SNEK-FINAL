var t=0;
var m=3;
var l=m;
var n=60;
var p=[30,30];
var du=[t,-m];
var dd=[t,m];
var dl=[-m,t];
var dr=[m,t];
var d=[t,-m];
var s=[p];
var j = prompt("tab prefix")

document.body.innerHTML+=`<canvas id="canvasIsMine" width="${n}" height="${n}" style="top:0;left:0;border:none;">c</canvas>`; 
var c=document.getElementById("canvasIsMine"); 
c.style.position="fixed"; 
var x=c.getContext("2d");

document.body.addEventListener("keydown",(e)=>{
    if(d!=dr&&(e.key=="ArrowLeft"||e.key=="a")){d=dl;}
    if(d!=dl&&(e.key=="ArrowRight"||e.key=="d")){d=dr;}
    if(d!=dd&&(e.key=="ArrowUp"||e.key=="w")){d=du;}
    if(d!=du&&(e.key=="ArrowDown"||e.key=="s")){d=dd;}
});
var f=F();

function D(){
    document.title= j +` ${l} : ${Math.floor(t*100/8)/100}`;
    c.remove();
}
function G(){
    l++;
    return F();
}
function S(){
    p=[p[0]+d[0],p[1]+d[1]];
    if (p[0]>n||p[1]>n||p[0]<0||p[1]<0||s.some((e)=>e.includes(p)))
    return D();
    if(f[0]===p[0]&&f[1]===p[1])f=G();
    s.push([p]);
    x.fillStyle="#F79F1F";
    x.fillRect(f[0],f[1],m,m);
    x.fillStyle="#009432";
    x.fillRect(p[0],p[1],m,m);
    if(s.length>l){let g=s.shift()[0];x.clearRect(g[0],g[1],m,m);}
    document.title= j+` ${l} : ${Math.floor(t/8)}`;
    t++;
    var v=setTimeout((e)=>{requestAnimationFrame(S);},80)
    
}
function F(){
    var f=[Math.floor(Math.random()/m*n/2)*m,Math.floor(Math.random()/m*n/2)*m]
    return f;
}

S();
void(0);
