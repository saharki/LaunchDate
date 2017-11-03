export function reducer(state = {}, action) {

    if (action.type === 'NEW_MSG'){
        state = Object.assign({}, state, {
            messages: state.messages ? [ ...state.messages, action.msg] : [action.msg]
        });
    }
    return state;
}
