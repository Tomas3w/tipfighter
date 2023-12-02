import { TIME_DELAY, TIME_FRAME_KEYS, TIME_FLASH_DELAY } from '../../constants/battle.js';
import { drawFrame } from '../../utils/context.js';
import { FighterIdFromName } from "../../constants/fighter.js";

export class StatusBar{
    constructor(fighters){
        this.image = document.querySelector('img[alt="misc"]');
        this.characters_image = document.querySelector('img[alt="cuadros-personajes"]');

        this.time = 99;
        this.timeTimer = 0;

        this.timeFlashTimer = 0;
        this.useFlashFrames = false;

        this.fighters = fighters;

        this.frames = new Map([
            // ['health-bar',[16,18,145,11]],
            ['health-bar',[6,218,376,35]],
            ['health-bar-background',[6,255,376,35]],
            ['energy-bar',[362,236,134,9]],

            ['ko-white',[161,16,32,14]],

            [`${TIME_FRAME_KEYS[0]}-0`,[16,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-1`,[32,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-2`,[48,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-3`,[64,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-4`,[80,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-5`,[96,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-6`,[112,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-7`,[128,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-8`,[144,32,14,16]],
            [`${TIME_FRAME_KEYS[0]}-9`,[160,32,14,16]],

            [`${TIME_FRAME_KEYS[1]}-0`,[16,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-1`,[32,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-2`,[48,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-3`,[64,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-4`,[80,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-5`,[96,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-6`,[112,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-7`,[128,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-8`,[144,192,14,16]],
            [`${TIME_FRAME_KEYS[1]}-9`,[160,192,14,16]],
            
            //name tags
            ['tag-ken',[128,56,30,9]],
            ['tag-ryu',[16,56,28,9]],
            ['tag-tomas',[56,56,48,9]],
            ['tag-jesus',[168,56,43,9]],
            ['tag-milton',[226,56,55,9]],
            ['tag-bernardo',[287,40,75,9]],

        ]);

        const [{name: name1},{name: name2}] = this.fighters;

        this.names = [`tag-${name1.toLowerCase()}`,`tag-${name2.toLowerCase()}`];
    }

    drawFrame(context, frameKey, x,y,direction = 1){
        drawFrame(context,this.image, this.frames.get(frameKey),x,y,direction);
    }

    updateTime(time){
        //el ultimo valor es un delay
        if(time.previous > this.timeTimer + TIME_DELAY){
            this.time -= 1;
            this.timeTimer= time.previous;
        }

        if(this.time <15 && this.time > -1
            && time.previous > this.timeFlashTimer + TIME_FLASH_DELAY
            ){
            this.useFlashFrames = !this.useFlashFrames;
            this.timeFlashTimer = time.previous;
        }
    }

    update(time){
        this.updateTime(time);
    }

    drawHealthBars(context){
        this.drawFrame(context, 'health-bar-background', (context.canvas.width - this.frames.get('health-bar-background')[2]) / 2, 10);
        let rect1 = [...this.frames.get('health-bar')];
        let rect2 = [...this.frames.get('health-bar')];
        const max_x = 177;
        const min_x = 29;
        rect1[2] = (max_x - min_x) * (this.fighters[0].life / 100) + min_x;
        rect2[2] = (max_x - min_x) * (this.fighters[1].life / 100) + min_x;
        drawFrame(context, this.image, rect1, (context.canvas.width - this.frames.get('health-bar')[2]) / 2, 10, 1);
        drawFrame(context, this.image, rect2, (context.canvas.width - this.frames.get('health-bar')[2]) / 2 + this.frames.get('health-bar')[2], 10, -1);
        let rect_e1 = [...this.frames.get('energy-bar')];
        let rect_e2 = [...this.frames.get('energy-bar')];
        rect_e1[2] = (rect_e1[2] - 3) * (this.fighters[0].energy / 100) + 2;
        drawFrame(context, this.image, rect_e1, 40, 28, 1);
        rect_e2[2] = (rect_e2[2] - 3) * (this.fighters[1].energy / 100) + 2;
        drawFrame(context, this.image, rect_e2, 344, 28, -1);
    }

    drawNameTags(context){
        const [name1,name2] = this.names;

        this.drawFrame(context, name1, 4, 43);
        this.drawFrame(context, name2, 380 - this.frames.get(name2)[2], 43);
    }

    drawTime(context){
        const timeString = String(Math.max(this.time,0)).padStart(2,'00');
        const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];
        this.drawFrame(context,`${flashFrame}-${timeString.charAt(0)}`,178,47);
        this.drawFrame(context,`${flashFrame}-${timeString.charAt(1)}`,194,47);

    }

    drawCuadroPersonaje(context) {
        let c1 = FighterIdFromName[this.fighters[0].name];
        let c2 = FighterIdFromName[this.fighters[1].name];
        drawFrame(context, this.characters_image, [Math.floor((c1 % 3) * 29), Math.floor(c1 / 3) * 29, 29, 29], 4, 13);
        drawFrame(context, this.characters_image, [Math.floor((c2 % 3) * 29), Math.floor(c2 / 3) * 29, 29, 29], context.canvas.width - 4 - 29, 13);
    }

    draw(context){
        this.drawHealthBars(context);
        this.drawNameTags(context);
        this.drawTime(context);
        this.drawCuadroPersonaje(context);
      


    }
}