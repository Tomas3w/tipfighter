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
import { CharacterSelectionScene } from "../scenes/CharacterSelectionScene.js";
import { TitleText } from "../entities/TitleText.js";
import { Button } from "../entities/Button.js";
import { CharacterWCharacter } from "../entities/overlays/CharacterWCharacter.js";
import { WinnerText } from "../entities/overlays/WinnerText.js";
import { EmpateText } from "../entities/overlays/EmpateText.js";
import { MenuScene } from "../scenes/MenuScene.js";

export class MatchEndScene {
    constructor(game, context, c2, c1, es_empate = false) {
        this.game = game;
        this.camera_y = 0;
        this.background_animation = new BackgroundAnimation(0);
        this.button = new Button(context, [0, 75 + 46 + 75, 78, 29], [0, 75 + 75, 78, 29], {x: context.canvas.width / 2 - 78 / 2, y: 180}, () => {
            game.currentScene = new MenuScene(game, context, false);
            this.button.destroy();
        });
        this.overlay = new CharacterWCharacter(c1, c2);
        if (es_empate)
            this.text_overlay = new EmpateText(context.canvas.width / 2 - 12 * 'EMPATE!'.length / 2.0 + 3, Math.floor((context.canvas.height - 58) / 2) - 12);
        else
            this.text_overlay = new WinnerText(context.canvas.width / 2 - 29 * 3 - 12 * 'GANADOR!'.length / 2.0 + Math.floor(29 / 2.0), Math.floor((context.canvas.height - 58) / 2) - 12);

        this.entities = [
            this.background_animation,
            this.button,
            this.overlay,
            this.text_overlay
        ]
    }

    update(time, context) {
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

