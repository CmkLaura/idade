function verifyAge(){
    var age = 0;

    if(age < 17){
        console.log('Você não pode entrar!')
    }
}

function draw(sx,sy,ex,ey,c){
    const canvas = document.getElementById("background-canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = c;
    ctx.fillRect(sx, sy, ex, ey);
}