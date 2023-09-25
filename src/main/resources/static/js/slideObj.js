
// mainBlock1
let mainBlock1 = document.getElementById('mainBlock1');
let mainBlock1Content = document.getElementById('mainBlock1Content');
let imgBlock1 = document.getElementById('imgBlock1')
let mainBlock1ScrolledIn = false;
// mainBlock2
let mainBlock2 = document.getElementById('mainBlock2');
let mainBlock2Wrap = document.getElementById('mainBlock2Wrap')
let mainBlock2ScrolledIn = false;
// mainBlock3
let mainBlock3 = document.getElementById('mainBlock3');
let mainBlock3ScrolledIn = false;



function activateSlideRight(elem) {
    elem.classList.add('slide-right');
}
function deactivateSlideRight(elem) {
    elem.classList.remove('slide-right');
}

function activateSlideLeft(elem) {
    elem.classList.add('slide-left');
}
function deactivateSlideLeft(elem) {
    elem.classList.remove('slide-left');
}


// Function to check if an element is in the viewport
function isElementInViewport(elem) {
    var rect = elem.getBoundingClientRect();
    // console.log('top = ' + rect.top)
    // console.log('bottom = ' + rect.bottom)
    // console.log('window.innerHeight = ' + window.innerHeight)

    if (rect.bottom <= 0) {
        return false;
    }
    if (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
        return true;
    }
    return false;
}

// Add an event listener for the scroll event
window.addEventListener('scroll', function () {
    // mainBlock1
    if (!mainBlock1ScrolledIn && isElementInViewport(mainBlock1)) {
        mainBlock1ScrolledIn = true;
        activateSlideRight(mainBlock1Content);
        activateSlideLeft(imgBlock1);
    }
    if (mainBlock1ScrolledIn && !isElementInViewport(mainBlock1)) {
        mainBlock1ScrolledIn = false;
        deactivateSlideRight(mainBlock1Content);
        deactivateSlideLeft(imgBlock1);
    }
    // mainBlock2    
    if (!mainBlock2ScrolledIn && isElementInViewport(mainBlock2)) {
        mainBlock2ScrolledIn = true;
        activateSlideLeft(mainBlock2Wrap);
    }
    if (mainBlock2ScrolledIn && !isElementInViewport(mainBlock2)) {
        mainBlock2ScrolledIn = false;
        deactivateSlideLeft(mainBlock2Wrap);
    }
    // mainBlock3
    if (!mainBlock3ScrolledIn && isElementInViewport(mainBlock3)) {
        mainBlock3ScrolledIn = true;
        activateSlideLeft(mainBlock3)
    }
    if (mainBlock3ScrolledIn && !isElementInViewport(mainBlock3)) {
        mainBlock3ScrolledIn = false;
        deactivateSlideLeft(mainBlock3)
    }
});
