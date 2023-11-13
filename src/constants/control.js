export const GamepadThumbstick = {
    DEAD_ZONE: 'deadZone',
    HORIZAL_AXE_ID : 'horizontalAxeId',
    VERTICAL_AXE_ID : 'verticalAxeId',
};


export const Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_KICK: 'lightKick',
    MEDIUM_KICK: 'mediumKick',
    HEAVY_KICK: 'heavyKick',
};
//para probar controles de gamepad, usar gamepad-tester.com
export const controls = [
    {
        gamePad:{
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 2,
            [Control.MEDIUM_PUNCH]: 3,
            [Control.HEAVY_PUNCH]: 5,
            [Control.LIGHT_PUNCH]: 0,
            [Control.MEDIUM_PUNCH]: 1,
            [Control.HEAVY_PUNCH]: 4,
        },
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',
            [Control.LIGHT_PUNCH]: 'KeyR',
            [Control.MEDIUM_PUNCH]: 'KeyT',
            [Control.HEAVY_PUNCH]: 'KeyY',
            [Control.LIGHT_KICK]: 'KeyF',
            [Control.MEDIUM_KICK]: 'KeyG',
            [Control.HEAVY_KICK]: 'KeyH',
        }
        
    },
    {
        gamePad:{
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 2,
            [Control.MEDIUM_PUNCH]: 3,
            [Control.HEAVY_PUNCH]: 5,
            [Control.LIGHT_PUNCH]: 0,
            [Control.MEDIUM_PUNCH]: 1,
            [Control.HEAVY_PUNCH]: 4,
        },
        
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'KeyU',
            [Control.MEDIUM_PUNCH]: 'KeyI',
            [Control.HEAVY_PUNCH]: 'KeyO',
            [Control.LIGHT_KICK]: 'KeyJ',
            [Control.MEDIUM_KICK]: 'KeyK',
            [Control.HEAVY_KICK]: 'KeyL',
            
        }
    }
];