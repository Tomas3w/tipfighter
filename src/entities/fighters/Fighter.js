import { FIGHTER_START_DISTANCE,
        FighterDirection,
        FrameDelay, 
        FighterAttackType,
        PUSH_FRICTION,
        ShieldSize
} from '../../constants/fighter.js';
import {FighterState} from '../../constants/fighter.js'
import {ShieldState} from '../../constants/shield.js'
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from '../../constants/stage.js';
import { boxOverlap, getActualBoxDimensions, rectsOverlap } from '../../utils/collisions.js';
import * as control from '../../inputHandler.js';
import { Control } from '../../constants/control.js';
import { PushBox, HurtBox} from '../../constants/fighter.js'
export class Fighter{

    //Collision boxes
    //push box, para chocar con el otro o empujarlo
    //hit box, la zona donde puede recibir golpes
    //hurt box, puede ser el box de una espada que al tocar un hit box hace daño
    //throw box
    constructor(name, playerId){
        this.name = name; 
        this.playerId = playerId;
        this.position = {
            x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START_DISTANCE : FIGHTER_START_DISTANCE),
            y:STAGE_FLOOR};   
        this.velocity = { x:0 , y:0 };
        this.initialVelocity = {};
        this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;
        this.gravity = 0;
        this.frames = new Map();

        this.life = 100;
        this.energy = 100;
        this.hasHit = false;
        this.shieldActivated = false;
        this.requestAnimationTimerReset = true;
        this.block_controls = false;
        this.golpeado_timer = 0;

        this.shieldOriginOffset = [45, ShieldSize[1] - 10];

        this.animationFrame = 0;
        this.animationFrameShield = 0;
        this.animationTimer = 0;
        this.animations = {};
        //Pagina para ver los codigos del tecado
        //toptalcom developers keycode
        this.image = new Image();  

        this.shieldImage = new Image();
        this.shieldImage= document.querySelector('img[alt="shield"]');

        this.opponent;

        this.shieldFrame = 0;
        this.shieldLastUpdate = 0;
        
        this.boxes={
           push: {x:0 , y:0, width:0 , height:0},
           hurt: [[0,0,0,0],[0,0,0,0],[0,0,0,0]],
           hit: {x:0 , y:0, width:0 , height:0},
        };

        this.attacksDamages = {
            [FighterState.LIGHT_PUNCH]: 10,
            [FighterState.LIGHT_KICK]: 10,
            [FighterState.CROUCH_PUNCH]: 10,
            [FighterState.CROUCH_KICK]: 10,
        };
        
