package com.reasatrafio.uforumserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class UForumServerApplication {

	public static void main(String[] args) {

    // // Set Cloudinary instance
    //     Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
    //             "cloud_name", "xxx", // insert here you cloud name
    //             "api_key", "xxx", // insert here your api code
    //             "api_secret", "xxx")); // insert here your api secret

		SpringApplication.run(UForumServerApplication.class, args);
	}

}
