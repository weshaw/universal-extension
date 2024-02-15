import getTab from "./messages/getTab";

console.log("background Loaded", chrome.tabs);

getTab().then((tab) => {
    console.log("tab", tab);
});
