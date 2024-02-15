const getTab = async (query = {}) => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({
        ...queryOptions,
        ...query
    });
    return tab;
}
export default getTab;