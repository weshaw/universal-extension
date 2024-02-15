const domMsg = ({
    channel,
    source,
    destination,
}) => {
    const sendName = `${channel}-${destination}`;
    const receiveName = `${channel}-${source}`;
    const send = (message) => {
        var event = new CustomEvent(sendName, {
            detail: {
                from: source,
                to: destination,
                message
            }
        });
        document.dispatchEvent(event);
    }
    const receive = (callback) => {
        document.addEventListener(receiveName, callback);
    }
    const remove = (callback) => {
        document.removeEventListener(receiveName, callback);
    }
    return {
        send,
        receive,
        remove,
        names: {
            send: sendName,
            receive: receiveName,
        }
    }
};
export default domMsg;