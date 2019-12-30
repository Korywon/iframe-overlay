/**
 * Library JavaScript file that is used to create overlays.
 * @author Alvin Huynh
 * 
 * TODO: Add return values using async and promises.
 * TODO: Add method to customize CSS of overlay.
 */

let overlayBackgroundElementId = null;
let overlayIframeElementId = null;

/**
 * Creates and initializes the overlay elements.
 * @param {String} backgroundId 
 * @param {String} iframeId 
 */
function createOverlay (backgroundId, iframeId) {
    // creates div and iframe elements
    let overlayBackgroundElement = document.createElement("div");
    let overlayIframeElement = document.createElement("iframe");

    // sets background and iframe element id variables
    overlayBackgroundElementId = backgroundId;
    overlayIframeElementId = iframeId;

    // sets name and id attributes
    overlayBackgroundElement.setAttribute("id", backgroundId);
    overlayBackgroundElement.setAttribute("name", backgroundId);
    overlayIframeElement.setAttribute("id", iframeId);
    overlayIframeElement.setAttribute("name", iframeId);

    // adds styles to overlay background and iframe elements
    addOverlayBackgroundStyle(overlayBackgroundElement);
    addOverlayIframeStyle(overlayIframeElement);
    
    // appends iframe element to background element and appends to document body
    overlayBackgroundElement.appendChild(overlayIframeElement);
    document.body.appendChild(overlayBackgroundElement);

    console.log("[ DONE ] Overlay elements created and appended to root document.");
}

/**
 * Adds CSS style to background overlay element.
 * @param {*} overlayBackgroundElement 
 */
function addOverlayBackgroundStyle (overlayBackgroundElement) {
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
}

/**
 * Adds CSS style to iframe overlay element.
 * @param {*} overlayIframeElement 
 */
function addOverlayIframeStyle (overlayIframeElement) {
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
}

/**
 * Shows the overlay.
 */
function showOverlay () {
    if (checkOverlay()) {
        document.getElementById(overlayBackgroundElementId).style.display = "block";
        document.getElementById(overlayIframeElementId).style.display = "block";
        console.log("[ DONE ] Overlay shown.");
        return true;
    } else {
        console.error("[ ERROR ] Unable to show overlay.");
        return false;
    }
}

/**
 * Hides the overlay.
 */
function hideOverlay () {
    if (checkOverlay()) {
        document.getElementById(overlayBackgroundElementId).style.display = "none";
        document.getElementById(overlayIframeElementId).style.display = "none";
        console.log("[ DONE ] Overlay hidden.");
        return true;
    } else {
        console.error("[ ERROR ] Unable to hide overlay.");
        return false;
    }
}

/**
 * Sets the iframe src.
 * @param {String} src 
 */
function setOverlayIframeSrc (src) {
    let iframe = getOverlayIframe();
    if (iframe) {
        iframe.setAttribute("src", src);
    } else {
        console.error("[ ERROR ] Overlay iframe does not exist.");
    }
}

/**
 * Loads the src into the iframe.
 * @param {String} src 
 */
function loadOverlay (src) {
    let iframe = getOverlayIframe();
    if (iframe) {
        iframe.setAttribute("src", src);
        iframe.onload = function () {
            showOverlay();
            iframe.onload = null;
        }
    } else {
        console.error("[ ERROR ] Overlay iframe does not exist.");
    }
}

/**
 * Clears the overlay by setting a blank src and hiding the overlay.
 */
function clearOverlay () {
    setOverlayIframeSrc("");
    hideOverlay();
}

/**
 * Checks integrity of the entire overlay.
 */
function checkOverlay () {
    var valid = true;
    if (!getOverlayBackground()) {
        console.error("[ ERROR ] Overlay background does not exist.");
        valid = false;
    }
    if (!getOverlayIframe()) {
        console.error("[ ERROR ] Overlay iframe does not exist.");
        valid = false;
    }
    return valid;
}

/**
 * Checks integrity of the overlay background.
 */
function getOverlayBackground () {
    let background = document.getElementById(overlayBackgroundElementId);
    return background;
}

/**
 * Checks integrity of the overlay iframe.
 */
function getOverlayIframe () {
    let iframe = document.getElementById(overlayIframeElementId);
    return iframe;
}