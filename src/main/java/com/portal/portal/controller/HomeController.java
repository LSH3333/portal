package com.portal.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("headerTextBoxText", "LSH's Portal");
        return "index";
    }

    @GetMapping("/portfolio")
    public String portfolio(Model model) {
        model.addAttribute("headerTextBoxText", "PORTFOLIO");
        return "portfolio";
    }

    @GetMapping("/aboutme")
    public String aboutme(Model model) {
        model.addAttribute("headerTextBoxText", "ABOUT ME");
        return "aboutme";
    }

    @GetMapping("/galaga")
    public String galaga(Model model) {
        model.addAttribute("headerTextBoxText", "GALAGA");
        return "galaga";
    }

    @GetMapping("instaweb")
    public String instaweb(Model model) {
        model.addAttribute("headerTextBoxText", "INSTAWEB");
        return "instaweb";
    }

    @GetMapping("manygames")
    public String manygames(Model model) {
        model.addAttribute("headerTextBoxText", "MANYGAMES");
        return "manygames";
    }

    @GetMapping("angrybird")
    public String angrybird(Model model) {
        model.addAttribute("headerTextBoxText", "ANGRYBIRD");
        return "angrybird";
    }

    @GetMapping("flappybird")
    public String flappybird(Model model) {
        model.addAttribute("headerTextBoxText", "FLAPPYBIRD");
        return "flappybird";
    }

    @GetMapping("jumper")
    public String jumper(Model model) {
        model.addAttribute("headerTextBoxText", "JUMPER");
        return "jumper";
    }

    @GetMapping("nightmare")
    public String nightmare(Model model) {
        model.addAttribute("headerTextBoxText", "NIGHTMARE");
        return "nightmare";
    }

    @GetMapping("blog")
    public String blog(Model model) {
        model.addAttribute("headerTextBoxText", "BLOG");
        return "blog/tistory1";
    }
}
