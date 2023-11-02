var container = document.getElementById('ContentBlock');
// fetchHTML() 이후 동적으로 gist 가 html 에 삽입됨. 삽입된 gist 엘레먼트 저장되는 배열 
let dynamicallyAddedGists = [];
// 클릭 가능한 언어 버튼, 클릭시 해당 언어에 맞는 gist 가 langGistRenderer 에 랜더링될것임 
let langAnchors = []
// 선택된 언어 gist 렌더링 할 블록 엘레먼트 
let langGistRenderer;

// 여러 언어 gist 보여줄 tistory html 에 아래 추가하면됨 
/** 
<div id="lang-anchor-block">
    <a href="">C++</a>
    <a href="">JAVA</a>
    <a href="">Python</a>
    <a href="">Kotlin</a>
    <a href="">C#</a>
    <a href="">Javascript</a>
</div>
<div id="lang-gist-renderer">
</div>
*/

// tistory 블로그 백업 파일 모두 static/tistory/ 에 들어있음 
// htmlSrc 로는 /static/tistory/{postNumber}/{postName} 의 postName 이 들어옴
// htmlSrc 예: '528-백준-1913.-달팽이.html'
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
                dynamicallyAddAllGists();
            }
        })
        .catch(error => console.error('Error:', error));
}

fetchHTML(fetchURL);

// fetchHTML() 로 tistoryPage.html 에 htmlSrc 파일 동적으로 랜더링하면 이미지의 경로가 다르게됨
// 본래 htmlSrc 파일에 <img> 포함되어 있다면 해당 파일 상위 폴더에 img 폴더가 있고 그곳에 이미지 보관됨
// 따라서 htmlSrc의 html 파일의 <img src='../img/imgFile'> 이런식이기 때문에 이미지 경로 오류
// 모든 <img> 엘러먼트 찾아서 아래와 같이 src 변경 필요 
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




// fetchHTML 로 html 가져온후 동적으로 gist <script> 실행
//  (gist <script> 내부의 document.write 가 있어서 page load 이후에 실행안되기 때문 )            
async function dynamicallyAddAllGists() {
    let gists = container.querySelectorAll('script[src^="https://gist.github.com/"]');
    for (let i = 0; i < gists.length; i++) {        
        await dynamicallyAddGist(gists, i); // gist <script> 순차적으로 실행, 삽입 
    }

    // 모든 gist <script> 실행 후, <div id='lang-gist-renderer'> 에 렌더링 등 필요한 연산 실행
    langGistRenderer = document.getElementById('lang-gist-renderer')
    console.log(langGistRenderer)
    // 여러 언어 gist 존재하는 경우에만 
    if (langGistRenderer != null) {
        // 최초에 gist 들 모두 안보이도록 처리하고 언어버튼 클릭시 해당 언어 gist 만 보이도록 처리            
        // 첫 하나만 보이도록함 
        renderAddedGist(langGistRenderer, dynamicallyAddedGists[0]);
        getLangAnchors();
        addEventListenerToLangAnchors();
    } 
    // 한개의 언어 gist 존재하는 경우 모든 gist visible 처리 
    else {
        dynamicallyAddedGists.forEach((gist) => {
            setGistVisible(gist);
        })
    }
}

// JSONP 를 이용해 gist <script> 실행하고 결과 data fetch 된 html 에 삽입 
function dynamicallyAddGist(gists, index) {
    return new Promise((resolve, reject) => {
        var gist = gists[index];

        // jsonp 로 gist 를 json 으로 가져옴 
        var scriptSrc = gist.getAttribute('src');
        var gistId = scriptSrc.split('/').pop().split('.')[0];
        var jsonpUrl = `https://gist.github.com/${gistId}.json`;
        // JSONP(JSON with Padding, 다른 도메인으로부터 데이터 갖고오기위함) request
        // <script> 으로 다른 도메인 요청은 가능하기 때문에 src 에 주소 넣고 실행 
        var script = document.createElement('script');
        script.src = jsonpUrl + '?callback=gistCallback';
        document.head.appendChild(script);

        // callback=gistCallback
        window.gistCallback = function (data) {
            var div = document.createElement('div');
            div.innerHTML = data.div;
            dynamicallyAddedGists.push(div.firstChild);
            // 추가된 gist 최초에 안보이도록 처리 
            setGistNoneVisible(div.firstChild);
            gist.parentNode.replaceChild(div.firstChild, gist);
            resolve();
        };
    })
}




// gist.style.display 수정해서 gist element 보이도록하거나 보이지 않도록함 
function setGistNoneVisible(gist) {
    gist.style.display = 'none';
}
function setGistVisible(gist) {
    gist.style.display = 'block';
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
            event.preventDefault();

            // langAnchors[] 에서 anchor 의 인덱스 
            let idx = langAnchors.indexOf(anchor);

            renderAddedGist(langGistRenderer, dynamicallyAddedGists[idx])
        });
    });
}

function renderAddedGist(langGistRenderer, addedGist) {
    // gist 랜더링되는 <div id='langGistRenderer'> 내부 비우고 
    langGistRenderer.childNodes.forEach(gist => {
        // setGistNoneVisible(gist);
        gist.remove();
    });
    // 새로 선택한 언어 gist 랜더링 
    langGistRenderer.appendChild(addedGist);
    setGistVisible(addedGist);
}


