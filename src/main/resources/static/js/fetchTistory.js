var container = document.getElementById('ContentBlock');

function fetchHTML(htmlSrc) {
    // html file fetch 
    fetch(htmlSrc)
        .then(response => response.text())
        .then(html => {
            // container 에 html 넣음 
            container.innerHTML = html;
            modifyImgElement(container);
            // 이후 동적으로 gist 추가 (gist <script> 내부의 document.write 가 있어서 page load 이후에 실행안됨 )
            dynamicallyAddGist()
        })
        .catch(error => console.error('Error:', error));
}
fetchHTML(fetchURL);

function modifyImgElement(container) {    
    // fetchURL = "/tistory/1070/1070-쿠키,-세션.html"
    // fetchURL 을 통해 폴더 번호 찾음 
    let secondSlashIndex = fetchURL.indexOf('/', fetchURL.indexOf('/') + 1);    
    let thirdSlashIndex = fetchURL.indexOf('/', secondSlashIndex + 1);    
    let folderNumber = fetchURL.substring(secondSlashIndex + 1, thirdSlashIndex);
    

    let images = container.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        // img.src = "http://localhost:8080/blog/img/img_5.png"
        let lastSlashIndex = img.src.lastIndexOf('/');
        // result = "img_5.png"
        let result = img.src.substring(lastSlashIndex + 1);
        // newSrc = "/tistory/1070/img/img.png"
        let newSrc = '/tistory/' + folderNumber + '/img/' + result;
        img.src = newSrc;
    }


    // img.src = http://localhost:8080/blog/img/img_5.png
    // /tistory/1070/img/img.png
}

function dynamicallyAddGist() {
    // ajax 컨테이너 내부 모든 <script> gist 찾음 
    var ajaxContainer = document.getElementById('ContentBlock');
    var gists = ajaxContainer.querySelectorAll('script[src^="https://gist.github.com/"]');

    // gist 존재한다면 
    if (gists.length > 0) {
        // 각 gist 업데이트 
        gists.forEach(function (gist) {
            // jsonp 로 gist 를 json 으로 가져옴 
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

                // style 필요하면 갖고오는데, 여기서는 필요없음 
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
