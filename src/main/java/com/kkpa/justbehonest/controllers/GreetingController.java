package com.kkpa.justbehonest.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/say")
public class GreetingController {

	
	@GetMapping("/hello")
	public String hello() {
		return "Hello!! ";
	}
	
}
