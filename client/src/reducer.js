export function reducer(state = {}, action) {

    if (action.type === 'NEW_MSG'){
        console.log(action.msg)
        state = Object.assign({}, state, {
            messages: state.messages ? [ ...state.messages, action.msg] : [action.msg]
        });
    }
    console.log(state)
    return state;
}
