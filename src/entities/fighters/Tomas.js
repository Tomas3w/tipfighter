import {Fighter} from './Fighter.js';
import {FighterState, FrameDelay} from '../../constants/fighter.js'
import {ShieldState} from '../../constants/shield.js'
export class Tomas extends Fighter {
  constructor(playerId){
    super('Ryu',playerId);
      this.image = document.querySelector('img[alt="tomas"]');


      this.PushBox = {
        IDLE: [-22,-87,28,79],
        JUMP: [-16,-91,32,66],
        BEND: [-26,-77,32,70],
        CROUCH: [-50,-120,32,50],
     }
     
     this.HurtBox = {
        IDLE:[[-15,-86,14,16],[-22,-70,27,34],[-18,-36,20,28]],
        BACKWARD:[[-19,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        FORWARD:[[-3,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        JUMP:[[-13,-106,28,18],[-16,-53,40,42],[-22,-66,38,18]],
        BEND:[[-18,-76,14,16],[-26,-60,32,34],[-20,-30,24,22]],
        CROUCH:[[6,-61,24,18],[-16,-46,44,24],[-16,-24,44,24]],
        PUNCH:[[11,-94,24,18],[-7,-77,40,43],[-7,-33,40,33]],
     };

     this.Shield = {
        IDLE:[[-15,-86,14,16],[-22,-70,27,34],[-18,-36,20,28]],
     };

     this.shieldOriginOffset[0] = 67;

      this.frames = new Map([
         //idle stance
       
        ['idle-1',[[[0,350,28,79],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['idle-2',[[[38,349,28,80],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],

        ['forwards-1',[[[9,785,28,79],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['forwards-2',[[[65,785,32,79],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['backwards-2',[[[9,785,28,79],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['backwards-1',[[[65,785,32,79],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['jump-up-1',[[[18,447,32,69],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-up-2',[[[91,437,27,79],[22,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['jump-kick-1',[[[346,688,60,89],[34,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-2',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-3',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      

        ['crouch-1',[[[17,12,33,69],[25,76]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-2',[[[91,11,32,70],[25,77]],this.PushBox.BEND,this.HurtBox.BEND]],
      
        
        ['jump-land',[[[18,447,32,69],[22,84]],this.PushBox.IDLE,this.HurtBox.IDLE]],
          
        //stand turn
        ['idle-turn-1',[[[420,682,54,95],[29,92]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-2',[[[488,678,58,98],[30,95]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-3',[[[560,683,54,94],[27,90]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        
        ['jump-roll-1',[[[18,447,32,69],[22,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-2',[[[18,447,32,69],[22,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        //crouch turn
        ['crouch-turn-1',[[[18,447,32,69],[22,86]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['crouch-turn-2',[[[424,802,52,61],[27,58]],this.PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
      
        //light punch (los personajes solo tienen este golpe)
       
        ['light-punch-1',[[[0,873,28,78],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['light-punch-2',[[[62,873,49,38],[23,86]],this.PushBox.IDLE,this.HurtBox.IDLE,[8,-70,19,8]]],

        ['med-punch-1',[[[517,1149,60,94],[28,91]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['med-punch-2',[[[650,1148,74,95],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
        ['med-punch-3',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],

        ['heavy-punch-1',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
       
        //light kick (los personajes solo tienen esta patada)
       
        ['light-kick-1',[[[12,704,25,79],[22,86]],this.PushBox.IDLE,[[-33,-96,30,18],[-41,-79,42,38],[-32,-52,44,50]]]],
        ['light-kick-2',[[[66,704,49,79],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE,[10,-47,16,8]]],

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
        [FighterState.JUMP_START]:[
          ['jump-up-1',1],  ['jump-up-1',FrameDelay.TRANSITION]
        
        ],
        [FighterState.JUMP_LAND]:[
          ['jump-land',33],  ['jump-land',117],['jump-land',FrameDelay.TRANSITION], 
        
        ],
        [FighterState.JUMP_UP]:[
          ['jump-up-1',250],['jump-up-1',150],['jump-up-2',200],['jump-up-2',200],['jump-up-2',-1],

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
          ['jump-roll-1',100],['jump-roll-2',50],
          ['jump-roll-2',0],
        ],
        [FighterState.JUMP_BACKWARD]:[
          ['jump-roll-1',100],['jump-roll-2',50],
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
        [FighterState.IDLE_TURN]:[
          ['idle-turn-1',33],['idle-turn-2',33],
          ['idle-turn-1',33],['idle-turn-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.CROUCH_TURN]:[
          ['crouch-turn-1',33],['crouch-turn-2',33],
          ['crouch-turn-1',33],['crouch-turn-1',FrameDelay.TRANSITION],
        
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

 
