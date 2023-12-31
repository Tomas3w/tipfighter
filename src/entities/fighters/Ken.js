import {Fighter} from './Fighter.js';
import {FighterState, PushBox, FrameDelay, HurtBox} from '../../constants/fighter.js'
export class Ken extends Fighter {
    constructor(playerId){
      super('Ken',playerId);
      this.image = document.querySelector('img[alt="ken"]');

      this.frames = new Map([

        //idle stance
                                                          //cabeza, cuerpo, piernas
        ['idle-1',[[[346,688,60,89],[34,86]],PushBox.IDLE,HurtBox.IDLE]],
        ['idle-2',[[[2,687,59,90],[33,87]],PushBox.IDLE,HurtBox.IDLE]],
        ['idle-3',[[[72,685,58,92],[32,89]],PushBox.IDLE,HurtBox.IDLE]],
        ['idle-4',[[[142,684,55,93],[31,90]],PushBox.IDLE,HurtBox.IDLE]],


        ['forwards-1',[[[8,872,53,83],[27,81]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-2',[[[70,867,60,88],[35,86]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-3',[[[140,866,64,90],[35,87]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-4',[[[215,865,63,89],[29,88]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-5',[[[288,866,54,89],[25,87]],PushBox.IDLE,HurtBox.FORWARD]],
        ['forwards-6',[[[357,867,58,89],[25,86]],PushBox.IDLE,HurtBox.FORWARD]],

        ['backwards-1',[[[417,868,61,87],[35,85]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-2',[[[487,866,59,90],[36,87]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-3',[[[558,865,57,90],[36,88]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-4',[[[629,864,58,90],[38,89]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-5',[[[702,865,58,91],[36,88]],PushBox.IDLE,HurtBox.BACKWARD]],
        ['backwards-6',[[[773,866,57,89],[36,87]],PushBox.IDLE,HurtBox.BACKWARD]],

        ['jump-up-1',[[[724,1036,56,104],[32,107]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-2',[[[792,995,50,89],[25,103]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-3',[[[853,967,54,77],[25,103]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-4',[[[911,966,48,70],[28,101]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-5',[[[975,977,48,86],[25,103]],PushBox.JUMP,HurtBox.JUMP]],
        ['jump-up-6',[[[1031,1008,55,103],[32,107]],PushBox.JUMP,HurtBox.JUMP]],

        //jump Forwards/backwards
        ['jump-roll-1',[[[1237,1037,55,103],[25,106]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,-0,0,0]]]],
        ['jump-roll-2',[[[1301,998,61,78],[22,90]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-3',[[[1363,994,104,42],[61,76]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-4',[[[1468,957,53,82],[42,111]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-5',[[[1541,988,122,44],[71,81]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-6',[[[1664,976,71,87],[53,98]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['jump-roll-7',[[[1748,977,55,103],[32,107]],PushBox.JUMP,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        ['jump-land',[[[660,1060,55,85],[29,83]],PushBox.IDLE,HurtBox.IDLE]],
        //crouch
        ['crouch-1',[[[8,779,53,83],[27,81]],PushBox.IDLE,HurtBox.IDLE]],
        ['crouch-2',[[[79,794,57,69],[25,66]],PushBox.BEND,HurtBox.BEND]],
        ['crouch-3',[[[148,802,61,61],[25,58]],PushBox.CROUCH,HurtBox.CROUCH]],

        //stand turn
        ['idle-turn-1',[[[420,682,54,95],[29,92]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-2',[[[488,678,58,98],[30,95]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['idle-turn-3',[[[560,683,54,94],[27,90]],PushBox.IDLE,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],


        //crouch turn
        ['crouch-turn-1',[[[356,802,53,61],[26,58]],PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['crouch-turn-2',[[[424,802,52,61],[27,58]],PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],
        ['crouch-turn-3',[[[486,802,53,61],[29,58]],PushBox.CROUCH,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],

        //light punch
       
        ['light-punch-1',[[[3,1152,64,91],[32,88]],PushBox.IDLE,HurtBox.IDLE]],
        ['light-punch-2',[[[72,1152,92,91],[33,88]],PushBox.IDLE,HurtBox.IDLE,[11,-85,50,18]]],

        ['med-punch-1',[[[517,1149,60,94],[28,91]],PushBox.IDLE,HurtBox.IDLE]],
        ['med-punch-2',[[[650,1148,74,95],[24,92]],PushBox.IDLE,HurtBox.PUNCH]],
        ['med-punch-3',[[[736,1148,108,94],[24,92]],PushBox.IDLE,HurtBox.PUNCH]],

        ['heavy-punch-1',[[[736,1148,108,94],[24,92]],PushBox.IDLE,HurtBox.PUNCH]],

        ['light-kick-1',[[[62,1565,66,92],[46,93]],PushBox.IDLE,[[-33,-96,30,18],[-41,-79,42,38],[-32,-52,44,50]]]],
        ['light-kick-2',[[[143,1565,114,94],[68,93]],PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]]]],

        ['med-kick-1',[[[143,1565,114,92],[68,93]],PushBox.IDLE,[[-65,-96,30,18],[-57,-79,42,38],[-32,-52,44,50]]]],
        
        ['heavy-kick-1',[[[683,1571,61,90],[37,87]],PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-2',[[[763,1567,95,94],[45,91]],PushBox.IDLE,[[12,-90,34,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-3',[[[870,1567,120,94],[42,91]],PushBox.IDLE,[[13,-91,62,34],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-4',[[[1005,1584,101,77],[39,74]],PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        ['heavy-kick-5',[[[1147,1580,64,81],[38,78]],PushBox.IDLE,[[-41,-78,20,20],[-25,-78,42,42],[-11,50,42,50]]]],
        
      


      ]);

      //le ponemos valores de delay para mejorar las transiciones entre animaciones
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

 


