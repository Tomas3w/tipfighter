import {Fighter} from './Fighter.js';
import {FighterState, FrameDelay} from '../../constants/fighter.js'
export class Milton extends Fighter {
  constructor(playerId){
    super('Milton',playerId);
      this.image = document.querySelector('img[alt="milton"]');


      this.PushBox = {
        IDLE: [-10,-77,20,70],
        JUMP: [-16,-91,32,66],
        BEND: [-26,-77,32,70],
        CROUCH: [-50,-120,32,50],
     }
     
     this.HurtBox = {
        IDLE:[[-7,-80,14,15],[-11,-66,22,28],[-10,-38,20,22]],
        BACKWARD:[[-19,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        FORWARD:[[-3,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        JUMP:[[-13,-106,28,18],[-16,-53,40,42],[-22,-66,38,18]],
        BEND:[[-8,-76,14,16],[-26,-60,32,34],[-1,-30,24,22]],
        CROUCH:[[6,-61,24,18],[-16,-46,44,24],[-16,-24,44,24]],
        PUNCH:[[11,-94,24,18],[-7,-77,40,43],[-7,-33,40,33]],
     };

      this.frames = new Map([
         //idle stance
       
        ['idle-1',[[[2,345,32,71],[18,77]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['idle-2',[[[48,344,32,72],[18,78]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['backwards-8',[[[7,778,27,68],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-7',[[[57,778,28,68],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-6',[[[106,778,31,67],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-5',[[[152,778,32,66],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-4',[[[200,778,31,67],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-3',[[[253,778,28,68],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-2',[[[306,778,27,68],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-1',[[[356,778,28,68],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['jump-up-1',[[[7,453,24,57],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['jump-kick-1',[[[346,688,60,89],[34,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-2',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-3',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      

        ['crouch-1',[[[7,28,24,57],[25,76]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-2',[[[50,27,24,58],[25,77]],this.PushBox.BEND,this.HurtBox.BEND]],
        
        ['jump-roll-1',[[[7,453,24,57],[22,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-2',[[[7,453,24,57],[22,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        
        ['jump-land',[[[660,1060,55,85],[29,83]],this.PushBox.IDLE,this.HurtBox.IDLE]],
          
        //stand turn
        ['idle-turn-1',[[[420,682,54,95],[29,92]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-2',[[[488,678,58,98],[30,95]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-3',[[[560,683,54,94],[27,90]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],


        //crouch turn
        // ['crouch-turn-1',[[[356,802,53,61],[26,58]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        // ['crouch-turn-2',[[[424,802,52,61],[27,58]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        // ['crouch-turn-3',[[[486,802,53,61],[29,58]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        //light punch (los personajes solo tienen este golpe)
       
        ['light-punch-1',[[[11,863,21,70],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['light-punch-2',[[[48,863,36,70],[23,86]],this.PushBox.IDLE,this.HurtBox.IDLE,[-6,-70,19,8]]],

        ['med-punch-1',[[[517,1149,60,94],[28,91]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['med-punch-2',[[[650,1148,74,95],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
        ['med-punch-3',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],

        ['heavy-punch-1',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
       
        //light kick (los personajes solo tienen esta patada)
       
        ['light-kick-1',[[[5,692,28,67],[22,86]],this.PushBox.IDLE,[[-33,-96,30,18],[-41,-79,42,38],[-32,-52,44,50]]]],
        ['light-kick-2',[[[57,695,45,64],[23,86]],this.PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]],[14,-78,9,8]]],

        ['med-kick-1',[[[143,1565,114,92],[68,93]],this.PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]]]],
        
        ['heavy-kick-1',[[[683,1571,61,90],[37,87]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-2',[[[763,1567,95,94],[45,91]],this.PushBox.IDLE,[[12,-90,34,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-3',[[[870,1567,120,94],[42,91]],this.PushBox.IDLE,[[13,-91,62,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-4',[[[1005,1584,101,77],[39,74]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-5',[[[1147,1580,64,81],[38,78]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        
       
      ]);
      for (let i = 1; i <= 8; i++)
        this.frames.set('forwards-' + i, [[[(i - 1) * 50,765,39,89],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      for (let i = 1; i <= 5; i++)
        this.frames.set('jump-' + i, [[[(i - 1) * 67,433,59,86],[27,86]],this.PushBox.IDLE,this.HurtBox.IDLE]);

      this.animations = {
        [FighterState.IDLE]:[
          ['idle-1',300],['idle-2',300],
        ],
        [FighterState.IDLE_TURN]:[
          ['idle-turn-1',33],['idle-turn-2',33],
          ['idle-turn-1',33],['idle-turn-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.CROUCH_TURN]:[
          ['crouch-1',33],['crouch-2',33],
          ['crouch-1',33],['crouch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.WALK_FORWARD]: [
          ['forwards-1',50],['forwards-2',50],['forwards-3',50],['forwards-4',50],['forwards-5',50],['forwards-6',50],['forwards-7',50],['forwards-8',50],
        ],
        [FighterState.WALK_BACKWARD]:[
          ['forwards-8',50],['forwards-7',50],['forwards-6',50],['forwards-5',50],['forwards-4',50],['forwards-3',50],['forwards-2',50],['forwards-1',50],
        ],
        [FighterState.JUMP_START]:[
          ['jump-1',50],  ['jump-1',FrameDelay.TRANSITION]
        
        ],
        [FighterState.JUMP_LAND]:[
          ['jump-5',33],  ['jump-5',117],['jump-5',FrameDelay.TRANSITION], 
        
        ],
        [FighterState.JUMP_UP]:[
          ['jump-1',10],['jump-2',200],['jump-3',200],['jump-4',200],['jump-5',FrameDelay.TRANSITION],

        ],
        [FighterState.LIGHT_PUNCH]:[
          ['light-punch-1',33],['light-punch-2',66],
          ['light-punch-1',66],['light-punch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.LIGHT_KICK]:[
          ['light-kick-1',33],['light-kick-2',33],
          ['light-kick-2',66],['light-kick-2',FrameDelay.TRANSITION],
        
        ],
        [FighterState.JUMP_FORWARD]:[
          ['jump-roll-1',750],['jump-roll-2',50],
          ['jump-roll-2',0],
        ],
        [FighterState.JUMP_BACKWARD]:[
          ['jump-roll-1',750],['jump-roll-2',50],
          ['jump-roll-2',0],
        ],
        [FighterState.CROUCH]:[
          ['crouch-2',FrameDelay.FREEZE],
        
        ],
        [FighterState.CROUCH_DOWN]:[
          ['crouch-1',50],['crouch-2',FrameDelay.TRANSITION],
        
        ],
        [FighterState.CROUCH_UP]:[
         ['crouch-2',50],['crouch-1',FrameDelay.TRANSITION],
        
        ],
      };

      this.initialVelocity = {
        x:{
          [FighterState.WALK_FORWARD]:3 * 60,
          [FighterState.WALK_BACKWARD]:- (2*60),
          [FighterState.JUMP_FORWARD]:((48*3)+(12*2)),
          [FighterState.JUMP_BACKWARD]:-((45*4)+(15*3)),
        },
        jump: -420,
      };

      this.gravity = 1000;
    }
}

 
