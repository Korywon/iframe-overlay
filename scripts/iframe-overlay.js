/**
 * Library JavaScript file that is used to create overlays.
 * @author Alvin Huynh
 * 
 * TODO: Add return values using async and promises.
 * TODO: Add method to customize CSS of overlay.
 */


let overlays = [];

/**
 * Creates and initializes the overlay elements.
 * @param {String} backgroundId 
 * @param {String} iframeId 
 */
function createOverlay (name) {
    if (overlays.indexOf(name) !== -1) {
        console.error(`[ ERROR ] Overlay with ${name} already exists.`);
        return;
    }

    overlays.push(name);

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
 * @param {Element} overlayIframeElement 
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
function showOverlay (name) {
    if (checkOverlay(name) && overlays.indexOf(name) !== -1) {
        getOverlayBackground(name).style.display = "block";
        getOverlayIframe(name).style.display = "block";
        console.log("[ DONE ] Overlay shown.");
        return true;
    } else {
        console.error("[ ERROR ] Unable to show overlay.");
        return false;
    }
}

/**
 * Hides the overlay.
 * @param {String} name
 */
function hideOverlay (name) {
    if (checkOverlay(name) && overlays.indexOf(name) !== -1) {
        getOverlayBackground(name).style.display = "none";
        getOverlayIframe(name).style.display = "none";
        console.log("[ DONE ] Overlay hidden.");
        return true;
    } else {
        console.error("[ ERROR ] Unable to hide overlay.");
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
    } else {
        console.error("[ ERROR ] Overlay iframe does not exist.");
    }
}

/**
 * Loads the src into the iframe then shows it.
 * @param {String} name
 * @param {String} src 
 */
function openOverlay (name, src) {
    let iframe = getOverlayIframe(name);
    if (iframe) {
        iframe.setAttribute("src", src);
        iframe.onload = function () {
            showOverlay(name);
            iframe.onload = null;
        }
    } else {
        console.error("[ ERROR ] Overlay iframe does not exist.");
    }
}

/**
 * Loads the src into the iframe.
 * @param {String} name 
 * @param {String} src 
 */
function loadOverlay (name, src) {
    let iframe = getOverlayIframe(name);
    if (iframe) {
        iframe.setAttribute("src", src);
    } else {
        console.error("[ ERROR ] Overlay iframe does not exist.");
    }
}

/**
 * Clears the overlay by setting a blank src and hiding the overlay.
 */
function closeOverlay (name) {
    setOverlayIframeSrc(name, "");
    hideOverlay(name);
}

/**
 * Clears the overlay by setting a blank src.
 * @param {String} name 
 */
function clearOverlay (name) {
    setOverlayIframeSrc(name, "");
}

/**
 * Remove the overlay from the document completely.
 * TODO: Implement function.
 */
function removeOverlay (name) {
    console.warn("[ WARNING ] Function not implemented.");
}

/**
 * Checks integrity of the entire overlay.
 */
function checkOverlay (name) {
    var valid = true;
    if (!getOverlayBackground(name)) {
        console.error(`[ ERROR ] Overlay ${name} background does not exist.`);
        valid = false;
    }
    if (!getOverlayIframe(name)) {
        console.error(`[ ERROR ] Overlay ${name} iframe does not exist.`);
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