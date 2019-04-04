export function reducer(state = {
    messages: [],
    user: null,
}, action) {

    if (action.type === 'NEW_MSG') {
        state = Object.assign({}, state, {
            messages: state.messages ? [...state.messages, action.msg] : [action.msg]
        });
    }

    if (action.type === 'ENTER_NAME') {
        state = { ...state, user: { name: action.name } }
    }

    return state;
}
