import * as ACTION_TYPES from './action_types';

export const SAVE_USER = (type = 'ALL', object) => {
    switch(type)
    {
        case 'TOKEN':
            return {
                type: ACTION_TYPES.SAVE_USER_TOKEN,
                payload: object
            };
        case 'OBJ':
            return {
                type: ACTION_TYPES.SAVE_USER_OBJ,
                payload: object
            };
        case 'ALL':
            return {
                type: ACTION_TYPES.SAVE_USER_ALL,
                payload: object
            };
        case 'CLEAR':
            return {
                type: ACTION_TYPES.CLEAR_USER
            };
        default:
            return;
    }
};
