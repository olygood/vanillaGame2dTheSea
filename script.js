/*cavas setup================================================================*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

/*mouse interactivity=================================================================*/
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown',function(event){
    mouse.click = true
    mouse.x = event.x -canvasPosition.left;
    mouse.y = event.y -canvasPosition.top;
});
canvas.addEventListener('mouseup',function(){
    mouse.click = false;
});
/*player======================================================================
*   this.spriteWidth = 498; this.spriteHeight = 327 pq le sprite sheet original est de 1992px e quatre colone de 4poissons, 981 pixels de 3row de poissons donc 12 poissons
* template : possons 
* p,p,p,p
* p,p,p,p
* p,p,p,p
* 1992* 981 
*/
class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle  = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327

    }
    /*update position actuel du jour at position de la souris
    *dx = distance sur l'axe x, 
    */
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if(mouse.x != this.x){
            this.x -= dx/30;

        }
        if(mouse.y != this.y){
            this.y -= dy/30;
        }
    }
    draw(){
        if(mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2);
        ctx.fill();
        ctx.closePath();
    }
}
const player = new Player();
/*bubbles======================================================================*/
/*animation loop==============================================================*/
function animate(){
    player.update();
    player.draw();
    requestAnimationFrame(animate);
}
animate();