        //maquina de estados
        this.states = {
            [FighterState.IDLE]:{
                init: this.handleIdleInit.bind(this),
                update:this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD,
                    FighterState.CROUCH_WALK_FORWARD,FighterState.CROUCH_WALK_BACKWARD,
                    FighterState.JUMP_UP,FighterState.JUMP_FORWARD,FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_LAND, FighterState.IDLE_TURN,
                    FighterState.CROUCH_PUNCH, FighterState.CROUCH_KICK,
                    FighterState.LIGHT_PUNCH, FighterState.MEDIUM_PUNCH,FighterState.HEAVY_PUNCH,
                    FighterState.LIGHT_KICK,FighterState.MEDIUM_KICK,FighterState.HEAVY_KICK,
                ],
            },
            [FighterState.WALK_FORWARD]:{
                init: this.handleMoveInit.bind(this),
                update:this.handleWalkForwardState.bind(this),
                validFrom: [
                    FighterState.IDLE,FighterState.WALK_BACKWARD
                ],
            },
            [FighterState.WALK_BACKWARD]:{
                init: this.handleMoveInit.bind(this),
                update:this.handleWalkBackwardsState.bind(this),
                validFrom: [
                    FighterState.IDLE,FighterState.WALK_FORWARD
                ],
            },
            [FighterState.CROUCH_WALK_FORWARD]:{
                init: this.handleMoveInit.bind(this),
                update:this.handleCrouchWalkForwardState.bind(this),
                validFrom: [
                    FighterState.CROUCH,FighterState.CROUCH_TURN,FighterState.CROUCH_WALK_BACKWARD
                ],
            },
            [FighterState.CROUCH_WALK_BACKWARD]:{
                init: this.handleMoveInit.bind(this),
                update:this.handleCrouchWalkBackwardsState.bind(this),
                validFrom: [
                    FighterState.CROUCH,FighterState.CROUCH_TURN,FighterState.CROUCH_WALK_FORWARD
                ],
            },
            [FighterState.JUMP_START]:{
                init: this.handleJumpStartInit.bind(this),
                update:this.handleJumpStartState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD,
                ],
            },
            [FighterState.JUMP_UP]:{
                init: this.handleJumpInit.bind(this),
                update:this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_FORWARD]:{
                init: this.handleJumpInit.bind(this),
                update:this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_BACKWARD]:{
                init: this.handleJumpInit.bind(this),
                update:this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_LAND]:{
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validFrom: [
                    FighterState.JUMP_UP,FighterState.JUMP_FORWARD,FighterState.JUMP_BACKWARD,
                ],
            },
            [FighterState.CROUCH]:{
                init: () => {},
                update: this.handleCrouchState.bind(this),
                validFrom: [FighterState.CROUCH_DOWN,FighterState.CROUCH_TURN,FighterState.CROUCH_WALK_FORWARD,FighterState.CROUCH_WALK_BACKWARD,FighterState.CROUCH_PUNCH,FighterState.CROUCH_KICK],
            },
            [FighterState.CROUCH_DOWN]:{
                init: this.handleCrouchDownInit.bind(this),
                update: this.handleCrouchDownState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD,FighterState.CROUCH_WALK_FORWARD,FighterState.CROUCH_WALK_BACKWARD,FighterState.CROUCH_PUNCH,FighterState.CROUCH_KICK],
            },
            [FighterState.CROUCH_UP]:{
                init: () => {},
                update:this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH,FighterState.CROUCH_WALK_FORWARD,FighterState.CROUCH_WALK_BACKWARD,FighterState.CROUCH_PUNCH,FighterState.CROUCH_KICK],
            },
            [FighterState.IDLE_TURN]:{
                init: () => {},
                update:this.handleIdleTurnState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD
                ],
            },
            [FighterState.CROUCH_TURN]:{
                init: () => {},
                update:this.handleCrouchTurnState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
            [FighterState.CROUCH_PUNCH]:{
                attackType: FighterAttackType.PUNCH,
                init: this.handleStandardLightAttackInit.bind(this),
                update:this.handleCrouchPunchState.bind(this),
                validFrom: [FighterState.CROUCH,FighterState.CROUCH_DOWN,FighterState.CROUCH_WALK_FORWARD,FighterState.CROUCH_WALK_BACKWARD],
            },
            [FighterState.CROUCH_KICK]:{
                attackType: FighterAttackType.KICK,
                init: this.handleStandardLightAttackInit.bind(this),
                update:this.handleCrouchKickState.bind(this),
                validFrom: [FighterState.CROUCH,FighterState.CROUCH_DOWN,FighterState.CROUCH_WALK_FORWARD,FighterState.CROUCH_WALK_BACKWARD],
            },
            [FighterState.LIGHT_PUNCH]:{
                attackType: FighterAttackType.PUNCH,
                init: this.handleStandardLightAttackInit.bind(this),
                update:this.handleLightPunchState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD,FighterState.JUMP_UP,FighterState.JUMP_FORWARD,FighterState.JUMP_BACKWARD],
            },
            [FighterState.MEDIUM_PUNCH]:{
                attackType: FighterAttackType.PUNCH,
                init: this.handleStandardMediumAttackInit.bind(this),
                update:this.handleMediumPunchState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD],
            },
            [FighterState.HEAVY_PUNCH]:{
                attackType: FighterAttackType.PUNCH,
                init: this.handleStandardHeavyAttackInit.bind(this),
                update:this.handleHeavyPunchState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD],
            },
            [FighterState.LIGHT_KICK]:{
                attackType: FighterAttackType.KICK,
                init: this.handleStandardLightAttackInit.bind(this),
                update:this.handleLightKickState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD,FighterState.JUMP_UP,FighterState.JUMP_FORWARD,FighterState.JUMP_BACKWARD],
            },
            [FighterState.MEDIUM_KICK]:{
                attackType: FighterAttackType.KICK,
                init: this.handleStandardMediumAttackInit.bind(this),
                update:this.handleMediumKickState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD],
            },
            [FighterState.HEAVY_KICK]:{
                attackType: FighterAttackType.KICK,
                init: this.handleStandardHeavyAttackInit.bind(this),
                update:this.handleHeavyKickState.bind(this),
                validFrom: [FighterState.IDLE,FighterState.WALK_FORWARD,FighterState.WALK_BACKWARD],
            },



        }

        this.changeState(FighterState.IDLE);
    }

    isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;

    hasCollidedWithOpponent = () => rectsOverlap(
        this.position.x + this.boxes.push.x, this.position.y + this.boxes.push.y,
        this.boxes.push.width, this.boxes.push.height,
        this.opponent.position.x + this.opponent.boxes.push.x,
        this.opponent.position.y +this.opponent.boxes.push.y,
        this.opponent.boxes.push.width, this.opponent.boxes.push.height,

    );

    resetVelocities(){
        if (this.position.y >= STAGE_FLOOR)
        {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    getDirection(){
        if(this.position.x  +this.boxes.push.x +this.boxes.push.width 
            <= this.opponent.position.x + this.opponent.boxes.push.x){
            return FighterDirection.RIGHT;
        }else if(this.position.x  +this.boxes.push.x  
            >= this.opponent.position.x + this.opponent.boxes.push.x +this.opponent.boxes.push.width){
            return FighterDirection.LEFT;
        }
        return this.direction;
    }
    getBoxes(framekey){
        const [, 
            [x=0,y=0,width=0, height=0]= [],
            [head = [0,0,0,0],body = [0,0,0,0], feet = [0,0,0,0]]=[],
            [hitX=0,hitY=0,hitWidth=0, hitHeight=0]= [],
        ] = this.frames.get(framekey);

        return {
           push: {  x,y,width,height },
           hurt: [head,body,feet],
           hit: {  x:hitX,y:hitY,width:hitWidth,height:hitHeight },

        };
    }

    changeState(newState){
        if(newState === this.currentState
            || !this.states[newState].validFrom.includes(this.currentState)) return;
            
        
         this.currentState = newState;
         this.animationFrame = 0;
         this.requestAnimationTimerReset = true;

         this.states[this.currentState].init();

         this.hasHit = false;
         // if (this.playerId === 0) console.log('un volcan', this.currentState);
    }

    handleIdleInit(){
       this.resetVelocities();
    }
    

    handleMoveInit(){
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;

    }
   
    handleJumpStartInit(){
        this.resetVelocities();
    }

    handleJumpLandInit(){
        this.resetVelocities();
    }
   

    handleJumpInit(){
        this.velocity.y = this.initialVelocity.jump;
        this.handleMoveInit();
    }

    handleCrouchDownInit(){
        this.resetVelocities();
    }


    handleStandardLightAttackInit(){
        this.resetVelocities();
    }
    handleStandardMediumAttackInit(){
        this.resetVelocities();
    }
    handleStandardHeavyAttackInit(){
        this.resetVelocities();
    }
         //       update:this.handleLightPunchState.bind(this),

    handleCrouchState(){
        if(!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP);
        else if(control.isForward(this.playerId,this.direction)){
            this.changeState(FighterState.CROUCH_WALK_FORWARD);
        } else if(control.isBackward(this.playerId,this.direction)) {
            this.changeState(FighterState.CROUCH_WALK_BACKWARD);
        } else if(control.isLightPunch(this.playerId)){
            this.changeState(FighterState.CROUCH_PUNCH);
        } else if(control.isLightKick(this.playerId)){
            this.changeState(FighterState.CROUCH_KICK);
        }

        const newDirection = this.getDirection();

        if(newDirection !== this.direction){
            this.direction = newDirection;
            this.changeState(FighterState.CROUCH_TURN);
        }
    }

    handleCrouchWalkForwardState() {
        if(!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP);
        if(!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.CROUCH_DOWN);
        if(control.isLightPunch(this.playerId)) this.changeState(FighterState.CROUCH_PUNCH);

        const newDirection = this.getDirection();

        if(newDirection !== this.direction){
            this.direction = newDirection;
            // this.changeState(FighterState.CROUCH_TURN);
        }
    }

    handleCrouchWalkBackwardsState() {
        if(!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP);
        if(!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.CROUCH_DOWN);
        if(control.isLightPunch(this.playerId)) this.changeState(FighterState.CROUCH_PUNCH);

        const newDirection = this.getDirection();

        if(newDirection !== this.direction){
            this.direction = newDirection;
            // this.changeState(FighterState.CROUCH_TURN);
        }
    }

    handleCrouchDownState(){
        if(this.isAnimationCompleted()){
            this.changeState(FighterState.CROUCH);
        }
        if(!control.isDown(this.playerId)){
            this.currentState = FighterState.CROUCH_UP;
            this.animationFrame = 0;//this.animations[FighterState.CROUCH_UP][this.animationFrame].length - this.animationFrame;
        }
    }

    handleCrouchUpState(){
        if(this.isAnimationCompleted()){
            this.changeState(FighterState.IDLE);
        }
    }

    handleJumpStartState(){
        if(this.isAnimationCompleted()){
            if(control.isBackward(this.playerId,this.direction)){
                this.changeState(FighterState.JUMP_BACKWARD);
            }else if(control.isForward(this.playerId,this.direction)){
                this.changeState(FighterState.JUMP_FORWARD);
            }else{
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }

    handleIdleState(){
        if(control.isUp(this.playerId) && this.position.y >= STAGE_FLOOR){
             this.changeState(FighterState.JUMP_START)
        }
        else if(control.isDown(this.playerId)){
            this.changeState(FighterState.CROUCH_DOWN);
        }
        else if(control.isBackward(this.playerId,this.direction)) {
            this.changeState(FighterState.WALK_BACKWARD);
        }
        else if(control.isForward(this.playerId,this.direction)){
            this.changeState(FighterState.WALK_FORWARD);
        } else if(control.isLightPunch(this.playerId)){
            this.changeState(FighterState.LIGHT_PUNCH);
        }
        // else if(control.isMediumPunch(this.playerId)){
        //     this.changeState(FighterState.MEDIUM_PUNCH);
        // }else if(control.isHeavyPunch(this.playerId)){
        //     this.changeState(FighterState.HEAVY_PUNCH);
        // }
        else if(control.isLightKick(this.playerId)){
            this.changeState(FighterState.LIGHT_KICK);
        }
        // else if(control.isMediumKick(this.playerId)){
        //     this.changeState(FighterState.MEDIUM_KICK);
        // }else if(control.isHeavyKick(this.playerId)){
        //     this.changeState(FighterState.HEAVY_KICK);
        // }

        const newDirection = this.getDirection();

        if(newDirection !== this.direction && this.position.y >= STAGE_FLOOR){
            this.direction = newDirection;
            this.changeState(FighterState.IDLE_TURN);
        }
    }

    handleWalkForwardState(){
        if(!control.isForward(this.playerId,this.direction)){
            this.changeState(FighterState.IDLE);
        } 
         if(control.isUp(this.playerId)){ 
            this.changeState(FighterState.JUMP_START);
        }
         if(control.isDown(this.playerId)){
            this.changeState(FighterState.CROUCH_DOWN);
        } 

        if(control.isLightPunch(this.playerId)){
            this.changeState(FighterState.LIGHT_PUNCH);
        }
        // else if(control.isMediumPunch(this.playerId)){
        //     this.changeState(FighterState.MEDIUM_PUNCH);
        // }else if(control.isHeavyPunch(this.playerId)){
        //     this.changeState(FighterState.HEAVY_PUNCH);
        // }
        else if(control.isLightKick(this.playerId)){
            this.changeState(FighterState.LIGHT_KICK);
        }
        // else if(control.isMediumKick(this.playerId)){
        //     this.changeState(FighterState.MEDIUM_KICK);
        // }else if(control.isHeavyKick(this.playerId)){
        //     this.changeState(FighterState.HEAVY_KICK);
        // }

        this.direction = this.getDirection();
    }

    handleWalkBackwardsState(){
        if(!control.isBackward(this.playerId,this.direction)){
            this.changeState(FighterState.IDLE);
        } 
         if(control.isUp(this.playerId)){
            this.changeState(FighterState.JUMP_START);
        } 
         if(control.isDown(this.playerId)){
            this.changeState(FighterState.CROUCH_DOWN);
        } 

        if(control.isLightPunch(this.playerId)){
            this.changeState(FighterState.LIGHT_PUNCH);
        }
        // else if(control.isMediumPunch(this.playerId)){
        //     this.changeState(FighterState.MEDIUM_PUNCH);
        // }else if(control.isHeavyPunch(this.playerId)){
        //     this.changeState(FighterState.HEAVY_PUNCH);
        // }
        else if(control.isLightKick(this.playerId)){
            this.changeState(FighterState.LIGHT_KICK);
        }
        // else if(control.isMediumKick(this.playerId)){
        //     this.changeState(FighterState.MEDIUM_KICK);
        // }else if(control.isHeavyKick(this.playerId)){
        //     this.changeState(FighterState.HEAVY_KICK);
        // }

        this.direction = this.getDirection();
    }
    handleJumpState(time){
        if(control.isLightPunch(this.playerId)){
            this.changeState(FighterState.LIGHT_PUNCH);
        } else if(control.isLightKick(this.playerId)){
            this.changeState(FighterState.LIGHT_KICK);
        }

        // this.velocity.y += this.gravity * time.secondsPassed;
        // if(this.position.y > STAGE_FLOOR){
        //     this.position.y = STAGE_FLOOR;
        //     this.changeState(FighterState.JUMP_LAND);
        // }
    }

    handleJumpLandState(){
        if(this.animationFrame < 1) return;

        let newState = FighterState.IDLE;

        if(!control.isIdle(this.playerId)){
            this.direction = this.getDirection();
            this.handleIdleState();
        }else {
            const newDirection = this.getDirection();
            if(newDirection !== this.direction){
                this.direction = newDirection;
                newState = FighterState.IDLE_TURN;
            }else{
                if(!this.isAnimationCompleted()) return;             
            }
            
        }
        this.changeState(newState);
    }


    handleIdleTurnState(){
        this.handleIdleState();

        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleCrouchTurnState(){
        this.handleCrouchState();

        if( !this.isAnimationCompleted()) return;
        this.changeState(FighterState.CROUCH);
    }

    getLightPunchPreparationFrames()
    {
        return 2;
    }

    handleLightPunchState(){
        if(this.animationFrame < this.getLightPunchPreparationFrames()) return;
        if(control.isLightPunch(this.playerId)) this.animationFrame = 0;
        
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }
    getCrouchPunchPreparationFrames()
    {
        return 2;
    }
    handleCrouchPunchState() {
        if(this.animationFrame < this.getCrouchPunchPreparationFrames()) return;
        if(control.isLightPunch(this.playerId)) this.animationFrame = 0;
        
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.CROUCH);
    }
    getCrouchKickPreparationFrames()
    {
        return 2;
    }
    handleCrouchKickState() {
        if(this.animationFrame < this.getCrouchKickPreparationFrames()) return;
        if(control.isLightKick(this.playerId)) this.animationFrame = 0;
        
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.CROUCH);
    }

    handleMediumPunchState(){
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
        
    }

    handleHeavyPunchState(){
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
        
    }

    getLightKickPreparationFrames()
    {
        return 2;
    }

    handleLightKickState(){
        if(this.animationFrame < this.getLightKickPreparationFrames()) return;
        if(control.isLightKick(this.playerId)) this.animationFrame = 0;
        
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
        
    }

    handleMediumKickState(){
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
        
    }

    handleHeavyKickState(){
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
        
    }

    updateStageConstraints(time,context,camera){
      
        
        if (!this.block_controls)
        {
            if(this.position.x > camera.position.x + context.canvas.width - this.boxes.push.width ){          
               this.position.x = camera.position.x + context.canvas.width - this.boxes.push.width;
            }

            if( this.position.x < camera.position.x + this.boxes.push.width ){        
                this.position.x = camera.position.x + this.boxes.push.width;
            }
        }

        if(this.hasCollidedWithOpponent()){
            if(this.position.x <= this.opponent.position.x){
                this.position.x = Math.max(
                    (this.opponent.position.x + this.opponent.boxes.push.x) -(this.boxes.push.x + this.boxes.push.width),
                    camera.position.x + this.boxes.push.width,
                );
                if([
                    FighterState.IDLE,FighterState.CROUCH,FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ].includes(this.opponent.currentState)){
                    this.opponent.position.x += PUSH_FRICTION * time.secondsPassed;
                }
            }

           

            if(this.position.x >= this.opponent.position.x){
                this.position.x = Math.min(
                    (this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width)
                    + (this.boxes.push.width + this.boxes.push.x),
                    camera.position.x + context.canvas.width - this.boxes.push.width,
                );

                if([
                    FighterState.IDLE,FighterState.CROUCH,FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ].includes(this.opponent.currentState)){
                    this.opponent.position.x -= PUSH_FRICTION * time.secondsPassed;
                }
            }
        }
    }

    updateAnimation(time){
        if (this.requestAnimationTimerReset)
        {
            this.animationTimer = time.previous;
            this.requestAnimationTimerReset = false;
        }

        // actualiza frame del shield
        if (time.previous > this.shieldLastUpdate + 30)
        {
            if (this.shieldFrame > 20)
                this.shieldFrame = 0;
            else
                this.shieldFrame += 1;
            this.shieldLastUpdate = time.previous;
        }

        const animation = this.animations[this.currentState];
        const [,frameDelay] = animation[this.animationFrame];
        if(time.previous <= this.animationTimer + frameDelay)return;
        this.animationTimer = time.previous;

        if(frameDelay <= FrameDelay.FREEZE) return;
        this.animationFrame ++;
    
        // para que se reinicie el bucle del frame
        if(this.animationFrame >= animation.length) this.animationFrame =0;
        
        this.boxes = this.getBoxes(animation[this.animationFrame][0]);
        
    }

    updateAttackBoxCollided(time){
        if(!this.states[this.currentState].attackType) return;
        if (this.boxes.hit.width === 0) this.hasHit = false;
        if (this.hasHit) return;

        const actualHitBox = getActualBoxDimensions(this.position,this.direction,this.boxes.hit);

        for(const hurt of this.opponent.boxes.hurt){
            const [x,y,width,height] = hurt;

            const actualOpponentHurtBox = getActualBoxDimensions(
                this.opponent.position,
                this.opponent.direction,
                {x,y,width,height},
            );

            if(!boxOverlap(actualHitBox,actualOpponentHurtBox)) continue;

            const hurtIndex = this.opponent.boxes.hurt.indexOf(hurt);
            const hurtName = ['head','body','feet'];

            // console.log(`${this.name} has hit ${this.opponent.name} ${hurtName[hurtIndex]}`)
            this.hasHit = true;
            this.opponent.golpear(this.position.y < STAGE_FLOOR, this.attacksDamages[this.currentState] + Math.random() * 3);
            break; // esto garantiza que solo una parte del cuerpo se haya golpeado
        }
    }

    golpear(in_the_air, danio) {
        let multiplier = 1;
        // Este codigo permite defenderse de los ataques, excepto si vienen del aire, en cuyo caso es imposible defenderse
        if (!in_the_air && control.isBackward(this.playerId,this.direction))
        {
            multiplier = 1 / 8;
            this.golpeado_timer = 0.1;
        }
        else
            this.golpeado_timer = 1;
        // En esta parte se quita vida, la misma de multiplica por un factor que depende del if anterior
        this.life -= danio * multiplier;
        // Esto genera el knockback horizontal
        this.velocity.x -= 40;
        // Esto genera el knockback vertical
        this.velocity.y = -120;
        // Esto deja al jugador en su estado IDLE para evitar que termina de dar su golpe si fue golpeado anteriormente
        this.changeState(FighterState.IDLE);

        // Esto pasa cuando muere un personaje
        if (this.life <= 0)
            this.empujarLejosYBloquearControles();
    }

    empujarLejosYBloquearControles() {
        this.block_controls = true;
        this.velocity.x -= 800;
        this.velocity.y = -720;
    }

    //para seleccionar los frames en el gimp, poner los valores de posicion por ej 7 ,14 que es el punto de arriba a la izq y 
    //el tamaño 
    update(time,context,camera){ 

        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed; 
    
        if (!this.block_controls)
            this.states[this.currentState].update(time,context);
        this.updateAnimation(time);
        this.updateStageConstraints(time,context,camera);
        this.updateAttackBoxCollided(time);

        if (this.animationFrame == 0)
            this.hasHit = false;

        // gravedad
        if(this.position.y > STAGE_FLOOR){
            if (!this.block_controls)
            {
                this.position.y = STAGE_FLOOR;
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.changeState(FighterState.JUMP_LAND);
            }
        }
        else if (this.position.y < STAGE_FLOOR)
        {
            this.velocity.y += this.gravity * time.secondsPassed;
        }
        else
            this.velocity.x *= 0.99;
        // manejo de timer de golpe
        this.golpeado_timer -= time.secondsPassed;
    }

    drawDebugBox(context, camera, dimensions, baseColor){
        if(!Array.isArray(dimensions)) return;

        const [x= 0, y = 0, width = 0, height = 0] = dimensions;

         //push box
         context.beginPath();
         context.strokeStyle = baseColor + 'AA';
         context.fillStyle = baseColor +'44';
         context.fillRect(
             Math.floor(this.position.x + (x * this.direction)-camera.position.x) + 0.5,
             Math.floor(this.position.y + y - camera.position.y) + 0.5,
             width * this.direction,
             height,
         );
 
         context.rect(
             Math.floor(this.position.x + (x * this.direction)- camera.position.x) + 0.5,
             Math.floor(this.position.y + y -camera.position.y) + 0.5,
             width * this.direction,
             height,
         );
 
         context.stroke();
    }

    //para los puntos de origen
    drawDebug(context,camera){
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const boxes = this.getBoxes(frameKey);
        context.lineWidth = 1;

        //push box
        this.drawDebugBox(context,camera,Object.values(boxes.push),'#55FF55');


        //hurt boxes
        for(const hurtBox of boxes.hurt){
            this.drawDebugBox(context,camera,hurtBox,'#7777FF');
        }

        this.drawDebugBox(context,camera,Object.values(boxes.hit),'#FF0000');


        //hit boxes
        //origin
        context.beginPath();
        context.strokeStyle = 'white';
        context.moveTo(
            Math.floor(this.position.x - camera.position.x) - 4, 
            Math.floor(this.position.y -camera.position.y)-0.5
        );
        context.lineTo(
            Math.floor(this.position.x - camera.position.x) + 5, 
            Math.floor(this.position.y -camera.position.y)-0.5
        );

        context.moveTo(
            Math.floor(this.position.x - camera.position.x) +0.5,
            Math.floor(this.position.y -camera.position.y) - 5
        );
        context.lineTo(
            Math.floor(this.position.x - camera.position.x)  +0.5, 
            Math.floor(this.position.y -camera.position.y) + 4
        );

        context.stroke();
    }

    drawShield(context, camera) {
        const shieldX = this.shieldFrame * ShieldSize[0];
        const shieldY = 0;
        const shieldWidth = ShieldSize[0];
        const shieldHeight = ShieldSize[1];
        const shieldOriginX = this.shieldOriginOffset[0];
        const shieldOriginY = this.shieldOriginOffset[1];
    
        context.scale(this.direction, 1);
        context.drawImage(
            this.shieldImage,
            shieldX, shieldY,
            shieldWidth, shieldHeight,
            Math.floor((this.position.x - camera.position.x) * this.direction) - shieldOriginX,
            Math.floor(this.position.y - camera.position.y) - shieldOriginY,
            shieldWidth, shieldHeight
        );
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    

    draw(context, camera){
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[
         [x,y,width,height], 
         [originX,originY],
        ]]= this.frames.get(frameKey);

        // if (this.playerId === 1) console.log(this.position.x);

        context.scale(this.direction,1);
        // let angle_of_rotation = -Math.PI * (this.golpeado_timer - 1) / 10;
        // if (this.block_controls)
        //     context.rotate(angle_of_rotation);
        context.drawImage(
            this.image,
            x,y,
            width,height,
            Math.floor((this.position.x - camera.position.x) * this.direction ) -originX,
            Math.floor(this.position.y - camera.position.y) -originY,
            width,height
            );

        let newCanvasContext = getEffectsCanvas(context.canvas.width, context.canvas.height);
        newCanvasContext.scale(this.direction,1);
        newCanvasContext.globalCompositeOperation = 'source-over';
        // if (this.block_controls)
        //     newCanvasContext.rotate(angle_of_rotation);
        newCanvasContext.clearRect(0, 0, newCanvasContext.canvas.width, newCanvasContext.canvas.height);
        newCanvasContext.drawImage(
            this.image,
            x,y,
            width,height,
            Math.floor((this.position.x - camera.position.x) * this.direction ) -originX,
            Math.floor(this.position.y - camera.position.y) -originY,
            width,height
            );

        newCanvasContext.globalCompositeOperation = 'source-in';
        newCanvasContext.fillStyle = 'rgba(255, 0, 0, ' + this.golpeado_timer + ')';
        newCanvasContext.fillRect(
            Math.floor((this.position.x - camera.position.x) * this.direction ) -originX,
            Math.floor(this.position.y - camera.position.y) -originY,
            width,height
            );
        newCanvasContext.setTransform(1,0,0,1,0,0);
        
        context.setTransform(1,0,0,1,0,0);
        context.drawImage(newCanvasContext.canvas, 0, 0);

        this.drawDebug(context, camera);
        if (this.shieldActivated)
            this.drawShield(context,camera);
    }
}

var effectsCanvas = null;
var effectsCanvasContext = null;
function getEffectsCanvas(w,h){
    if (effectsCanvas === null)
    {
        effectsCanvas = document.createElement("canvas");
        effectsCanvas.width = w;
        effectsCanvas.height = h;
        effectsCanvasContext = effectsCanvas.getContext("2d");
    }
    return effectsCanvasContext;
}
