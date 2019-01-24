# SandboCSS
##### ('sandbox' hahahhahaha get it)
A CSS cheatsheet and sandbox in one app. ~~A cheatbox, if you will...wait no, sandsheet? Seatshox?~~<br/>
Most available CSS properties you can apply to an HTML element are displayed on the left panel, organized alphabetically.<br/>
CSS is a pain sometimes. Maybe by playing around with this sandbox you will get a better understanding of what certain properties do. :><br/>

### Usage
This app lives [here](https://sandbocss.herokuapp.com/).<br/>
Or clone this repo and run ```npm install && npm start``` in your Terminal.<br/>
Classic mode is the most fun to play with as of this writing.<br/>
Simply input a class name, and click the ➕ button to create a div with the given class name. A red outline indicates the div is selected. While a div is selected, creating a new div will nest the new one inside the currently selected one.<br/>
Click a CSS property and enter or select a value to apply the style to the currently selected div!

### Powered by
- [RnD](https://github.com/bokuweb/react-rnd) : interactive mode runs on this for resizing and repositioning of the divs
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) : copy the output to clipboard
- [styled-components](https://github.com/styled-components/styled-components) : the component that takes a defined style and applies it to the element
- [html-screen-capture-js](https://github.com/html-screen-capture-js/html-screen-capture-js) : for saving displayed output image; feature coming soon

### Future works
- hover over a property to display explanation or link?
- Change data format: add a key called 'unit' for each attribute, so it won't have to check for edge cases like opacity to add/remove a unit
