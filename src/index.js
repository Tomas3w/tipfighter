import {Ken} from "./entities/fighters/Ken.js";
import {Ryu} from "./entities/fighters/Ryu.js";
import {Stage} from "./entities/Stage.js";
import {FpsCounter} from "./entities/FpsCounter.js";

//multiplicamos por una constante para escalar el lienzo basado en street fighter
const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,
  
}

// el punto medio del canvas es 192,112
window.addEventListener('load', function (){
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d');

    
    canvasEl.width = GameViewport.WIDTH;
    canvasEl.height = GameViewport.HEIGHT;
    const entities = [ 
        new Stage(),
        new Ken(80,110,150),
        new Ryu(80,110,-150),
        new FpsCounter(),
    ]
   

    let previusTime = 0;
    let secondsPassed = 0;

    function frame(time){
        window.requestAnimationFrame(frame);
        secondsPassed = (time - previusTime) / 1000;
        previusTime = time ;

        for (const entity of entities){
            entity.update(secondsPassed,context);

        }

        for (const entity of entities){
            entity.draw(context);
            
        }

      
        
    }

    window.requestAnimationFrame(frame);

   
});