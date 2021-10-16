# Chrome clipboard extension

### NOTE:
This is a work in progress. You can test the functionality of the extension in a local development environment though.

### Available Scripts

##### Running development version on a local machine
Steps:
1. Clone the repository on your local machine:
`git@github.com:samujoseph/chrome-clipboard-extension.git`
2. `cd` into `chrome-clipboard-extension` folder:
`cd ./chrome-clipboard-extension`
3. Install node libraries
`npm install`
4. Run the extension in dev environment:
`npm run dev`
Running the above command will create an `ext` folder in under the project's root folder.
Any changes in the source code will rebuild the output bundles.

##### Viewing the extension into chrome browser
Steps:
1. Go to chrome://extensions/
2. Toggle the **developer mode** button **ON**
3. Click on **load unpacked** button to open the extension folder selector dialog box
4. Select the `ext` folder. This is the development build folder.
5. Once selected and loaded, the extension will appear among the list of chrome extension cards. 
You can enable it using the toggle button on the specific extension card.


Reference: https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest

**NOTE**: Even though the build is auto-rebuilt on code change, the changes don't reflect automatically on the browser.
The hot reloading isn't implemented yet.
To view the changes, you'll have to manually click the refresh button on the extension card from the list on chrome extensions page.

##### Using Clipboard
1. Any text you copy from a page will be copied to the clipboard list.
 The last copied text will be on the top of the list.
2. To view your clipboard content, you can always click on the clipboard extension icon on the chrome toolbar.
3. To paste content from the clipboard, you can use `ctrl + shift + V` instead of `ctrl + V` *OR* click on the extension icon on the toolbar when the cursor is inside and input component.
That will open up the clipboard.
 You can either use the `arrow` keys and `Enter` keys to navigate and select the text item respectively.
4. It'll be useful to pin the extension button on the chrome toolbar for immediate access.


##### Next in pipeline
* Complete CSS styling
* Theming
* Enable/Disable option for incognito tabs
* Hot reloading

