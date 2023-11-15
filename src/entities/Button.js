import { drawFrame } from "../utils/context.js";

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

export class Button {
    static animation_duration = 20;
    constructor(context, unpressed_rectangle, pressed_rectangle, position) {
        this.image = document.querySelector('img[alt="buttons"]');
        this.unpressedRectangle = unpressed_rectangle;
        this.pressedRectangle = pressed_rectangle;
        this.position = position;

        this.pressed = false;
        this.hovered = false;
        
        this.onMouseMove = (event) => {
            const mouse = getMousePos(context.canvas, event);
            const mouseX = mouse.x;
            const mouseY = mouse.y;

            if (mouseX >= this.position.x && mouseX <= this.position.x + this.unpressedRectangle[2] &&
                mouseY >= this.position.y && mouseY <= this.position.y + this.unpressedRectangle[3])
                this.hovered = true;
            else
                this.hovered = false;
        }

        this.onMouseDown = (event) => {
            const mouse = getMousePos(context.canvas, event);
            const mouseX = mouse.x;
            const mouseY = mouse.y;

            if (mouseX >= this.position.x && mouseX <= this.position.x + this.unpressedRectangle[2] &&
                mouseY >= this.position.y && mouseY <= this.position.y + this.unpressedRectangle[3])
                this.pressed = true;
        }
        
        this.onClick = (event) => {
            const mouse = getMousePos(context.canvas, event);
            const mouseX = mouse.x;
            const mouseY = mouse.y;

            if (this.hovered && this.pressed)
                console.log('pressed on!');
            this.pressed = false;
        }

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('click', this.onClick);
    }

    destroy() {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('click', this.onClick);
    }

    update(time) {

    }

    drawFrame(context){
        let rect = this.unpressedRectangle;
        if (this.pressed)
            rect = this.pressedRectangle;
        drawFrame(context, this.image, rect, this.position.x, this.position.y);
    }

    draw(context, camera){
        this.drawFrame(context);
    }
}




