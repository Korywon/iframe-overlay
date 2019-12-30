let backgroundId = null;
let iframeId = null;

function createOverlay (backgroundId, iframeId) {
    // creates div and iframe elements
    let overlayBackgroundElement = document.createElement("div");
    let overlayIframeElement = document.createElement("iframe");

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
    overlayBackgroundElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlayBackgroundElement.style.zIndex = 1;
}

/**
 * Adds CSS style to iframe overlay element.
 * @param {*} overlayIframeElement 
 */
function addOverlayIframeStyle (overlayIframeElement) {
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
    overlayIframeElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlayIframeElement.style.zIndex = "2";
}

/**
 * Shows the overlay.
 */
function showOverlay () {
    if (backgroundId !== null && iframeId !== null) {

    }
}

/**
 * Hides the overlay.
 */
function hideOverlay () {

}

/**
 * Gets the overlay background element.
 */
function getOverlayBackgroundElement () {
    if (backgroundId !== null && iframeId !== null) {

    }

}

/**
 * Gets the iframe overlay element.
 */
function getOverlayIframeElement () {
    if (backgroundId !== null && iframeId !== null) {

    }
}