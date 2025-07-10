// Function to update the UI with current stored arrays
async function updateUI() {
    const data = await chrome.storage.local.get(['findArray', 'replaceArray', 'filePath'])
    document.getElementById('findOutput').value = data.findArray || ''
    document.getElementById('replaceOutput').value = data.replaceArray || ''
    document.getElementById('fileOutput').value = data.filePath || ''
}
function cleanSelectedText(text) {
    // Remove leading line numbers and plus signs (e.g., 24\t+)
    return text.split('\n').map(line => line.replace(/^\s*\d+\s*\+?\s*/, '')).join('\n')
}
// Function to get selected text from the active tab
async function getSelectedTextFromPage() {
    // Execute a function in the content script context of the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab || !tab.id) {
        console.error("No active tab found.")
        return null
    }

    try {
        const [result] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        })

        if (result && result.result) {
            return cleanSelectedText(result.result)
        }
    } catch (error) {
        console.error("Failed to execute script or get selection:", error)
    }

    return null
}

// Event listener for "Add Selected Text to Find" button
document.getElementById('addFindBtn').addEventListener('click', async () => {
    const selectedText = await getSelectedTextFromPage()
    if (selectedText) {
        document.getElementById('findOutput').value = selectedText
        await chrome.storage.local.set({ findArray: selectedText })

    } else {
        alert('No text selected on the page.')
    }
})

// Event listener for "Add Selected Text to Replace" button
document.getElementById('addReplaceBtn').addEventListener('click', async () => {
    const selectedText = await getSelectedTextFromPage()
    if (selectedText) {
        document.getElementById('replaceOutput').value = selectedText
        await chrome.storage.local.set({ replaceArray: selectedText })


    } else {
        alert('No text selected on the page.')
    }
})

// Event listener for "Set File" button
document.getElementById('setFileBtn').addEventListener('click', async () => {
    try {
        const clipboardText = await navigator.clipboard.readText()
        if (clipboardText) {
            document.getElementById('fileOutput').value = clipboardText
            await chrome.storage.local.set({ filePath: clipboardText })
        } else {
            alert('Clipboard is empty.')
        }
    } catch (err) {
        alert('Failed to read clipboard: ' + err)
    }
})

// Event listener for "Copy Result" button
document.getElementById('copyResultBtn').addEventListener('click', () => {
    const find = document.getElementById('findOutput').value.trim()
    const replace = document.getElementById('replaceOutput').value.trim()
    const file = document.getElementById('fileOutput').value.trim()
    if (!file && !find && !replace) {
        alert('Nothing to copy!')
        return
    }
    const xml = `<file path="${file}">
    
    </file>`
    navigator.clipboard.writeText(xml).then(() => {
        alert('Result copied to clipboard!')
    }, () => {
        alert('Failed to copy to clipboard.')
    })
})

// Event listener for "Copy Operation" button
document.getElementById('copyOperationBtn').addEventListener('click', () => {
    const find = document.getElementById('findOutput').value.trim()
    const replace = document.getElementById('replaceOutput').value.trim()
    if (!find && !replace) {
        alert('Nothing to copy!')
        return
    }
    const xml = `<operation>
        <search><![CDATA[
            ${find}
         ]]></search>
        <add position="after"><![CDATA[${replace}]]></add>
    </operation>`
    navigator.clipboard.writeText(xml).then(() => {
        alert('Operation copied to clipboard!')
    }, () => {
        alert('Failed to copy to clipboard.')
    })
})

// Event listener for "Copy Replace" button
document.getElementById('copyReplaceBtn').addEventListener('click', () => {
    const find = document.getElementById('findOutput').value.trim()
    const replace = document.getElementById('replaceOutput').value.trim()
    if (!find && !replace) {
        alert('Nothing to copy!')
        return
    }
    const xml = `<operation>\n    <search><![CDATA[\n        ${find}\n     ]]></search>\n    <add position="replace"><![CDATA[${replace}]]></add>\n</operation>`
    navigator.clipboard.writeText(xml).then(() => {
        alert('Replace operation copied to clipboard!')
    }, () => {
        alert('Failed to copy to clipboard.')
    })
})

// Event listener for "Copy Before" button
document.getElementById('copyBeforeBtn').addEventListener('click', () => {
    const find = document.getElementById('findOutput').value.trim()
    const replace = document.getElementById('replaceOutput').value.trim()
    if (!find && !replace) {
        alert('Nothing to copy!')
        return
    }
    const xml = `<operation>\n    <search><![CDATA[\n        ${find}\n     ]]></search>\n    <add position="before"><![CDATA[${replace}]]></add>\n</operation>`
    navigator.clipboard.writeText(xml).then(() => {
        alert('Before operation copied to clipboard!')
    }, () => {
        alert('Failed to copy to clipboard.')
    })
})

// Event listener for "OCMOD Template" button
document.getElementById('ocmodBtn').addEventListener('click', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>\n<modification>\n\t<code></code>\n\t<name> by iextendlabs.com</name>\n\t<version></version>\n\t<author>Saqib Ashraf || support@iextendlabs.com</author>\n\t<link>https://iextendlabs.com</link>\n</modification>`
    navigator.clipboard.writeText(xml).then(() => {
        alert('OCMOD template copied to clipboard!')
    }, () => {
        alert('Failed to copy OCMOD template.')
    })
})

// Listen for messages from the background script to update UI
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.type === 'update_arrays') {
//         updateUI()
//     }
// })

// Load initial data when the popup opens
document.addEventListener('DOMContentLoaded', updateUI)
