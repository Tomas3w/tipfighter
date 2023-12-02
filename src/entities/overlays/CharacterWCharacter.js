import { drawFrame } from "../../utils/context.js";

export class CharacterWCharacter {
    static animation_duration = 20;
    constructor(c1, c2) {
        this.image = document.querySelector('img[alt="cuadros-personajes"]');
		this.c1 = c1;
		this.c2 = c2;
    }

    update(time) {
    }

    drawFrame(context){
		let x = context.canvas.width / 2;
		let y = Math.floor((context.canvas.height - 58) / 2);
        // drawFrame(context, this.image, [0, 0, 87, 58], x, y);
		drawFrame(context, this.image, [Math.floor((this.c1 % 3) * 29), Math.floor(this.c1 / 3) * 29, 29, 29], x - 29 * 2, y, -1);
		drawFrame(context, this.image, [Math.floor((this.c2 % 3) * 29), Math.floor(this.c2 / 3) * 29, 29, 29], x + 29 * 2, y);
    }

    draw(context, camera){
        this.drawFrame(context);
    }
}




