import ScriptManager from './classes/ScriptManager.js';
import toDOM from './utils/toDOM.js';
import domMsg from "./messages/domMsg"
import './css/content.css';

const sm = new ScriptManager();
const scriptmsg = domMsg({
    channel: "TestData",
    source: "content",
    destination: "client",
});

console.log("scriptmsg", scriptmsg.names)

const html = `
<div class="dom-tools">
Works
</div>
`
console.log("content Loaded");
const doc = toDOM(html);
document.body.append(doc);


scriptmsg.receive(({detail}) => {
    const { from, to, message } = detail;
    console.log("new message", {from, to, message});
});

sm.add('src/scripts/index.js').then(() => {
    scriptmsg.send("Hello from content");
});
