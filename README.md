# OCMOD Generator Chrome Extension

OCMOD Generator is a Chrome extension that helps OpenCart developers quickly build OCMOD XML files directly from GitHub commit or pull request pages. With a simple popup interface, you can select file paths, code to find, replacement code, and generate OCMOD XML snippets or boilerplate templates with a single click.

## Features

- **Select Text from GitHub:**
  - Highlight code or file paths on GitHub and add them to your OCMOD template using the popup buttons.
- **Find & Replace:**
  - Add selected text to the "Find" and "Replace" fields for OCMOD operations.
- **File Path Selection:**
  - Copy the file path from GitHub and set it in the extension using the clipboard.
- **One-Click XML Generation:**
  - Generate OCMOD `<operation>` XML blocks for `after`, `replace`, or `before` positions.
  - Generate a `<file>` block with your selected values.
- **OCMOD Boilerplate:**
  - Copy a ready-to-use OCMOD XML template with a single click.
- **Clipboard Integration:**
  - All generated XML snippets are automatically copied to your clipboard for easy use.

## How to Use

1. **Install the Extension:**
   - Load the extension in Chrome via `chrome://extensions` (enable Developer Mode and "Load unpacked").
2. **Navigate to a GitHub Commit or PR:**
   - Go to the file or code you want to modify.
3. **Select Text:**
   - Highlight the code you want to use for "Find" or "Replace" and click the corresponding button in the extension popup.
4. **Set File Path:**
   - Copy the file path from GitHub, then click "Set File" in the popup to paste it from your clipboard.
5. **Generate XML:**
   - Use the "Operation After", "Operation Replace", or "Operation Before" buttons to generate the corresponding OCMOD XML operation.
   - Use "File xml" to generate a `<file>` block with your selected values.
   - Use "OCMOD Template" to copy a boilerplate OCMOD XML template.
6. **Paste and Use:**
   - Paste the generated XML into your OCMOD modification file for OpenCart.

## Example Output

**OCMOD Operation Example:**
```xml
<operation>
    <search><![CDATA[
        // your find code here
     ]]></search>
    <add position="after"><![CDATA[
        // your replace code here
    ]]></add>
</operation>
```

**OCMOD Boilerplate Example:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<modification>
    <code></code>
    <name> by iextendlabs.com</name>
    <version></version>
    <author>Saqib Ashraf || support@iextendlabs.com</author>
    <link>https://iextendlabs.com</link>
</modification>
```

## Development

- Built with vanilla JavaScript, HTML, and CSS.
- Uses the Chrome Extensions API for clipboard and storage access.

## Credits

Developed by Saqib Ashraf  
[iextendlabs.com](https://iextendlabs.com)
