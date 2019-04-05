import axios from  'axios'

export function newMsg(data) {
    return {
        type: 'NEW_MSG',
        msg: data.message,
        groupId: data.groupId,
    };
}

export function chooseGroup(groupId) {
    return {
        type: 'CHOOSE_GROUP',
        groupId,
    };
}

export function setRestaraunts(restaraunts) {
    return {
        type: 'SET_RESTARAUNTS',
        restaraunts
    };
}

export function createGroup(restarauntId, user) {
    return axios.post(`https://f2fd39cd.ngrok.io/restaurants/${restarauntId}/groups`, [user])
}

export function addUserToGroup(restarauntId, groupId, user) {
    return axios.post(`https://f2fd39cd.ngrok.io/restaurants/${restarauntId}/groups/${groupId}/user`, user)
    // return {
    //     type: 'ADD_USER_TO_RESTARAUNT',
    //     restarauntId,
    //     user,
    // };
}

export function enterName(name) {
    return {
        type: 'ENTER_NAME',
        name
    };
}
