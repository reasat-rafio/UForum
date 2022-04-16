package com.reasatrafio.uforumserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class
)
public class UForumServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(UForumServerApplication.class, args);
	}

}
