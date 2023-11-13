import {Fighter} from './Fighter.js';
import {FighterState, PushBox, FrameDelay, HurtBox} from '../../constants/fighter.js'
export class Ryu extends Fighter {
  constructor(playerId){
    super('Ryu', playerId);
      this.image = document.querySelector('img[alt="ryu"]');

      this.frames = new Map([
         //idle stance
        ['idle-1',[[[75,14,60,89],[34,86]],PushBox.IDLE,HurtBox.IDLE]],
        ['idle-2',[[[7,14,59,90],[33,87]],PushBox.IDLE,HurtBox.IDLE]],
        ['idle-3',[[[277,11,58,92],[32,89]],PushBox.IDLE,HurtBox.IDLE]],
        ['idle-4',[[[211,10,55,93],[31,90]],PushBox.IDLE,HurtBox.IDLE  ]],

        ['forwards-1',[[[9,136,53,83],[27,81]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-2',[[[78,131,60,89],[35,86]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-3',[[[152,128,64,92],[35,89]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-4',[[[229,130,63,90],[29,89]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-5',[[[307,128,54,91],[25,89]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-6',[[[371,128,50,89],[25,86]],PushBox.IDLE,HurtBox.FORWARD]],

        ['backwards-1',[[[777,128,61,87],[35,85]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-2',[[[430,124,59,90],[36,87]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-3',[[[495,124,57,90],[36,88]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-4',[[[559,124,58,90],[38,89]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-5',[[[631,125,58,91],[36,88]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-6',[[[707,126,57,89],[36,87]],PushBox.IDLE,HurtBox.BACKWARD]],

        ['jump-up-1',[[[67,244,56,104],[32,107]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-2',[[[138,233,50,89],[25,103]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-3',[[[197,233,54,77],[25,103]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-4',[[[259,240,48,70],[28,101]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-5',[[[319,234,48,89],[25,106]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-6',[[[375,244,55,109],[31,113]],PushBox.JUMP,HurtBox.JUMP]],

        //jump Forwards/backwards
        ['jump-roll-1',[[[442,261,61,78],[22,90]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-2',[[[442,261,61,78],[22,90]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-3',[[[507,259,104,42],[61,76]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-4',[[[617,240,53,82],[42,111]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-5',[[[676,257,122,44],[71,81]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-6',[[[804,258,71,87],[53,98]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-7',[[[883,261,54,109],[31,113]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        ['jump-land',[[[7,268,55,85],[29,83]],PushBox.IDLE]],

          //crouch
        ['crouch-1',[[[551,21,53,83],[27,81]],PushBox.IDLE,HurtBox.IDLE]],
        ['crouch-2',[[[611,36,57,69],[25,66]],PushBox.BEND,HurtBox.BEND]],
        ['crouch-3',[[[679,44,61,61],[25,58]],PushBox.CROUCH,HurtBox.CROUCH]],

        //stand turn
        ['idle-turn-1',[[[348,8,54,95],[29,92]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-2',[[[414,6,58,67],[30,94]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-3',[[[486,10,61,54,94],[27,90]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],


        //crouch turn
        ['crouch-turn-1',[[[751,46,53,61],[26,58]],PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['crouch-turn-2',[[[816,46,52,61],[27,58]],PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['crouch-turn-3',[[[878,46,53,61],[29,58]],PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        ['light-punch-1',[[[9,365,64,91],[32,88]],PushBox.IDLE,HurtBox.IDLE]],
        ['light-punch-2',[[[98,365,92,91],[33,88]],PushBox.IDLE,HurtBox.IDLE,[11,-85,50,18]]],

        ['med-punch-1',[[[6,466,60,94],[29,92]],PushBox.IDLE,HurtBox.IDLE]],
        ['med-punch-2',[[[86,465,74,95],[29,92]],PushBox.IDLE,HurtBox.PUNCH]],
        ['med-punch-3',[[[175,465,108,94],[24,92]],PushBox.IDLE,HurtBox.PUNCH]],

        ['heavy-punch-1',[[[175,465,108,94],[24,92]],PushBox.IDLE,HurtBox.PUNCH]],


        ['light-kick-1',[[[87,923,66,92],[46,93]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['light-kick-2',[[[162,922,114,94],[68,95]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        ['med-kick-1',[[[162,922,114,94],[68,95]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        ['heavy-kick-1',[[[5,1196,61,90],[37,87]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['heavy-kick-2',[[[72,1192,94,94],[44,91]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['heavy-kick-3',[[[176,1191,120,94],[42,91]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['heavy-kick-4',[[[306,1208,101,77],[39,74]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['heavy-kick-5',[[[418,1204,64,81],[38,78]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
      
      ]);

      this.animations = {
        [FighterState.IDLE]:[
          ['idle-1',68],['idle-2',68],['idle-3',68],
          ['idle-4',68],['idle-3',68],['idle-2',68],
        ],
        [FighterState.WALK_FORWARD]: [
          ['forwards-1',65],['forwards-2',65],['forwards-3',65],
          ['forwards-4',65],['forwards-5',65],['forwards-6',65]
        ],
        [FighterState.WALK_BACKWARD]:[
          ['backwards-1',65],['backwards-2',65],['backwards-3',65],
          ['backwards-4',65],['backwards-5',65],['backwards-6',65]
        ],
        [FighterState.JUMP_START]:[
          ['jump-land',50],  ['jump-land',FrameDelay.TRANSITION]
        
        ],
        [FighterState.JUMP_UP]:[
          ['jump-up-1',180],['jump-up-2',100],['jump-up-3',100],
          ['jump-up-4',100],['jump-up-5',100],['jump-up-6',-1]

        ],
        [FighterState.JUMP_FORWARD]:[
          ['jump-roll-1',200],['jump-roll-2',50],['jump-roll-3',50],
          ['jump-roll-4',50],['jump-roll-5',50],['jump-roll-6',50]
          ,['jump-roll-7',FrameDelay.FREEZE] 
        ],
        [FighterState.JUMP_BACKWARD]:[
          ['jump-roll-7',200],['jump-roll-6',50],['jump-roll-5',50],
          ['jump-roll-4',50],['jump-roll-3',50],['jump-roll-2',50]
          ,['jump-roll-1',FrameDelay.FREEZE]
        ],
        [FighterState.JUMP_LAND]:[
          ['jump-land',33],  ['jump-land',117],['jump-land',FrameDelay.TRANSITION], 
        
        ],
        [FighterState.CROUCH]:[
          ['crouch-3',FrameDelay.FREEZE],
        
        ],
        [FighterState.CROUCH_DOWN]:[
          ['crouch-1',30],['crouch-2',30],['crouch-3',30],['crouch-3',FrameDelay.TRANSITION],
        
        ],
        [FighterState.CROUCH_UP]:[
          ['crouch-3',30],['crouch-2',30],['crouch-1',30],['crouch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.IDLE_TURN]:[
          ['idle-turn-1',33],['idle-turn-2',33],
          ['idle-turn-1',33],['idle-turn-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.CROUCH_TURN]:[
          ['crouch-turn-1',33],['crouch-turn-2',33],
          ['crouch-turn-1',33],['crouch-turn-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.LIGHT_PUNCH]:[
          ['light-punch-1',33],['light-punch-2',66],
          ['light-punch-1',66],['light-punch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.MEDIUM_PUNCH]:[
          ['med-punch-1',16],['med-punch-2',33],['med-punch-3',66],
          ['med-punch-2',50],['med-punch-1',50],
          ['med-punch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.HEAVY_PUNCH]:[
          ['med-punch-1',50],['med-punch-2',33],['heavy-punch-1',100],
          ['med-punch-2',166],['med-punch-1',199],
          ['med-punch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.LIGHT_KICK]:[
          ['med-punch-2',50],['light-kick-1',50],['light-kick-2',133],
          ['light-kick-1',66],['med-punch-1',16],
          ['light-punch-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.MEDIUM_KICK]:[
          ['med-punch-1',83],['light-kick-1',100],['med-kick-1',199],
          ['light-kick-1',116],['light-kick-1',FrameDelay.TRANSITION],
        
        ],
        [FighterState.HEAVY_KICK]:[
          ['heavy-kick-1',33],['heavy-kick-2',66],['heavy-kick-3',133],
          ['heavy-kick-4',166],['heavy-kick-5',116],
          ['heavy-kick-5',FrameDelay.TRANSITION],
        
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

 
