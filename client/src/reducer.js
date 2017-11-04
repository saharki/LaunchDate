export function reducer(state = {}, action) {

    if (action.type === 'NEW_MSG'){
        state = Object.assign({}, state, {
            messages: state.messages ? [ ...state.messages, action.msg] : [action.msg]
        });
    }

    if (action.type === 'ENTER_NAME'){
        state = Object.assign({}, state, { name: action.name });
    }

    return state;
}
