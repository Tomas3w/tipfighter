import {Ken} from "./entities/fighters/Ken.js";
import {Ryu} from "./entities/fighters/Ryu.js";
import {Stage} from "./entities/Stage.js";
import {FpsCounter} from "./entities/FpsCounter.js";
import {STAGE_FLOOR} from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";
//multiplicamos por una constante para escalar el lienzo basado en street fighter
const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,
  
}

// el punto medio del canvas es 192,112
window.addEventListener('load', function (){
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d');
    context.imageSmoothingEnabled = false;
    
    canvasEl.width = GameViewport.WIDTH;
    canvasEl.height = GameViewport.HEIGHT;
    const entities = [ 
        new Stage(),
        new Ken(104,STAGE_FLOOR,FighterDirection.LEFT),
        new Ryu(280,STAGE_FLOOR,FighterDirection.RIGHT),
        new FpsCounter(),
    ]
   
    let frameTime = {
         previous : 0,
         secondsPassed : 0,
    };


  
    function frame(time){
        window.requestAnimationFrame(frame);
        frameTime = {
            secondsPassed : (time - frameTime.previous) / 1000,
            previous : time,
        }
        for (const entity of entities){
            entity.update(frameTime,context);

        }

        for (const entity of entities){
            entity.draw(context);
            
        }

      
        
    }

    window.requestAnimationFrame(frame);

   
});