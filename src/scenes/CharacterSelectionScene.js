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
import { Button } from "../entities/Button.js";
import { CharacterSelector } from "../entities/CharacterSelector.js";

export class CharacterSelectionScene {
    constructor(game, context) {
        this.game = game;
        this.camera_y = 0;
        this.background_animation = new BackgroundAnimation(1);

        this.play_button = new Button(context, [0, 75 + 46, 78, 29], [0, 75, 78, 29], {x: context.canvas.width / 2 - 78 / 2, y: 180}, () => {
			this.background_animation.activate(game.frameTime);
			this.entities.splice(this.entities.indexOf(this.play_button), 1);
			this.entities.splice(this.entities.indexOf(this.selector), 1);
            this.play_button.destroy();
        });

		this.selector = new CharacterSelector();

        this.entities = [
            this.background_animation,
            this.play_button,
			this.selector,
        ]
    }

    update(time, context) {
        for (const entity of this.entities){
            entity.update(time, context, this.camera);
        }
		if (this.background_animation.isDone(time))
			this.game.currentScene = new BattleScene(this.game, context, this.selector.c1, this.selector.c2);
    }

    draw(context) {
        for (const entity of this.entities){
            entity.draw(context, this.camera);
        }
    }

}

