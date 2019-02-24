import MessageSender = chrome.runtime.MessageSender;

// Listen to messages sent from other parts of the extension.
// content_script

chrome.runtime.onMessage.addListener((message, sender: MessageSender, sendResponse: Function) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (message.popupMounted) {
        console.debug("eventPage notified that Popup.tsx has mounted.");
    }

    if (message.optionsMounted) {
        console.debug("eventPage notified that Options.tsx has mounted.");
    }

    console.debug("Sender:", sender);
    console.debug("sendResponse function:", sendResponse);

    return isResponseAsync;
});
