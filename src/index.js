import { StreetFighterGame } from "./StreetFighterGame.js";
import { FighterDirection, FighterState } from "./constants/fighter.js";

//multiplicamos por una constante para escalar el lienzo basado en street fighter


function populateMoveDropdown(){
    const dropwdown = document.getElementById('state-dropdown');

    Object.entries(FighterState).forEach(([,value]) =>{
        const option = document.createElement('option');
        option.setAttribute('value',value);
        option.innerText = value;
        dropwdown.appendChild(option);
    });
}



// el punto medio del canvas es 192,112
window.addEventListener('load', function (){

    populateMoveDropdown();

    new StreetFighterGame().start();


   
});