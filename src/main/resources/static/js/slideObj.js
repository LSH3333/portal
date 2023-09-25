
let mainBlock1Content = document.getElementById('mainBlock1Content');
let imgBlock1 = document.getElementById('imgBlock1')
let mainBlock1ScrolledIn = false;




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
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add an event listener for the scroll event
window.addEventListener('scroll', function () {
    if (!mainBlock1ScrolledIn && isElementInViewport(document.getElementById('mainBlock1'))) {
        mainBlock1ScrolledIn = true;
        activateSlideRight(mainBlock1Content);
        activateSlideLeft(imgBlock1);
    }
    if (mainBlock1ScrolledIn && !isElementInViewport(document.getElementById('mainBlock1'))) {
        mainBlock1ScrolledIn = false;
        deactivateSlideRight(mainBlock1Content);
        deactivateSlideLeft(imgBlock1);
    }


});
