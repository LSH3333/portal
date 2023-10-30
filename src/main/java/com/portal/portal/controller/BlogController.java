package com.portal.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class BlogController {

    @GetMapping("blogPortal")
    public String blogPortal(Model model) {
        model.addAttribute("headerTextBoxText", "Algorithm");
        return "blog/blogPortal";
    }

    /**
     *  <a href="/templates/instaweb.html" th:href="@{/blog/1183-백준-13335.-트럭.html}">1183-백준-13335.-트럭.html</a>
     *  이런식의 <a> 링크 타면, @PathVariable String pageName = "1183-백준-13335.-트럭.html"
     *  pageName 을 tistoryPage.html 에 전달하면 fetchTistory.js 에서 정적으로 저장된 pageName 에 해당하는 html 가져와서 랜더링함
     */
    @GetMapping("blog/{pageName}")
    public String blogPage(Model model, @PathVariable String pageName) {
        // fetchTistory.js fetchHTML() 에서 fetch 할 html 경로
        String fetchURL = "/tistory/"+extractNumber(pageName)+"/"+pageName;
        // header 이름 렌더링
        String headerPageName = pageName.substring(0, pageName.length()-5);

        model.addAttribute("headerTextBoxText", headerPageName);
        model.addAttribute("fetchURL", fetchURL);
        return "blog/tistoryPage";
    }

    private static String extractNumber(String url) {
        return url.substring(0, url.indexOf('-'));
    }

    @GetMapping("blogPortal/graph")
    public String graph(Model model) {
        model.addAttribute("headerTextBoxText", "Graph");
        return "blog/graph";
    }
}
