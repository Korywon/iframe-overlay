"use strict";

/**
 * Library JavaScript file that is used to create overlays.
 * @author Alvin Huynh
 * @version 1.0.0
 */


let overlays = {};

/**
 * Creates and initializes the overlay elements.
 * @param {String} backgroundId 
 * @param {String} iframeId 
 * @param {Function} callbackFn
 * @param {Array} callbackParams
 */
function createOverlay (name, backgroundStyles, iframeStyles, callbackFn, callbackParams) {
    if (overlays.hasOwnProperty(name)) {
        console.error(`[ ERROR ] Overlay with ${name} already exists.`);
        return false;
    }

    overlays[name] = {
        backgroundStyles: backgroundStyles,
        iframeStyles: iframeStyles,
        callbackFn: callbackFn,
        callbackParams: callbackParams,
    };

    // creates div and iframe elements
    let overlayBackgroundElement = document.createElement("div");
    let overlayIframeElement = document.createElement("iframe");

    // sets name and id attributes
    overlayBackgroundElement.setAttribute("id", name + "-bg");
    overlayBackgroundElement.setAttribute("name", name + "-bg");
    overlayIframeElement.setAttribute("id", name + "-iframe");
    overlayIframeElement.setAttribute("name", name + "-iframe");

    // adds styles to overlay background and iframe elements
    addOverlayBackgroundStyle(overlayBackgroundElement);
    addOverlayIframeStyle(overlayIframeElement);
    
    // appends iframe element to background element and appends to document body
    overlayBackgroundElement.appendChild(overlayIframeElement, backgroundStyles);
    document.body.appendChild(overlayBackgroundElement, iframeStyles);

    console.log(`[ DONE ] ${name} created and appended to root document.`);
    return true;
}

/**
 * Adds CSS style to background overlay element.
 * @param {*} overlayBackgroundElement 
 */
function addOverlayBackgroundStyle (overlayBackgroundElement, backgroundStyles) {
    overlayBackgroundElement.style.position = "fixed";
    overlayBackgroundElement.style.display = "none";
    overlayBackgroundElement.style.width = "100%";
    overlayBackgroundElement.style.height = "100%";
    overlayBackgroundElement.style.top = "0";
    overlayBackgroundElement.style.left = "0";
    overlayBackgroundElement.style.right = "0";
    overlayBackgroundElement.style.right = "0";
    overlayBackgroundElement.style.bottom = "0";
    overlayBackgroundElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlayBackgroundElement.style.zIndex = 1;

    // if object, loop through each key and set style to it
    if (typeof backgroundStyles === 'object') {
        for (let key in backgroundStyles) {
            if (backgroundStyles.hasOwnProperty(key) && typeof backgroundStyles[key] === 'string') {
                overlayBackgroundElement.style[key] = backgroundStyles[key];
            }
        }
    }
}

/**
 * Adds CSS style to iframe overlay element.
 * @param {Element} overlayIframeElement 
 */
function addOverlayIframeStyle (overlayIframeElement, iframeStyles) {
    overlayIframeElement.style.border = "1px solid black";
    overlayIframeElement.style.position = "fixed";
    overlayIframeElement.style.display = "none";
    overlayIframeElement.style.width = "50%";
    overlayIframeElement.style.height = "50%";
    overlayIframeElement.style.margin = "auto";
    overlayIframeElement.style.top = "0";
    overlayIframeElement.style.left = "0";
    overlayIframeElement.style.right = "0";
    overlayIframeElement.style.right = "0";
    overlayIframeElement.style.bottom = "0";
    overlayIframeElement.style.zIndex = "2";
    
    // if object, loop through each key and set style to it
    if (typeof iframeStyles === 'object') {
        for (let key in iframeStyles) {
            if (iframeStyles.hasOwnProperty(key) && typeof iframeStyles[key] === 'string') {
                overlayIframeElement.style[key] = iframeStyles[key];
            }
        }
    }
}

/**
 * Shows the overlay.
 */
function showOverlay (name) {
    if (checkOverlay(name) && overlays.hasOwnProperty(name)) {
        getOverlayBackground(name).style.display = "block";
        getOverlayIframe(name).style.display = "block";
        console.log(`[ DONE ] ${name} shown.`);
        return true;
    } else {
        console.error(`[ ERROR ] Unable to show ${name}.`);
        return false;
    }
}

/**
 * Hides the overlay.
 * @param {String} name
 */
