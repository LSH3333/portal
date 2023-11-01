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
            gist.parentNode.replaceChild(div.firstChild, gist);

            dynamicallyAddGist(gists, index + 1); // 다음 재귀로 
        };
    }
}
