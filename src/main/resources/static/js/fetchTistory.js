// Assuming you have a div with id="container" where you want to insert the HTML
var container = document.getElementById('ContentBlock');

function fetchHTML(htmlSrc) {
    // html file fetch 
    fetch(htmlSrc)
        .then(response => response.text())
        .then(html => {
            // container 에 html 넣음 
            container.innerHTML = html;
            // 이후 동적으로 gist 추가 (gist <script> 내부의 document.write 가 있어서 page load 이후에 실행안됨 )
            dynamicallyAddGist()
        })
        .catch(error => console.error('Error:', error));
}
fetchHTML('/tistory/1183-백준-13335.-트럭.html');


function dynamicallyAddGist() {
    // Find all gist scripts inside the ajax container
    var ajaxContainer = document.getElementById('ContentBlock');
    var gists = ajaxContainer.querySelectorAll('script[src^="https://gist.github.com/"]');

    // if gist embeds are found
    if (gists.length > 0) {
        // update each gist
        gists.forEach(function (gist) {
            // load gist as json instead with a jsonp request
            var scriptSrc = gist.getAttribute('src');
            var gistId = scriptSrc.split('/').pop().split('.')[0];
            var jsonpUrl = `https://gist.github.com/${gistId}.json`;

            // JSONP request
            var script = document.createElement('script');
            script.src = jsonpUrl + '?callback=gistCallback';
            document.head.appendChild(script);

            // callback function for JSONP
            window.gistCallback = function (data) {
                // replace script with gist html
                var div = document.createElement('div');
                div.innerHTML = data.div;
                gist.parentNode.replaceChild(div.firstChild, gist);

                // load the stylesheet, but only once…
                // addStylesheetOnce('https://gist.github.com/' + data.stylesheet);
            };
        });
    }
}


// function addStylesheetOnce(href) {
//     if (!document.querySelector(`link[href="${href}"]`)) {
//         var link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = href;
//         document.head.appendChild(link);
//     }
// }
