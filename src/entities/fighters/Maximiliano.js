import {Fighter} from './Fighter.js';
import {FighterState, FrameDelay} from '../../constants/fighter.js'
import {ShieldState} from '../../constants/shield.js'
export class Maximiliano extends Fighter {
  constructor(playerId){
    super('Tomas',playerId);
      this.image = document.querySelector('img[alt="maximiliano"]');


      this.PushBox = {

        IDLE: [-14,-87,28,79],
        JUMP: [-16,-91,32,66],
        BEND: [-16,-77,32,70],
        CROUCH: [-16,-120,32,50],
        CROUCHKICK: [-16,-47,32,40],
     }
     
     this.HurtBox = {
        IDLE:[[-5,-86,14,16],[-12,-70,27,34],[-8,-36,20,28]],
        BACKWARD:[[-19,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        FORWARD:[[-3,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        JUMP:[[-13,-106,28,18],[-16,-53,40,42],[-22,-66,38,18]],
        BEND:[[-8,-76,14,16],[-16,-60,32,34],[-10,-30,24,22]],
        CROUCH:[[6,-61,24,18],[-16,-46,44,24],[-16,-24,44,24]],
        PUNCH:[[11,-94,24,18],[-7,-77,40,43],[-7,-33,40,33]],
        CROUCHKICK:[[-8,-46,14,16],[-16,-40,32,14],[-10,-30,24,22]],
     };

     this.Shield = {
        IDLE:[[-15,-86,14,16],[-22,-70,27,34],[-18,-36,20,28]],
     };

     this.shieldOriginOffset[0] = 67;

      this.frames = new Map([
         //idle stance

        ['idle-1',[[[0,365,34,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['idle-2',[[[45,364,34,82],[12,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],

        ['forwards-1',[[[8,820,36,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['forwards-2',[[[61,820,34,81],[12,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['backwards-2',[[[8,820,36,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-1',[[[61,820,34,81],[12,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],

      
        ['jump-up-1',[[[9,478,43,65],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-up-2',[[[70,459,49,80],[12,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['jump-kick-1',[[[346,688,60,89],[34,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-2',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-3',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      

        ['crouch-1',[[[11,11,41,77],[11,82]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-2',[[[76,10,41,78],[11,83]],this.PushBox.BEND,this.HurtBox.BEND]],

        ['crouch-punch-1',[[[11,284,50,77],[11,82]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-punch-2',[[[94,284,62,77],[11,82]],this.PushBox.BEND,this.HurtBox.BEND,[29,-61,22,8]]],
        ['crouch-punch-3',[[[177,284,53,77],[11,82]],this.PushBox.BEND,this.HurtBox.BEND]],

        ['crouch-kick-1',[[[2,99,41,80],[11,82]],this.PushBox.CROUCHKICK,this.HurtBox.CROUCHKICK]],
        ['crouch-kick-2',[[[65,99,51,80],[11,82]],this.PushBox.CROUCHKICK,this.HurtBox.CROUCHKICK,[14,-20,26,8]]],
        ['crouch-kick-3',[[[130,99,43,80],[11,82]],this.PushBox.CROUCHKICK,this.HurtBox.CROUCHKICK]],
              
        ['jump-land',[[[70,459,49,80],[12,84]],this.PushBox.IDLE,this.HurtBox.IDLE]],
          
        //stand turn
        ['idle-turn-1',[[[420,682,54,95],[29,92]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-2',[[[488,678,58,98],[30,95]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-3',[[[560,683,54,94],[27,90]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        
        ['jump-roll-1',[[[18,447,32,69],[12,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-2',[[[18,447,32,69],[12,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        //crouch turn
        ['crouch-turn-1',[[[18,447,32,69],[12,86]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['crouch-turn-2',[[[424,802,52,61],[27,58]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        //crouch walk
        ['crouch-forwards-1',[[[11,193,41,77],[11,82]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-forwards-2',[[[73,193,44,77],[11,83]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-backwards-1',[[[11,193,41,77],[11,82]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-backwards-2',[[[73,193,44,77],[11,83]],this.PushBox.BEND,this.HurtBox.BEND]],
      
        //light punch (los personajes solo tienen este golpe)
       
        ['light-punch-1',[[[5,911,39,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],    
        ['light-punch-2',[[[71,911,61,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE,[26,-70,23,8]]],
        ['light-punch-3',[[[142,911,44,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],


        ['med-punch-1',[[[517,1149,60,94],[28,91]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['med-punch-2',[[[650,1148,74,95],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
        ['med-punch-3',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],

        ['heavy-punch-1',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
       
        //light kick (los personajes solo tienen esta patada)
       
        ['light-kick-1',[[[9,738,34,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['light-kick-2',[[[66,738,50,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE,[14,-19,24,8]]],
        ['light-kick-3',[[[132,738,41,81],[12,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],

        ['med-kick-1',[[[143,1565,114,92],[68,93]],this.PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]]]],
        //coso
        ['heavy-kick-1',[[[683,1571,61,90],[37,87]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-2',[[[763,1567,95,94],[45,91]],this.PushBox.IDLE,[[12,-90,34,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-3',[[[870,1567,120,94],[42,91]],this.PushBox.IDLE,[[13,-91,62,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-4',[[[1005,1584,101,77],[39,74]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-5',[[[1147,1580,64,81],[38,78]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        
        
        
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
        [FighterState.CROUCH_WALK_FORWARD]: [
          ['crouch-forwards-1',350],['crouch-forwards-2',350],
        ],
        [FighterState.CROUCH_WALK_BACKWARD]:[
          ['crouch-backwards-1',350],['crouch-backwards-2',350],
        ],
        [FighterState.CROUCH_PUNCH]:[
          ['crouch-punch-1',250],['crouch-punch-2',100],['crouch-punch-3',33],['crouch-punch-3',FrameDelay.TRANSITION]
        ],
        [FighterState.CROUCH_KICK]:[
          ['crouch-kick-1',350],['crouch-kick-2',100],['crouch-kick-3',33],['crouch-kick-3',FrameDelay.TRANSITION]
        ],
        [FighterState.JUMP_START]:[
          ['jump-up-1',1],  ['jump-up-1',FrameDelay.TRANSITION]
        
        ],
        [FighterState.JUMP_LAND]:[
          ['jump-land',13],  ['jump-land',13],['jump-land',FrameDelay.TRANSITION], 
        
        ],
        [FighterState.JUMP_UP]:[
          ['jump-up-1',250],['jump-up-1',150],['jump-up-2',200],['jump-up-2',200],['jump-up-2',FrameDelay.TRANSITION],

        ],
        [FighterState.LIGHT_PUNCH]:[
          ['light-punch-1',250],['light-punch-2',100],
          ['light-punch-3',33],['light-punch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.LIGHT_KICK]:[
          ['light-kick-1',250],['light-kick-2',100],
          ['light-kick-3',66],['light-kick-3',FrameDelay.TRANSITION],
        
        ],
        [FighterState.JUMP_FORWARD]:[
          ['jump-up-1',250],['jump-up-1',150],['jump-up-2',200],['jump-up-2',200],['jump-up-2',FrameDelay.TRANSITION],
        ],
        [FighterState.JUMP_BACKWARD]:[
          ['jump-up-1',250],['jump-up-1',150],['jump-up-2',200],['jump-up-2',200],['jump-up-2',FrameDelay.TRANSITION],
        ],
        [FighterState.CROUCH]:[
          ['crouch-1',300],['crouch-2',300],
        ],
        [FighterState.CROUCH_DOWN]:[
          ['crouch-1',50],['crouch-2',FrameDelay.TRANSITION],
        ],
        [FighterState.CROUCH_UP]:[
          ['crouch-2',50],['crouch-1',FrameDelay.TRANSITION],
        ],
        [FighterState.IDLE_TURN]:[
          ['idle-1',33],['idle-1',FrameDelay.TRANSITION],
        ],
        [FighterState.CROUCH_TURN]:[
          ['crouch-1',33],['crouch-2',FrameDelay.TRANSITION],
        ],
       
      };

      this.initialVelocity = {
        x:{
          [FighterState.WALK_FORWARD]:3 * 60,
          [FighterState.WALK_BACKWARD]:- (2*60),
          [FighterState.CROUCH_WALK_FORWARD]:3 * 60,
          [FighterState.CROUCH_WALK_BACKWARD]:- (2*60),
          [FighterState.JUMP_FORWARD]:((48*3)+(12*2)),
          [FighterState.JUMP_BACKWARD]:-((45*4)+(15*3)),
        },
        jump: -420,
      };

      this.gravity = 1000;
    }
}

 
