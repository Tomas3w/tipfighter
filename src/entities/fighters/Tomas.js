import {Fighter} from './Fighter.js';
import {FighterState} from '../../constants/fighter.js'
export class Tomas extends Fighter {
    constructor(x,y,direction,playerId){
      super('Tomas',x,y,direction,playerId);
      this.image = document.querySelector('img[alt="tomas"]');

      this.frames = new Map([
         //idle stance
       
        ['idle-1',[[55,48,28,80],[33,87]]],
        ['idle-2',[[17,51,28,79],[33,86]]],

        ['forwards-1',[[58,136,28,79],[33,87]]],
        ['forwards-2',[[18,136,28,79],[33,86]]],
      
        ['backwards-1',[[58,136,28,79],[33,87]]],
        ['backwards-2',[[18,136,28,79],[33,86]]],
      
        ['jump-up-1',[[23,229,32,69],[32,107]]],
        ['jump-up-2',[[67,221,27,79],[25,103]]],
       
         //jump Forwards/backwards
         ['jump-roll-1',[[442,261,61,78],[22,90]]],
         ['jump-roll-2',[[442,261,61,78],[22,90]]],
         ['jump-roll-3',[[507,259,104,42],[61,76]]],
         ['jump-roll-4',[[617,240,53,82],[42,111]]],
         ['jump-roll-5',[[676,257,122,44],[71,81]]],
         ['jump-roll-6',[[804,258,71,87],[53,98]]],
         ['jump-roll-7',[[883,261,54,109],[31,113]]],

          //crouch
        ['crouch-1',[[36,316,32,69],[32,78]]],
        ['crouch-2',[[95,315,32,70],[32,78]]],
       
      ]);

      this.animations = {
        [FighterState.IDLE]:[
          ['idle-1',300],['idle-2',300],
        ],
        [FighterState.WALK_FORWARD]: [
          ['forwards-1',350],['forwards-2',350],
        ],
        [FighterState.WALK_BACKWARD]:[
          ['backwards-1',350],['backwards-2',350],
        ],
        [FighterState.JUMP_UP]:[
          ['jump-up-1',250],['jump-up-1',150],['jump-up-2',200],['jump-up-2',200],['jump-up-2',-1],

        ],
        [FighterState.JUMP_FORWARD]:[
          ['jump-roll-1',200],['jump-roll-2',50],['jump-roll-3',50],
          ['jump-roll-4',50],['jump-roll-5',50],['jump-roll-6',50],
          ['jump-roll-7',0],
        ],
        [FighterState.JUMP_BACKWARD]:[
          ['jump-roll-7',200],['jump-roll-6',50],['jump-roll-5',50],
          ['jump-roll-4',50],['jump-roll-3',50],['jump-roll-2',50]
          ,['jump-roll-1',0],
        ],
        [FighterState.CROUCH]:[
          ['crouch-2',0],
        
        ],
        [FighterState.CROUCH_DOWN]:[
          ['crouch-1',50],['crouch-2',-2],
        
        ],
        [FighterState.CROUCH_UP]:[
         ['crouch-2',50],['crouch-1',-2],
        
        ],
      };

      this.initialVelocity = {
        x:{
          [FighterState.WALK_FORWARD]:150,
          [FighterState.WALK_BACKWARD]:-100,
          [FighterState.JUMP_FORWARD]:170,
          [FighterState.JUMP_BACKWARD]:-200,
        },
        jump: -420,
      };

      this.gravity = 1000;
    }
}

 
