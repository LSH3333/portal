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
        String headerPageName;
        if(pageName.indexOf('-') != -1) {
            headerPageName = pageName.substring(pageName.indexOf('-')+1, pageName.length()-5);
        } else {
            headerPageName = pageName;
        }

        model.addAttribute("headerTextBoxText", headerPageName);
        model.addAttribute("fetchURL", fetchURL);
        return "blog/tistoryPage";
    }

    private static String extractNumber(String url) {
        return url.substring(0, url.indexOf('-'));
    }


    @GetMapping("blogPortal/multiLang")
    public String multiLang(Model model) {
        model.addAttribute("headerTextBoxText", "Multi Language");
        return "blog/multiLang";
    }

    @GetMapping("blogPortal/graph")
    public String graph(Model model) {
        model.addAttribute("headerTextBoxText", "Graph");
        return "blog/graph";
    }

    @GetMapping("blogPortal/tree")
    public String tree(Model model) {
        model.addAttribute("headerTextBoxText", "Tree");
        return "blog/tree";
    }

    @GetMapping("blogPortal/shortestPath")
    public String shortestPath(Model model) {
        model.addAttribute("headerTextBoxText", "ShortestPath Algorithm");
        return "blog/shortestPath";
    }

    @GetMapping("blogPortal/dp")
    public String dp(Model model) {
        model.addAttribute("headerTextBoxText", "Dynamic Programming");
        return "blog/dp";
    }

    @GetMapping("blogPortal/backtracking")
    public String backtracking(Model model) {
        model.addAttribute("headerTextBoxText", "BackTracking");
        return "blog/backtracking";
    }

    @GetMapping("blogPortal/implementation")
    public String implementation(Model model) {
        model.addAttribute("headerTextBoxText", "Implementation");
        return "blog/implementation";
    }

    @GetMapping("blogPortal/bruteforce")
    public String bruteforce(Model model) {
        model.addAttribute("headerTextBoxText", "BruteForce");
        return "blog/bruteforce";
    }

    @GetMapping("blogPortal/binarysearch")
    public String binarySearch(Model model) {
        model.addAttribute("headerTextBoxText", "BinarySearch");
        return "blog/binarysearch";
    }

    @GetMapping("blogPortal/datastructure")
    public String dataStructure(Model model) {
        model.addAttribute("headerTextBoxText", "DataStructure");
        return "blog/datastructure";
    }

    @GetMapping("blogPortal/recursion")
    public String recursion(Model model) {
        model.addAttribute("headerTextBoxText", "Recursion");
        return "blog/recursion";
    }

    @GetMapping("blogPortal/bitmask")
    public String bitmask(Model model) {
        model.addAttribute("headerTextBoxText", "Bitmask");
        return "blog/bitmask";
    }

    @GetMapping("blogPortal/greedy")
    public String greedy(Model model) {
        model.addAttribute("headerTextBoxText", "Greedy");
        return "blog/greedy";
    }

    @GetMapping("blogPortal/prefixSum")
    public String prefixSum(Model model) {
        model.addAttribute("headerTextBoxText", "PrefixSum");
        return "blog/prefixSum";
    }

    @GetMapping("blogPortal/twopointer")
    public String twoPointer(Model model) {
        model.addAttribute("headerTextBoxText", "TwoPointer");
        return "blog/twopointer";
    }

    @GetMapping("blogPortal/string")
    public String string(Model model) {
        model.addAttribute("headerTextBoxText", "String");
        return "blog/string";
    }

    @GetMapping("blogPortal/disjointset")
    public String disjointSet(Model model) {
        model.addAttribute("headerTextBoxText", "Disjoint Set");
        return "blog/disjointset";
    }
}
