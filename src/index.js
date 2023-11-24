import { StreetFighterGame } from "./StreetFighterGame.js";


//multiplicamos por una constante para escalar el lienzo basado en street fighter




// el punto medio del canvas es 192,112
window.addEventListener('load', function (){

    
    window.app = new StreetFighterGame();
    app.start();


   
});