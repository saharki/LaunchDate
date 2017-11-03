export function newMsg(data) {
    console.log(data)
    return {
        type: 'NEW_MSG',
        msg: data
    };
}
