import {Ken} from "./entities/fighters/Ken.js";
import {Ryu} from "./entities/fighters/Ryu.js";
import {Tomas} from "./entities/fighters/Tomas.js";
import {Stage} from "./entities/Stage.js";
import {FpsCounter} from "./entities/FpsCounter.js";
import {STAGE_FLOOR} from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";
import { registerKeyboardEvents } from "./inputHandler.js";

export class StreetFighterGame{
constructor(){
    this.context = this.getContext();
    this.fighters = [
        new Ryu(104,STAGE_FLOOR,FighterDirection.RIGHT,0),
    //    new Ken(280,STAGE_FLOOR,FighterDirection.LEFT,1),
        new Tomas(150,STAGE_FLOOR,FighterDirection.LEFT,1),
    ]
    
    this.entities = [ 
        new Stage(),
      
        ...this.fighters,
        new FpsCounter(),
    ]
    
    this.frameTime = {
         previous : 0,
         secondsPassed : 0,
    };
}

getContext(){
    const canvasEl = document.querySelector('canvas');
    canvasEl.width = 384;
    canvasEl.height = 224;
    const context = canvasEl.getContext('2d');
    context.imageSmoothingEnabled = false;

    return context;
}

update(){
    for (const entity of this.entities){
        entity.update(this.frameTime,this.context);

    }
}

draw(){
    for (const entity of this.entities){
        entity.draw(this.context);
        
    }
}



 frame(time){
    window.requestAnimationFrame(this.frame.bind(this));
    this.frameTime = {
        secondsPassed : (time - this.frameTime.previous) / 1000,
        previous : time,
    }
    
    this.update();
    this.draw();

    

  
    
}



    start(){
        registerKeyboardEvents();

        window.requestAnimationFrame(this.frame.bind(this));
    }
}