package com.uau.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration.class)
public class UAUApplication {

    public static void main(String[] args) {
        SpringApplication.run(UAUApplication.class, args);
    }

}
