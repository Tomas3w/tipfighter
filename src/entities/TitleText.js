import { drawFrame } from "../utils/context.js";
export class TitleText {
    static animation_duration = 20;
    constructor() {
        this.image = document.querySelector('img[alt="title-text"]');
        this.frame = -200;
        this.on = false;
    }

    activate(time) {
        this.on = true;
        this.ptime = time.previous;
    }

    update(time) {
        if (this.on)
        {
            let t = (time.previous - this.ptime) / 1000 * 24;
            let g = 4 / t;
            let f = -(Math.pow(Math.E, -(t - 16) * 0.3)) + 20;
            this.frame = Math.sin((t * t * 0.1) / 6) * 20 * (g * g * 10) + f;
                // (-Math.pow(Math.E, -(t * 0.03))) + 20
                // +
                // (1 / ((t + 1) * 1)) * (Math.sin(t) * 50);
        }
        //Math.min(Math.floor((time.previous - this.ptime) / 1000 * 220 - 200), 20);
    }

    isActive() {
        return this.on;
    }

    isDone(time) {
        throw new Error('isDone not implemented for class TitleText');
    }

    drawFrame(context){
        drawFrame(context, this.image, [0, 0, 378, 106], (context.canvas.width - this.image.naturalWidth) / 2, this.frame);
    }

    draw(context, camera){
        this.drawFrame(context);
    }
}




