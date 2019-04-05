export function reducer(state = {
    restaraunts: {
        'Pu Sushi':{
            _id: "dd330050-1db4-49f5-a5f2-fcea032004c5",
            name: "Pu Sushi",
            logo: "https://d25t2285lxl5rf.cloudfront.net/images/shops/4896.gif",
            thumbnail: "https://d25t2285lxl5rf.cloudfront.net/images/shops/4896.gif",
            address: "Yirmiyahu 32 Tel Aviv -Yafo",
            tags: [
            "Sushi, Asian, Chinese"
            ],
            rating: 8,
            location: {
            lon: 34.776814,
            lat: 32.0947049
            },
            groups: [
            {
            _id: "716991a3-04ba-4db3-a7cd-8c2bec4cb14f",
            messages: [],
            users: [
            {
            displayName: "Sahar1",
            gender: "male",
            age: 22,
            role: "Designer",
            company: "Soluto"
            }
            ],
            restaurantName: "Pu Sushi"
            },
            {
            _id: "85f23408-0ecb-42e4-8ecd-e64096f7c55b",
            members: [
            {
            name: "צרות בהייטק"
            }
            ],
            restaurantName: "d08ca7a5-3682-4db0-8756-b7c7b9dae9f3"
            }
            ],

            }
    },
    user: {
        name: 'צרות בהייטק'
    },
    // chosenGroupId: 'Pu Sushi'

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
