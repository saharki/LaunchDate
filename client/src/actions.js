export function newMsg(data) {
    return {
        type: 'NEW_MSG',
        msg: data
    };
}

export function enterName(name) {
    return {
        type: 'ENTER_NAME',
        name
    };
}
