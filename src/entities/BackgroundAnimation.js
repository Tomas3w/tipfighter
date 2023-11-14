import { drawFrame } from "../utils/context.js";
export class BackgroundAnimation {
    static animation_duration = 20;
    constructor(animation_variant) {
        this.image = document.querySelector('img[alt="menu-background"]');
        this.frame = 0;
        this.on = false;
        this.animation_variant = animation_variant;
    }

    activate(time) {
        this.on = true;
        this.ptime = time.previous;
    }

    update(time) {
        if (this.on)
            this.frame = Math.min(BackgroundAnimation.animation_duration, Math.floor((time.previous - this.ptime) / 1000 * 24));
    }

    isActive() {
        return this.on;
    }

    isDone(time) {
        return BackgroundAnimation.animation_duration + 1 < Math.floor((time.previous - this.ptime) / 1000 * 24);
    }

    drawFrame(context){
        drawFrame(context, this.image, [this.frame * (398 + 10), this.animation_variant * 224, 398, 224], 0, 0);
    }

    draw(context,camera){
        this.drawFrame(context);
    }
}




