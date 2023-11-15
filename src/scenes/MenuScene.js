import {Ken} from "../entities/fighters/Ken.js";
import {Ryu} from "../entities/fighters/Ryu.js";
import {Tomas} from "../entities/fighters/Tomas.js";
import {Stage} from "../entities/Stage.js";
import {FpsCounter} from "../entities/FpsCounter.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "../constants/stage.js";

import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "../inputHandler.js";
import { StatusBar } from "../entities/overlays/StatusBar.js";
import { Camera } from "../Camera.js";
import { getContext } from "../utils/context.js";
import { BackgroundAnimation } from "../entities/BackgroundAnimation.js";
import { BattleScene } from "../scenes/BattleScene.js";
import { TitleText } from "../entities/TitleText.js";
import { Button } from "../entities/Button.js";

export class MenuScene {
    constructor(game, context) {
        this.game = game;
        this.camera_y = 0;
        this.background_animation = new BackgroundAnimation(0);
        this.title_text = new TitleText();

        this.arcade_button = new Button(context, [0, 46, 78, 29], [0, 0, 78, 29], {x: 100, y: 120}, () => {
            this.game.currentScene = new BattleScene(this, context);
        });
        this.story_button = new Button(context, [124, 46, 78, 29], [124, 0, 78, 29], {x: 200, y: 120}, () => {
            console.log('hello!');
        });

        this.entities = [
            this.background_animation,
            this.title_text,

            this.arcade_button,
            this.story_button,
        ]
    }

    update(time, context) {
        for (const entity of this.entities){
            entity.update(time, context, this.camera);
        }
        this.arcade_button.position.y = this.title_text.frame + 150;
        this.story_button.position.y = this.title_text.frame + 150;
        if (time.previous > 2000 && !this.background_animation.on)
        {
            this.background_animation.activate(time);
        }
        if (this.background_animation.isActive() && this.background_animation.frame > 14 && !this.title_text.isActive())
        {
            this.title_text.activate(time);
            // console.log('Done!')
        }
    }

    draw(context) {
        for (const entity of this.entities){
            entity.draw(context, this.camera);
        }
    }

}

