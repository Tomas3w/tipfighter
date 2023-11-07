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
        },
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',
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
        },
        
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
        }
    }
];