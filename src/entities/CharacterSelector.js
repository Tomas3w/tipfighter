import { drawFrame } from "../utils/context.js";
import * as control from '../inputHandler.js';

export class CharacterSelector {
    static animation_duration = 20;
    constructor() {
        this.image = document.querySelector('img[alt="cuadros-personajes"]');
		this.c1 = 0;
		this.c2 = 2;

		this.temp_buttons = [false, false, false, false]
    }

    update(time) {
		//this.c1 = Math.floor(Math.floor(time.previous / 1000) % 6);
		if (control.isLeft(0))
			this.temp_buttons[0] = true;
		else if (this.temp_buttons[0])
		{
			this.temp_buttons[0] = false;
			if (this.c1 === 0)
				this.c1 = 5;
			else
				this.c1 -= 1;
		}
		if (control.isRight(0))
			this.temp_buttons[1] = true;
		else if (this.temp_buttons[1])
		{
			this.temp_buttons[1] = false;
			this.c1 = (this.c1 + 1) % 6;
		}
		if (control.isLeft(1))
			this.temp_buttons[2] = true;
		else if (this.temp_buttons[2])
		{
			this.temp_buttons[2] = false;
			if (this.c2 === 0)
				this.c2 = 5;
			else
				this.c2 -= 1;
		}
		if (control.isRight(1))
			this.temp_buttons[3] = true;
		else if (this.temp_buttons[3])
		{
			this.temp_buttons[3] = false;
			this.c2 = (this.c2 + 1) % 6;
		}
    }

    drawFrame(context){
		let x = Math.floor((context.canvas.width - 87) / 2);
		let y = Math.floor((context.canvas.height - 58) / 2);
        drawFrame(context, this.image, [0, 0, 87, 58], x, y);
		if (this.c1 === this.c2)
		{
			drawFrame(context, this.image, [29 * 2, 58, 29, 29], 
				Math.floor((this.c1 % 3) * 29) + x,
				Math.floor(Math.floor(this.c1 / 3) * 29) + y);
		}
		else
		{
			drawFrame(context, this.image, [0, 58, 29, 29], 
				Math.floor((this.c1 % 3) * 29) + x,
				Math.floor(Math.floor(this.c1 / 3) * 29) + y);
			drawFrame(context, this.image, [29, 58, 29, 29], 
				Math.floor((this.c2 % 3) * 29) + x,
				Math.floor(Math.floor(this.c2 / 3) * 29) + y);
		}
    }

    draw(context, camera){
        this.drawFrame(context);
    }
}




