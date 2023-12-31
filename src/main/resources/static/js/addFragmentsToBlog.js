

let header = document.createElement('header');

header.innerHTML = <header th:fragment="header">
<nav>
    <div id="navMain">
        <a id="logo" href="/templates/index.html" th:href="@{/}">LSH</a>
        <div id="navLinks">
            <ul>
                <li class="menu"><a href="/templates/index.html" th:href="@{/}">HOME</a>
                </li>
                <li class="menu"><a href="/templates/portfolio.html" th:href="@{/portfolio}">PORTFOLIO</a>
                    <div class="navSub">
                        <ul>
                            <li><a href="/templates/instaweb.html" th:href="@{/instaweb}">InstaWeb</a></li>
                        </ul>
                        <ul>
                            <li><a href="/templates/galaga.html" th:href="@{/galaga}">Galaga</a></li>
                        </ul>
                        <ul>
                            <li><a href="/templates/manygames.html" th:href="@{/manygames}">ManyGames</a></li>
                            <li><a href="/templates/angrybird.html" th:href="@{/angrybird}">AngryBird</a></li>
                            <li><a href="/templates/flappybird.html" th:href="@{/flappybird}">FlappyBird</a></li>
                            <li><a href="/templates/jumper.html" th:href="@{/jumper}">Jumper</a></li>
                            <li><a href="/templates/nightmare.html" th:href="@{/nightmare}">Nightmare</a></li>
                            <li><a href="/templates/tistory1.html" th:href="@{/blog}">BLOG</a></li>
                        </ul>
                    </div>
                </li>
                <li class="menu"><a href="/templates/aboutme.html" th:href="@{/aboutme}">ABOUT ME</a>
                    <div class="navSub">
                        <ul>
                            <li><a href="https://tose33.tistory.com/" target="_blank">Blog</a></li>
                        </ul>
                        <ul>
                            <li><a href="https://github.com/LSH3333" target="_blank">Git</a></li>
                        </ul>
                        <ul>
                            <li><a href="https://www.acmicpc.net/user/chadol51" target="_blank">PS</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div id="header-text-box">
    <h1 th:text="${headerTextBoxText}">LSH's Portal</h1>
</div>
</header>;




document.body.appendChild(header);