function hideOverlay (name) {
    if (checkOverlay(name) && overlays.hasOwnProperty(name)) {
        getOverlayBackground(name).style.display = "none";
        getOverlayIframe(name).style.display = "none";
        console.log(`[ DONE ] ${name} hidden.`);
        return true;
    } else {
        console.error(`[ ERROR ] Unable to hide ${name}.`);
        return false;
    }
}

/**
 * Sets the iframe src.
 * @param {String} name
 * @param {String} src 
 */
function setOverlayIframeSrc (name, src) {
    let iframe = getOverlayIframe(name);
    if (iframe) {
        iframe.setAttribute("src", src);
        return true;
    } else {
        console.error(`[ ERROR ] ${name} iframe does not exist.`);
        return false;
    }
}

/**
 * Loads the src into the iframe then shows it.
 * @param {String} name
 * @param {String} src 
 * @param {*} parameters
 */
function openOverlay (name, src, parameters) {
    let iframe = getOverlayIframe(name);
    if (iframe) {
        iframe.setAttribute("src", src);
        iframe.onload = function () {
            showOverlay(name);
            iframe.onload = null;
            iframe.contentWindow.overlay = {};
            iframe.contentWindow.overlay.parameters = parameters;
            console.log(`[ DONE ] ${name} open and loaded with ${src}.`)
        }
        return true;
    } else {
        console.error(`[ ERROR ] ${name} iframe does not exist.`);
        return false;
    }
}

/**
 * Loads the src into the iframe. Does not show the iframe.
 * @param {String} name 
 * @param {String} src 
 */
function loadOverlay (name, src, parameters) {
    let iframe = getOverlayIframe(name);
    if (iframe) {
        iframe.setAttribute("src", src);
        iframe.onload = function () {
            iframe.onload = null;
            iframe.contentWindow.overlay = {};
            iframe.contentWindow.overlay.parameters = parameters;
            console.log(`[ DONE ] ${name} loaded with ${src}.`)
        }
        return true;
    } else {
        console.error(`[ ERROR ] ${name} iframe does not exist.`);
        return false;
    }
}

/**
 * Clears the overlay by setting a blank src and hiding the overlay.
 */
function closeOverlay (name) {
    let success = true;
    let iframe = getOverlayIframe(name);

    // applies parameters to the overlay's callback function
    overlays[name].callbackFn.call(this, iframe.contentWindow.overlay.returnValue);

    // sets blank src and hides overlay
    success = setOverlayIframeSrc(name, "");
    success = hideOverlay(name);
    if (success) {
        console.log(`[ DONE ] ${name} closed.`);
    } else {
        console.error(`[ ERROR ] ${name} could not be closed.`);
    }

    return success;
}

/**
 * Clears the overlay by setting a blank src.
 * @param {String} name 
 */
function clearOverlay (name) {
    let success = true;
    let iframe = getOverlayIframe(name);

    // applies return value to overlay's callback function
    overlays[name].callbackFn.call(this, iframe.contentWindow.overlay.returnValue);

    // sets blank src
    success = setOverlayIframeSrc(name, "");
    if (success) {
        console.log(`[ DONE ] ${name} cleared.`);
        return true;
    } else {
        console.error(`[ ERROR ] ${name} could not be cleared.`);
        return false;
    }
}

/**
 * Remove the overlay from the document completely.
 * TODO: Implement function.
 */
function removeOverlay (name) {
    if (overlays.hasOwnProperty(name)) {
        let overlay = getOverlayBackground(name);
        overlay.parentNode.removeChild(overlay);
        delete overlays[name];
        console.log(`[ DONE ] ${name} removed.`);
        return true;
    } else {
        console.error(`[ ERROR ] ${name} cannot be removed.`);
        return false;
    }
}

/**
 * Checks integrity of the entire overlay.
 */
function checkOverlay (name) {
    var valid = true;
    if (!getOverlayBackground(name)) {
        console.error(`[ ERROR ] ${name} background does not exist.`);
        valid = false;
    }
    if (!getOverlayIframe(name)) {
        console.error(`[ ERROR ] ${name} iframe does not exist.`);
        valid = false;
    }
    return valid;
}

/**
 * Checks integrity of the overlay background.
 */
function getOverlayBackground (name) {
    let background = document.getElementById(name + "-bg");
    return background;
}

/**
 * Checks integrity of the overlay iframe.
 */
function getOverlayIframe (name) {
    let iframe = document.getElementById(name + "-iframe");
    return iframe;
}