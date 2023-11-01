var container = document.getElementById('ContentBlock');
// fetchHTML() 이후 동적으로 gist 가 html 에 삽입됨. 삽입된 gist 엘레먼트 저장되는 배열 
let dynamicallyAddedGists = [];
// 클릭 가능한 언어 버튼, 클릭시 해당 언어에 맞는 gist 가 langGistRenderer 에 랜더링될것임 
let langAnchors = []
// 선택된 언어 gist 렌더링 할 블록 엘레먼트 
let langGistRenderer;

/**
 *      <div id="lang-gist-renderer">
                                    <p>lang-gist-renderer</p>
                                </div>
                                <div id="lang-anchor-block">
                                    <a href="">C++</a>
                                    <a href="">JAVA</a>
                                </div>
 */


// tistory 블로그 백업 파일 모두 static/tistory/ 에 들어있음 
// htmlSrc 로는 /static/tistory/{postNumber}/{postName} 의 postName 이 들어옴
// 예: '528-백준-1913.-달팽이.html'
// htmlSrc 해당하는 html 파일 fetch 해서 tistoryPage.html 에 동적으로 랜더링함 
function fetchHTML(htmlSrc) {
    // html file fetch 
    fetch(htmlSrc)
        .then(response => response.text())
        .then(html => {
            // container 에 html 넣음 
            container.innerHTML = html;
            modifyImgElement(container);
            // 이후 동적으로 gist 추가 (gist <script> 내부의 document.write 가 있어서 page load 이후에 실행안됨 )            
            let gists = container.querySelectorAll('script[src^="https://gist.github.com/"]');
            if (gists.length > 0) {
                // gists.length 만큼 반복하는 재귀 함수 
                dynamicallyAddGist(gists, 0);
            }
        })
        .catch(error => console.error('Error:', error));


}

fetchHTML(fetchURL);

// fetchHTML 로 tistoryPage.html 에 htmlSrc 파일 동적으로 랜더링하면 이미지의 경로가 다르게됨
// 본래 htmlSrc 파일에 <img> 포함되어 있다면 해당 파일 상위 폴더에 img 폴더가 있고 그곳에 이미지 보관됨
// 따라서 htmlSrc의 html 파일의 <img src='../img/imgFile'> 이런식이기 때문에 이미지 경로 오류나기 때문에 
// 모든 <img> 엘러먼트 찾아서 src 변경 필요 
// "http://localhost:8080/blog/img/img_5.png" -> "/tistory/1070/img/img.png"
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

// fetchHTML 로 html 가져온후 동적으로 gist <script> 실제 gist 로 대체 
//  (gist <script> 내부의 document.write 가 있어서 page load 이후에 실행안되기 때문 )            
// gists.length 만큼 반복하는 재귀 함수 
function dynamicallyAddGist(gists, index) {
    if (index < gists.length) {
        var gist = gists[index];

        // jsonp 로 gist 를 json 으로 가져옴 
        var scriptSrc = gist.getAttribute('src');
        var gistId = scriptSrc.split('/').pop().split('.')[0];
        var jsonpUrl = `https://gist.github.com/${gistId}.json`;
        // JSONP request
        var script = document.createElement('script');
        script.src = jsonpUrl + '?callback=gistCallback';
        document.head.appendChild(script);

        // 콜백
        window.gistCallback = function (data) {
            var div = document.createElement('div');
            div.innerHTML = data.div;
            console.log('callback')
            dynamicallyAddedGists.push(div.firstChild);

            gist.parentNode.replaceChild(div.firstChild, gist);
            dynamicallyAddGist(gists, index + 1); // 다음 재귀로 
        };
    }
    // 모든 gist html에 넣은 이후에 해야할 연산들 수행 
    else {
        console.log('dynamicallyAdded = ' + dynamicallyAddedGists.length)
        // for(let i = 0; i < dynamicallyAddedGists.length; i++) {
        //     console.log(dynamicallyAddedGists[i]);
        // }
        langGistRenderer = document.getElementById('lang-gist-renderer')
        if(langGistRenderer != null) {
            getLangAnchors();
            addEventListenerToLangAnchors();
        }
    
    }
}

// langAnchors[] 에 언어 스위치용 버튼 <a> element 넣음 
function getLangAnchors() {
    let langAnchorBlock = document.getElementById('lang-anchor-block')
    for (let i = 0; i < langAnchorBlock.childNodes.length; i++) {
        if (langAnchorBlock.childNodes[i].nodeName.toLowerCase() === 'a') {
            langAnchors.push(langAnchorBlock.childNodes[i]);
        }
    }
}

// langAnchors[] 내부 element 들에 eventListener 
function addEventListenerToLangAnchors() {
    langAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default behavior of links (e.g., navigating to a new page)

            console.log('langAnchors.length = ' + langAnchors.length)
            console.log('Link clicked:', anchor.textContent);
            console.log('index = ' + langAnchors.indexOf(anchor))

            // langAnchors[] 에서 anchor 의 인덱스 
            let idx = langAnchors.indexOf(anchor);
            console.log('dynamicallyAddedGists[idx]')
            console.log(dynamicallyAddedGists[idx])

            renderAddedGist(langGistRenderer, dynamicallyAddedGists[idx])
        });
    });
}

function renderAddedGist(langGistRenderer, addedGist) {
    langGistRenderer.appendChild(addedGist);
}


// function dynamicallyAddGist() {
//     // ajax 컨테이너 내부 모든 <script> gist 찾음
//     var ajaxContainer = document.getElementById('ContentBlock');
//     var gists = ajaxContainer.querySelectorAll('script[src^="https://gist.github.com/"]');

//     // gist 존재한다면
//     console.log('gists.length = ' + gists.length)
//     if (gists.length > 0) {
//         // 각 gist 업데이트
//         gists.forEach(function (gist) {
//             console.log('gist1 = ' + gist.src);

//             // jsonp 로 gist 를 json 으로 가져옴
//             var scriptSrc = gist.getAttribute('src');
//             var gistId = scriptSrc.split('/').pop().split('.')[0];
//             var jsonpUrl = `https://gist.github.com/${gistId}.json`;
//             console.log('gistId = ' + gistId)
//             // JSONP request
//             var script = document.createElement('script');
//             script.src = jsonpUrl + '?callback=gistCallback';
//             document.head.appendChild(script);

//             // 콜백
//             window.gistCallback = function (data) {
//                 console.log('gist2 = ' + gist.src);
//                 // script 를 gist 로 대체
//                 var div = document.createElement('div');
//                 div.innerHTML = data.div;
//                 gist.parentNode.replaceChild(div.firstChild, gist);

//                 // style 필요하면 갖고오는데, 여기서는 필요없음
//                 // addStylesheetOnce('https://gist.github.com/' + data.stylesheet);
//             };
//         });
//     }
// }

// function addStylesheetOnce(href) {
//     if (!document.querySelector(`link[href="${href}"]`)) {
//         var link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = href;
//         document.head.appendChild(link);
//     }
// }
