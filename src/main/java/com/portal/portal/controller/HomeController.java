package com.portal.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/portfolio")
    public String portfolio() {
        return "portfolio";
    }

    @GetMapping("/aboutme")
    public String aboutme() {
        return "aboutme";
    }

    @GetMapping("/galaga")
    public String galaga() {
        return "galaga";
    }

    @GetMapping("instaweb")
    public String instaweb() {
        return "instaweb";
    }

    @GetMapping("manygames")
    public String manygames() {
        return "manygames";
    }

}
