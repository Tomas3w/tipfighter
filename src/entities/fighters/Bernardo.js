import {Fighter} from './Fighter.js';
import {FighterState, FrameDelay} from '../../constants/fighter.js'
export class Bernardo extends Fighter {
  constructor(playerId){
    super('Bernardo',playerId);
      this.image = document.querySelector('img[alt="bernardo"]');


      this.PushBox = {
        IDLE: [-10,-77,20,70],
        JUMP: [-16,-91,32,66],
        BEND: [-10,-57,20,50],
        CROUCH: [-50,-120,32,50],
     }
     
     this.HurtBox = {
        IDLE:[[-7,-80,14,15],[-11,-66,22,28],[-13.5,-38,27,22]],
        BACKWARD:[[-19,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        FORWARD:[[-3,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]],
        JUMP:[[-13,-106,28,18],[-16,-53,40,42],[-22,-66,38,18]],
        BEND:[[0,-60,14,15],[-11,-50,22,18],[-10,-28,20,22]],
        CROUCH:[[-7,-80,14,15],[-11,-66,22,28],[-10,-38,20,22]],
        PUNCH:[[11,-94,24,18],[-7,-77,40,43],[-7,-33,40,33]],
     };

      this.attacksDamages = {
          [FighterState.LIGHT_PUNCH]: 4,
          [FighterState.LIGHT_KICK]: 5,
          [FighterState.CROUCH_PUNCH]: 4,
          [FighterState.CROUCH_KICK]: 4,
      };

      this.frames = new Map([
      
        ['jump-up-1',[[[7,453,24,57],[22,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      
        ['jump-kick-1',[[[346,688,60,89],[34,86]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-2',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['jump-kick-3',[[[2,687,59,90],[33,87]],this.PushBox.IDLE,this.HurtBox.IDLE]],
      

        ['crouch-1',[[[0,0,105,119],[58,100]],this.PushBox.BEND,this.HurtBox.BEND]],
        ['crouch-2',[[[125,0,105,119],[58,100]],this.PushBox.BEND,this.HurtBox.BEND]],
        
        ['jump-roll-1',[[[7,453,24,57],[22,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-2',[[[7,453,24,57],[22,86]],this.PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        
        ['jump-land',[[[660,1060,55,85],[29,83]],this.PushBox.IDLE,this.HurtBox.IDLE]],
          
        //stand turn
        ['idle-turn-1',[[[420,682,54,95],[29,92]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-2',[[[488,678,58,98],[30,95]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-3',[[[560,683,54,94],[27,90]],this.PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        ['med-punch-1',[[[517,1149,60,94],[28,91]],this.PushBox.IDLE,this.HurtBox.IDLE]],
        ['med-punch-2',[[[650,1148,74,95],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
        ['med-punch-3',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],

        ['heavy-punch-1',[[[736,1148,108,94],[24,92]],this.PushBox.IDLE,this.HurtBox.PUNCH]],
       
        //light kick (los personajes solo tienen esta patada)
       
        // ['light-kick-1',[[[5,692,28,67],[22,86]],this.PushBox.IDLE,[[-33,-96,30,18],[-41,-79,42,38],[-32,-52,44,50]]]],
        // ['light-kick-2',[[[57,695,45,64],[23,86]],this.PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]],[14,-78,9,8]]],

        ['med-kick-1',[[[143,1565,114,92],[68,93]],this.PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]]]],
        
        ['heavy-kick-1',[[[683,1571,61,90],[37,87]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-2',[[[763,1567,95,94],[45,91]],this.PushBox.IDLE,[[12,-90,34,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-3',[[[870,1567,120,94],[42,91]],this.PushBox.IDLE,[[13,-91,62,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-4',[[[1005,1584,101,77],[39,74]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-5',[[[1147,1580,64,81],[38,78]],this.PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        
       
      ]);
      for (let i = 1; i <= 14; i++)
        this.frames.set('idle-' + i, [[[(i - 1) * 125,466,105,119],[44,96]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      for (let i = 1; i <= 7; i++)
        this.frames.set('forwards-' + i, [[[(i - 1) * 125,1038,105,119],[52,100]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      for (let i = 1; i <= 20; i++)
        this.frames.set('jump-' + i, [[[(i - 1) * 125,576,105,119],[50,110]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      for (let i = 1; i <= 7; i++)
        this.frames.set('crouch-forwards-' + i, [[[(i - 1) * 125,236,105,119],[58,94]],this.PushBox.BEND,this.HurtBox.BEND]);
      for (let i = 1; i <= 4; i++)
        this.frames.set('light-punch-' + i, [[[(i - 1) * 125,1150,105,119],[48,106]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      this.frames.set('light-punch-' + 5, [[[(5 - 1) * 125,1150,105,119],[48,106]],this.PushBox.IDLE,this.HurtBox.IDLE,[7,-65,22,8]]);
      this.frames.set('light-punch-' + 6, [[[(6 - 1) * 125,1150,105,119],[48,106]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      for (let i = 1; i <= 4; i++)
        this.frames.set('light-kick-' + i, [[[(i - 1) * 125,926,105,119],[55,106]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      this.frames.set('light-kick-' + 5, [[[(5 - 1) * 125,926,105,119],[55,106]],this.PushBox.IDLE,this.HurtBox.IDLE,[20,-35,28,14]]);
      for (let i = 6; i <= 10; i++)
        this.frames.set('light-kick-' + i, [[[(i - 1) * 125,926,105,119],[55,106]],this.PushBox.IDLE,this.HurtBox.IDLE]);
      for (let i = 1; i <= 4; i++)
        this.frames.set('crouch-punch-' + i, [[[(i - 1) * 125,353,105,119],[45,96]],this.PushBox.BEND,this.HurtBox.BEND]);
      this.frames.set('crouch-punch-' + 5, [[[(5 - 1) * 125,353,105,119],[45,96]],this.PushBox.BEND,this.HurtBox.BEND,[7,-53,23,8]]);
      this.frames.set('crouch-punch-' + 6, [[[(6 - 1) * 125,353,105,119],[45,96]],this.PushBox.BEND,this.HurtBox.BEND]);
      for (let i = 1; i <= 2; i++)
        this.frames.set('crouch-kick-' + i, [[[(i - 1) * 125,130,105,119],[45,96]],this.PushBox.BEND,this.HurtBox.BEND]);
      this.frames.set('crouch-kick-' + 3, [[[(3 - 1) * 125,130,105,119],[45,96]],this.PushBox.BEND,this.HurtBox.BEND,[18,-23,30,14]]);
      for (let i = 4; i <= 6; i++)
        this.frames.set('crouch-kick-' + i, [[[(i - 1) * 125,130,105,119],[45,96]],this.PushBox.BEND,this.HurtBox.BEND]);
      
      this.animations = {
        [FighterState.IDLE]:[],
        [FighterState.IDLE_TURN]:[
          ['idle-1',33],['idle-2',FrameDelay.TRANSITION],
        ],
        [FighterState.CROUCH_TURN]:[
          ['crouch-1',33],['crouch-2',33],
          ['crouch-1',33],['crouch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.WALK_FORWARD]:[],
        [FighterState.WALK_BACKWARD]:[],
        [FighterState.CROUCH_WALK_FORWARD]: [
          ['crouch-forwards-1',50],['crouch-forwards-2',50],['crouch-forwards-3',50],['crouch-forwards-4',50],['crouch-forwards-5',50],['crouch-forwards-6',50],['crouch-forwards-7',50],
        ],
        [FighterState.CROUCH_WALK_BACKWARD]:[
          ['crouch-forwards-7',50],['crouch-forwards-6',50],['crouch-forwards-5',50],['crouch-forwards-4',50],['crouch-forwards-3',50],['crouch-forwards-2',50],['crouch-forwards-1',50],
        ],
        [FighterState.CROUCH_PUNCH]:[
          ['crouch-punch-1',100],['crouch-punch-2',100],['crouch-punch-3',100],['crouch-punch-4',100],['crouch-punch-5',100],['crouch-punch-6',100],['crouch-punch-6',FrameDelay.TRANSITION]
        ],
        [FighterState.CROUCH_KICK]:[
          ['crouch-kick-1',100],['crouch-kick-2',100],['crouch-kick-3',100],['crouch-kick-4',100],['crouch-kick-5',100],['crouch-kick-6',100],['crouch-kick-1',100],['crouch-kick-1',FrameDelay.TRANSITION]
        ],
        [FighterState.JUMP_START]:[
          ['jump-1',50],  ['jump-1',FrameDelay.TRANSITION]
        ],
        [FighterState.JUMP_LAND]:[],
        // [FighterState.JUMP_LAND]:[
        //   ['jump-13',33],  ['jump-5',117],['jump-5',FrameDelay.TRANSITION], 
        // ],
        [FighterState.JUMP_UP]:[],
        // [FighterState.JUMP_UP]:[
        //   ['jump-1',10],['jump-2',200],['jump-3',200],['jump-4',200],['jump-5',FrameDelay.TRANSITION],
        // ],
        [FighterState.LIGHT_PUNCH]:[
          ['light-punch-1',60],['light-punch-2',60],['light-punch-3',60],['light-punch-4',60],['light-punch-5',60],['light-punch-6',60],['light-punch-6',FrameDelay.TRANSITION],
        ],
        [FighterState.LIGHT_KICK]:[
          ['light-kick-1',70],['light-kick-2',70],['light-kick-3',70],['light-kick-4',70],['light-kick-5',70],['light-kick-6',70],['light-kick-7',70],['light-kick-8',70],['light-kick-9',70],['light-kick-10',70],['light-kick-10',FrameDelay.TRANSITION],
        ],
        [FighterState.JUMP_FORWARD]:[
          ['jump-1',10],['jump-2',200],['jump-3',200],['jump-4',200],['jump-5',FrameDelay.TRANSITION],
        ],
        [FighterState.JUMP_BACKWARD]:[
          ['jump-1',10],['jump-2',200],['jump-3',200],['jump-4',200],['jump-5',FrameDelay.TRANSITION],
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
      };
      for (let i = 1; i <= 14; i++)
        this.animations[FighterState.IDLE].push(['idle-' + i,300]);
      for (let i = 1; i <= 7; i++)
        this.animations[FighterState.WALK_FORWARD].push(['forwards-' + i,50]);
      for (let i = 7; i > 0; i--)
        this.animations[FighterState.WALK_BACKWARD].push(['forwards-' + i,50]);
      for (let i = 1; i <= 9; i++)
        this.animations[FighterState.JUMP_UP].push(['jump-' + i,30]);
      for (let i = 9; i <= 12; i++)
        this.animations[FighterState.JUMP_UP].push(['jump-' + i,100]);
      this.animations[FighterState.JUMP_UP].push(['jump-' + 12,FrameDelay.TRANSITION]);
      for (let i = 13; i <= 20; i++)
        this.animations[FighterState.JUMP_LAND].push(['jump-' + i,100]);
      this.animations[FighterState.JUMP_LAND].push(['jump-' + 20,FrameDelay.TRANSITION]);

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

    getLightPunchPreparationFrames()
    {
        return 5;
    }

    getLightKickPreparationFrames()
    {
        return 5;
    }

    getCrouchPunchPreparationFrames()
    {
        return 5;
    }

    getCrouchKickPreparationFrames()
    {
        return 3;
    }
}

 
