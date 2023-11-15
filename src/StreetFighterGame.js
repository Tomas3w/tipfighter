import {Ken} from "./entities/fighters/Ken.js";
import {Ryu} from "./entities/fighters/Ryu.js";
import {Tomas} from "./entities/fighters/Tomas.js";
import {Stage} from "./entities/Stage.js";
import {FpsCounter} from "./entities/FpsCounter.js";
import { STAGE_MID_POINT, STAGE_PADDING} from "./constants/stage.js";

import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "./inputHandler.js";
import { StatusBar } from "./entities/overlays/StatusBar.js";
import { Camera } from "./Camera.js";
import { getContext } from "./utils/context.js";
import { BattleScene } from "./scenes/BattleScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
export class StreetFighterGame{
constructor(){
    this.context = getContext();

    this.currentScene = new MenuScene(this.context);
    // this.currentScene = new BattleScene(this.context);

    this.frameTime = {
         previous : 0,
         secondsPassed : 0,
    };
}



update() {
    this.currentScene.update(this.frameTime, this.context);
}

draw() {
    // for (const entity of this.entities){
    //     entity.draw(this.context,this.camera);
    // }
    this.currentScene.draw(this.context);
}



    frame(time){
        window.requestAnimationFrame(this.frame.bind(this));
        this.frameTime = {
            secondsPassed : (time - this.frameTime.previous) / 1000,
            previous : time,
        }
        
        pollGamepads();
        this.update();
        this.draw();
    }



    start(){
        registerKeyboardEvents();

        registerGamepadEvents();

        window.requestAnimationFrame(this.frame.bind(this));
    }
}