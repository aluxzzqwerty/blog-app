const INITIAL_VALUE = {
    isSignedIn: null,
    userId: null,
    username: ''
};

export default (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSignedIn: true, userId: action.payload.userId, username: action.payload.username };
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null, username:'' };
        default:
            return state;
    }
};