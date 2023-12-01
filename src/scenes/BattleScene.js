import {Ken} from "../entities/fighters/Ken.js";
import {Ryu} from "../entities/fighters/Ryu.js";
import {Tomas} from "../entities/fighters/Tomas.js";
import {Joaquin} from "../entities/fighters/Joaquin.js";
import {Milton} from "../entities/fighters/Milton.js";
import {Jesus} from "../entities/fighters/Jesus.js";
// import {Maximiliano} from "../entities/fighters/Maximiliano.js";
import {Bernardo} from "../entities/fighters/Bernardo.js";
import {Stage} from "../entities/Stage.js";
import {FpsCounter} from "../entities/FpsCounter.js";
import { STAGE_MID_POINT, STAGE_PADDING} from "../constants/stage.js";

import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "../inputHandler.js";
import { StatusBar } from "../entities/overlays/StatusBar.js";
import { Camera } from "../Camera.js";
import { getContext } from "../utils/context.js";
import { MatchEndScene } from "./MatchEndScene.js";
import { FighterIdFromName } from "../constants/fighter.js";

const FighterClasses = [
    Tomas,
    Milton,
    Joaquin,
    Jesus,
    undefined,
    Bernardo,
];

export class BattleScene {
    constructor(game, context, c1, c2) {
        this.game = game;
        this.fighters = [
            new FighterClasses[c1](0), new FighterClasses[c2](1),
        ]
        
        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING -(context.canvas.width / 2), 16, this.fighters);

        this.statusBar = new StatusBar(this.fighters);

        this.entities = [ 
            new Stage(),
          
            ...this.fighters,
            new FpsCounter(),
            this.statusBar,
        ]
    }

    update(time, context) {
        this.camera.update(time, context);

        for (const entity of this.entities){
            entity.update(time, context, this.camera);
        }

        if (this.fighters[0].life != this.fighters[1].life)
        {
            if (this.statusBar.time <= 0)
            {
                if (this.fighters[0].life < this.fighters[1].life)
                    this.game.currentScene = new MatchEndScene(this.game, context, FighterIdFromName[this.fighters[1].name], FighterIdFromName[this.fighters[0].name]);
                else
                    this.game.currentScene = new MatchEndScene(this.game, context, FighterIdFromName[this.fighters[0].name], FighterIdFromName[this.fighters[1].name]);
            }
            if (this.fighters[0].life <= 0)
                this.game.currentScene = new MatchEndScene(this.game, context, FighterIdFromName[this.fighters[0].name], FighterIdFromName[this.fighters[1].name]);
            else if (this.fighters[1].life <= 0)
                this.game.currentScene = new MatchEndScene(this.game, context, FighterIdFromName[this.fighters[1].name], FighterIdFromName[this.fighters[0].name]);
        }
        else if (this.fighters[0].life <= 0 || this.statusBar.time <= 0)
            this.game.currentScene = new MatchEndScene(this.game, context, FighterIdFromName[this.fighters[0].name], FighterIdFromName[this.fighters[1].name], true);
    }

    draw(context) {
        for (const entity of this.entities){
            entity.draw(context, this.camera);
        }
    }

}

