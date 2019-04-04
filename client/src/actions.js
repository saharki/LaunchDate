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
        groupId
    };
}

export function enterName(name) {
    return {
        type: 'ENTER_NAME',
        name
    };
}
