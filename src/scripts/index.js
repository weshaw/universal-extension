import domMsg from "../messages/domMsg"

const scriptmsg = domMsg({
    channel: "TestData",
    source: "client",
    destination: "content",
});

scriptmsg.receive(({detail}) => {
    const { from, to, message } = detail;
    console.log("new message", {from, to, message});
    scriptmsg.send("Hello from client");
});

console.log("DOM script loaded")
