export function reducer(state = {
    restaraunts: {
        'vitrina': {
            groups: [],
        }
    },
    user: {
        name: 'צרות בהייטק'
    },

}, action) {

    if (action.type === 'NEW_MSG') {
        state = Object.assign({}, state, {
            restaraunts: {
                ...action.restaraunts,
                [action.groupId]: {
                    ...state.restaraunts[action.groupId],
                    groups: [
                        {
                            ...state.restaraunts[action.groupId].groups[0],
                            messages: state.restaraunts[action.groupId].groups[0] ? [...state.restaraunts[action.groupId].groups[0].messages, action.msg] : [action.msg]
                        }
                    ]
                    
                }
            }
        });
    }

    if (action.type === 'CHOOSE_GROUP') {
        state = { ...state, chosenGroupId: action.groupId }
    }

    if (action.type === 'SET_RESTARAUNTS') {
        const restaraunts = action.restaraunts.reduce((restaraunts, rest) => {
            restaraunts[rest.name] = {...rest, messages: []}
            return restaraunts
        }, {})
        state = { ...state, restaraunts }
    }

    if (action.type === 'ADD_USER_TO_RESTARAUNT') {
        if(!state.restaraunts[action.restarauntId]) {
            state.restaraunts[action.restarauntId] = {name: action.restarauntId, groups: []}
        }
        let group = state.restaraunts[action.restarauntId].groups[0] || {_id: '1234', users: [], messages: []}
        group = {...group, messages: [], users: [...group.users, action.user]}
        const groups = [group]
        const restaraunt = {...state.restaraunts[action.restarauntId], groups}
        state = { ...state, restaraunts: {...action.restaraunts, [restaraunt.name]: restaraunt} }
    }

    if (action.type === 'ENTER_NAME') {
        state = { ...state, user: { name: action.name } }
    }

    return state;
}
