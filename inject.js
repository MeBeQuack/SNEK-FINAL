var t=0;
var m=3;
var l=5;
var n=60;
var p=[n/2,n/2];
var d=[t,-m];
var s=[[t,t]];

document.body.innerHTML+=`<canvas id="canvasIsMine" width="${n}" height="${n}" style="top:0;border:none;">c</canvas>`; 
var c=document.getElementById("canvasIsMine"); 
c.style.position="fixed"; 
var x=c.getContext("2d");
//snek color "#1dd1a1";
//fruit color "#feca57";
//s.forEach((e) => {x.fillRect(e[0], e[1],m,m);});



document.body.addEventListener("keydown",(e)=>{
    if(e.key=="ArrowLeft"||e.key=="a"){d=[-m,0];}
    if(e.key=="ArrowRight"||e.key=="d"){d=[m,0];}
    if(e.key=="ArrowUp"||e.key=="w"){d=[0,-m];}
    if(e.key=="ArrowDown"){d=[0,m];}
});
var f=F();

function D(){
    document.title=Math.floor(l*(t/100));
    c.remove();
}
function G(){
    l+=m;
}
function S(){
    x.fillStyle="#009432";
    p=[p[0]+d[0],p[1]+d[1]];
    if (s.includes(p)||p[0]>n||p[1]>n||p[0]<0||p[1]<0)return D();
    if(f[0]===p[0]&&f[1]===p[1])G();
    s.push([p]);
    x.fillRect(p[0],p[1],m,m);
    if(s.length>l){let g=s.shift()[0];x.clearRect(g[0],g[1],m,m);}
    document.title=l*(t/100);
    t++;
    var v=setTimeout((e)=>{
        requestAnimationFrame(S);
    },80)
    
}
function F(){
    var f=[Math.floor(Math.random()/m*n/2)*m,Math.floor(Math.random()/m*n/2)*m]
    x.fillStyle="#F79F1F";
    x.fillRect(f[0],f[1],m,m);
    return f;
}

S();
void(0);