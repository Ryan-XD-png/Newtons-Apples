const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth*0.70;
canvas.height = window.innerHeight*0.80;
if (window.innerWidth<=550){
    canvas.width = window.innerWidth*0.9;
    canvas.height = window.innerHeight*0.65;
}
const txtScore= document.getElementById('ponto');

const teclado={
    cima:false,
    baixo:false,
    esquerda:false,
    direita:false
}
const modal = document.getElementById('gameOverModal');
const pontuacaoFinal = document.getElementById("pontuacaoFinal");


window.addEventListener('keydown',(event)=>{
    switch (event.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
            teclado.esquerda=true
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            teclado.direita=true
            break;
        case 'w':
        case 'W':
        case 'ArrowUp':
            teclado.cima=true
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            teclado.baixo=true
            break;
    }
})
window.addEventListener('keyup',(event)=>{
    switch (event.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
            teclado.esquerda=false
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            teclado.direita=false
            break;
        case 'w':
        case 'W':
        case 'ArrowUp':
            teclado.cima=false
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            teclado.baixo=false
            break;
    }
})

document.addEventListener("touchstart",(ev)=>{
    const x = ev.touches[0].clientX;
    const y = ev.touches[0].clientY;
    if(x<window.innerWidth/2){
        teclado.esquerda=true;
    }else{
        teclado.direita=true;
    }
})
document.addEventListener("touchend",()=>{

        teclado.esquerda=false;
        teclado.direita=false;

})
document.addEventListener("touchcancel",()=>{

        teclado.esquerda=false;
        teclado.direita=false;
})


const mapa = [
    [0,0,0,0,0,0,0],
    [4,6,8,4,8,6,4],
    [3,5,2,3,2,2,3],
    [7,1,1,7,1,1,7]
];
let larguraCelula = canvas.width / mapa[1].length;
let alturaCelula = canvas.height / 4;

const play = new Player(ctx,canvas,teclado);

let grams = [];
for (let i = 1; i < 4; i++) {
        const img = new Image();
        img.src=`/sprites/grama${i}.png`;
        img.onload = carregouImagem
        grams.push(img);
        };
let ceus = [];
for (let i = 1; i < 3; i++) {
        const img = new Image();
        img.src=`/sprites/ceu${i}.png`;
        img.onload = carregouImagem
        ceus.push(img);
};
let folhas=[];
for (let i = 1; i < 6; i++) {
        const img = new Image();
        img.src=`/sprites/folhas${i}.png`;
        img.onload = carregouImagem
        folhas.push(img);
};
let vidas=[];
for (let i = 1; i < 4; i++) {
        const img = new Image();
        img.src=`/sprites/heart1.png`;
        vidas.push(img);
};

function colidiu(a, b) {
    return (
        a.x < b.x + b.tamanho &&
        a.x + a.tamanho > b.x &&
        a.y+ ( a.tamanho*0.80)< b.y + b.tamanho &&
        a.y + a.tamanho > b.y
    );
}


let tempo =2100
let tronco= new Image()
tronco.src='/sprites/tronco.png'
let macas = [];
tronco.onload = carregouImagem

let oi;
let nome=null;
let pontos = 0;

function rapido() {
    if (pontos >= 5000) return 150;
    if (pontos >= 4000) return 300;
    if (pontos >= 2000) return 600;
    if (pontos >= 1000) return 1000;
    return 1200;
}
let id = setInterval(() => {
        macas.push(new Maca(ctx, canvas));
    }, rapido());

function atualizarVelocidade() {
    clearInterval(id);

    id = setInterval(() => {
        macas.push(new Maca(ctx, canvas));
    }, rapido());
}

function game(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < mapa.length; i++) {
        
         for (let j = 0; j < mapa[i].length; j++) {
                switch (mapa[i][j]) {
                    case 0:
                        
                        ctx.drawImage(folhas[1],larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    case 2:
                        ctx.drawImage(ceus[0], larguraCelula*j, alturaCelula*i,larguraCelula,alturaCelula);

                        break;
                    case 1:
                        ctx.drawImage(grams[1], larguraCelula*j, alturaCelula*i,larguraCelula,alturaCelula);
                       
                        break;
                    case 3:
                        ctx.drawImage(tronco,larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    case 4:
                        ctx.drawImage(folhas[4],larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    case 5:
                        ctx.drawImage(ceus[1],larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    case 6:
                        ctx.drawImage(folhas[3],larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    case 7:
                        ctx.drawImage(grams[2],larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    case 8:
                        ctx.drawImage(folhas[2],larguraCelula*j,alturaCelula*i, larguraCelula, alturaCelula);
                        break;
                    default:
                        break;
                }
            
             }
            
         }
        if (vidas.length===0){
        clearInterval(id);
        cancelAnimationFrame(oi);
        pontuacaoFinal.textContent = `Pontos: ${pontos}`;
        modal.style.display="flex"
        return;
         }
         for (let i = 0; i < vidas.length; i++) {
             ctx.drawImage(vidas[i],(larguraCelula/3)*i,alturaCelula*0, larguraCelula/3, alturaCelula/3);
         }
        
         
         play.desenhar();
         for (let i = macas.length - 1; i >= 0; i--) {
            macas[i].desenhar()
            if (colidiu(play, macas[i])) {
                macas.splice(i, 1);
                pontos += 100;
                atualizarVelocidade();
                txtScore.textContent=pontos
                continue;
            }

            if(macas[i].y>canvas.height){
                pontos-=60
                txtScore.textContent=pontos
                macas.splice(i,1);
                if (vidas.length > 0) {
                    vidas.pop();
                }
            }
          
         }
  
       
        oi=requestAnimationFrame(game)
    }


async function addPlayer(nome, pontos) {
  await fetch("https://newtons-apples.onrender.com/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: nome,
      score: pontos
    })
  });
}

document.getElementById("salvar").addEventListener("click", async() => {
    document.getElementById("salvar").disabled = true;
    const nome = document.getElementById("nomeJogador").value;

    console.log(nome);
    modal.style.display="none" 
    await addPlayer(nome, pontos);

    location.reload();
});
let imagensCarregadas = 0;
const totalImagens = 3 + 1 + 5 + 2; 

function carregouImagem() {
    imagensCarregadas++;

    if (imagensCarregadas === totalImagens) {
        console.log("Todas as imagens carregadas!");
        requestAnimationFrame(game);
    }
}
