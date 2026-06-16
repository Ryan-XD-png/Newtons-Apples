class Player{
    constructor(ctx,canvas,teclado){
        this.ctx = ctx;
        this.c = canvas;
        this.key = teclado;
        if (window.innerWidth<=550){
                this.tamanho=this.c.width/6;
                this.vel = 5.5;
        }   else{
               this.tamanho=this.c.width/9;
               this.vel = 8.5; 
        }

    
        this.x = this.tamanho;
        this.y =this.c.height-this.tamanho*1.7;
        
        this.man = []; 
        for (let i = 1; i < 9; i++) {
            const img = new Image();
            img.src=`/sprites/new${i}.png`;
            this.man.push(img);
            img.onload = () => console.log("carregou", img.src);
        };
        this.numSpr=0
        this.spr=0

        this.delay=7;
        this.min=0;
        this.max=2;
        this.pr=false;
        this.lado="direita";
        

    }
    atualizarSprite() {
        this.numSpr++;
        if(this.numSpr>=this.delay){
            this.spr+=1;
            if(this.spr>this.max){
                this.spr=this.min;
            }
            this.numSpr=0;
        }
        
    }
    gerenciar(){
        if(this.x>this.c.width+this.tamanho){
            this.x=0-this.tamanho;
        }
        if(this.x<0-this.tamanho){
           this.x=this.c.width
        }

        let andando = false;

 

        if(this.key.esquerda){
            if (this.lado !== "esquerda") {
                this.min = 6;
                this.max = 7; 
            }
            this.x-=this.vel;
            andando=true;
            this.lado="esquerda";
            this.min=3;
            this.max=5;
        }
        if(this.key.direita){
            if (this.lado !== "direita") {
                this.min = 6;
                this.max = 7; 
            }
            this.x+=this.vel
            andando=true;
            this.lado="direita";
            this.min=0;
            this.max=2;
        }

        if(andando){
            this.atualizarSprite()
        }else{if (!andando) {
            if (this.lado == "direita") {
                this.spr = 0; 
            } else {
                this.spr = 3; 
            }
        }}
    }
    desenhar(){
        this.gerenciar()
        this.ctx.drawImage(this.man[this.spr],this.x,this.y,this.tamanho,this.tamanho)
    }
}