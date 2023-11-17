import {Ken} from "../entities/fighters/Ken.js";
import {Ryu} from "../entities/fighters/Ryu.js";
import {Tomas} from "../entities/fighters/Tomas.js";
import {Joaquin} from "../entities/fighters/Joaquin.js";
import {Milton} from "../entities/fighters/Milton.js";
import {Stage} from "../entities/Stage.js";
import {FpsCounter} from "../entities/FpsCounter.js";
import { STAGE_MID_POINT, STAGE_PADDING} from "../constants/stage.js";

import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "../inputHandler.js";
import { StatusBar } from "../entities/overlays/StatusBar.js";
import { Camera } from "../Camera.js";
import { getContext } from "../utils/context.js";

export class BattleScene {
    constructor(game, context) {
        this.game = game;
        this.fighters = [
            new Tomas(0),new Milton(1),
          //  new Tomas(150,STAGE_FLOOR,FighterDirection.LEFT,1),
        ]
        
        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING -(context.canvas.width / 2), 16, this.fighters);
        this.entities = [ 
            new Stage(),
          
            ...this.fighters,
            new FpsCounter(),
            new StatusBar(this.fighters),
        ]
    }

    update(time, context) {
        this.camera.update(time, context);

        for (const entity of this.entities){
            entity.update(time, context, this.camera);
        }
    }

    draw(context) {
        for (const entity of this.entities){
            entity.draw(context, this.camera);
        }
    }

}

