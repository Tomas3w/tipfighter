import { drawFrame } from "../../utils/context.js";

export class WinnerText {
    static animation_duration = 20;
    constructor(x, y) {
        this.image = document.querySelector('img[alt="misc"]');
		this.x = x;
		this.y = y;
    }

    update(time) {
    }

    getLetter(x, y = null) {
        if (y === null)
        {
            let nx = x % 16;
            y = Math.floor(x / 16);
            x = nx;
        }
        return [17 + 12 * x, 89 + 12 * y, 12, 12];
    }

    letterToCode(letter) {
        let n = letter.charCodeAt(0);
        if (n > 33 + 14)
            n += 1;
        return n - 33;
    }
    lettersToImageLocations(str) {
        let letters = [];
        for (var i = 0; i < str.length; i++) {
            letters.push(this.letterToCode(str[i]));
        }
        return letters;
    }

    drawFrame(context){
        const letters = this.lettersToImageLocations('GANADOR!');
        // const letters = [];//this.lettersToImageLocations('GANADOR!');
        for (var i = 0; i < letters.length; i++) {
            let element = letters[i];
            drawFrame(context, this.image, this.getLetter(element), this.x + i * 12, this.y);
        }
    }

    draw(context, camera){
        this.drawFrame(context);
    }
}




