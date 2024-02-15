const extMsg = () => {

    const send = (msg) => {
        chrome.runtime.sendMessage(msg);
    }
    const receive = (callback) => {
        chrome.runtime.onMessage.addListener(callback);
    }
    return {
        send,
        receive,

    }
}
export default extMsg;