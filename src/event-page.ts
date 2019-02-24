// Listen to messages sent from other parts of the extension.
import MessageSender = chrome.runtime.MessageSender;

chrome.runtime.onMessage.addListener((request, sender: MessageSender, sendResponse: Function) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        console.debug("eventPage notified that Popup.tsx has mounted.");
    }

    console.debug("Sender:", sender);
    console.debug("sendResponse function:", sendResponse);

    return isResponseAsync;
});
