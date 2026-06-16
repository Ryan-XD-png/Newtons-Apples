class Maca{
    constructor(ctx,canvas){
        this.ctx = ctx;
        this.c = canvas;
        if (window.innerWidth<=550){
                this.tamanho=this.c.width/10;
                this.vel = 3.3;
        }   else{
               this.tamanho=this.c.width/13;
               this.vel = 4.5; 
        }   
        this.x =  Math.random() * (canvas.width - this.tamanho);

        this.y =this.c.height / 15;
        this.mac = []; 
        for (let i = 1; i < 3; i++) {
            const img = new Image();
            img.src=`/sprites/maca${i}.png`;
            this.mac.push(img);
            img.onload = () => console.log("carregou", img.src);
        };


//        this.spr = Math.floor(Math.random() * 3);

    }
    getY(){
        return this.y
    }
    gerenciar(){
        this.y+=this.vel
    }
    desenhar(){
        this.gerenciar()
        this.ctx.drawImage(this.mac[0],this.x,this.y,this.tamanho,this.tamanho)
    }
}