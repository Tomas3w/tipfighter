//multiplicamos por una constante para escalar el lienzo basado en street fighter
const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,
  
}

// el punto medio del canvas es 192,112
window.onload = function (){
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d');

    
    canvasEl.width = GameViewport.WIDTH;
    canvasEl.height = GameViewport.HEIGHT;

    const[ken,background]  = document.querySelectorAll('img');
    const position = {
        x:GameViewport.WIDTH / 2 - ken.width / 2,
        y:110,
    }

    let velocity = 3;

    function frame(){
        position.x += velocity;

        if(position.x > GameViewport.WIDTH - ken.width|| position.x < 0){
            velocity = - velocity;
        }

        //funcion para limpiar los frames anteriores
    //    context.clearRect(0,0,GameViewport.WIDTH,GameViewport.HEIGHT);

        context.drawImage(background,0,0);

    //    context.strokeStyle = 'yellow';
    //    context.moveTo(0,0);
    //    context.lineTo(GameViewport.WIDTH,GameViewport.HEIGHT);
    //    context.moveTo(GameViewport.WIDTH,0);
    //    context.lineTo(0,GameViewport.HEIGHT);
    //    context.stroke();
    
        context.drawImage(ken,position.x,position.y);

        window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);

    console.log(context);
}