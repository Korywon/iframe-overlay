# iframe-overlay

This is a demonstration of the use of iframes for an overlay. This utilizes CSS to "dim" the background of the iframe and then uses JavaScript for action listeners and UI functionality. This is intended to be used as a reference for replacing the (now obsolete) function called `openModalDialog`.

The solution is to have the iframe open directly on the parent window and interact with one another directly without having to mess with `postMessage` or `.onmessage` listeners, which was my original solution. This also reduces the complexity of having to filter out messages for security reasons and have the iframe window directly interact with the parent page.

![iframe overlay demo](/iframe-overlay.gif)
