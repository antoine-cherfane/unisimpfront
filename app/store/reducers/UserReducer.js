import * as ACTION_TYPES from '../actions/action_types';

const initialUserState = {
    token: '',
    obj: {}
};

const UserReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case ACTION_TYPES.SAVE_USER_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case ACTION_TYPES.SAVE_USER_OBJ:
            return {
                ...state,
                obj: action.payload
            };
        case ACTION_TYPES.SAVE_USER_ALL:
            return action.payload;
        case ACTION_TYPES.CLEAR_USER:
            return initialUserState;
        default:
            return state
    }
};

export default UserReducer;
