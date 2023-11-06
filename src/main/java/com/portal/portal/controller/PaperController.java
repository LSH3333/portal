package com.portal.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class PaperController {

    @GetMapping("paper")
    public String paper(Model model) {
        model.addAttribute("headerTextBoxText", "PAPER");
        return "paper";
    }


}
