let findText = ''
let replaceText = ''
let filePath = ''

// Load values from storage when the service worker starts
async function loadValuesFromStorage() {
    const data = await chrome.storage.local.get(['findArray', 'replaceArray', 'filePath'])
    findText = data.findArray || ''
    replaceText = data.replaceArray || ''
    filePath = data.filePath || ''
    console.log("Values loaded:", { findText, replaceText, filePath })
}

// Save values to storage
async function saveValuesToStorage() {
    await chrome.storage.local.set({ findArray: findText, replaceArray: replaceText, filePath })
    console.log("Values saved:", { findText, replaceText, filePath })
}

// Send message to popup to update its UI
function sendUpdateToPopup() {
    chrome.runtime.sendMessage({ type: 'update_arrays' }).catch(error => {
        if (error.message.includes("Receiving end does not exist")) {
            console.log("Popup not open, cannot send update.")
        } else {
            console.error("Error sending message to popup:", error)
        }
    })
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'add_to_find') {
        findText = request.text
        saveValuesToStorage()
        sendUpdateToPopup()
    } else if (request.type === 'add_to_replace') {
        replaceText = request.text
        saveValuesToStorage()
        sendUpdateToPopup()
    } else if (request.type === 'set_file_path') {
        filePath = request.text
        saveValuesToStorage()
        sendUpdateToPopup()
    }
    // No need to sendResponse for these one-time messages as popup doesn't await it
})

// Initialize values when the service worker is activated
loadValuesFromStorage()
