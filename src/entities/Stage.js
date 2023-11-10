export class Stage{
    constructor(){
        this.image = document.querySelector('img[alt="pasillo"]');
    }

    update(context){

    }

    draw(context){
        context.drawImage(this.image,0,0);
    }
}




