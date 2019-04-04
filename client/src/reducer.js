export function reducer(state = {
    groups: {
        'vitrina': {
            messages: [],
        }
    },
    user: {
        name: 'צרות בהייטק'
    },

}, action) {

    if (action.type === 'NEW_MSG') {
        const groupState = state.groups[action.groupId] ? {...state.groups[action.groupId]} : {}
        state = Object.assign({}, state, {
            groups: {
                ...action.groups,
                [action.groupId]: {
                    ...groupState,
                    messages: state.groups[action.groupId] ? [...state.groups[action.groupId].messages, action.msg] : [action.msg]
                }
            }
        });
    }

    if (action.type === 'CHOOSE_GROUP') {
        state = { ...state, chosenGroupId: action.groupId }
    }

    if (action.type === 'ENTER_NAME') {
        state = { ...state, user: { name: action.name } }
    }

    return state;
}
