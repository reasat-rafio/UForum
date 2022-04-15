package com.example.server;

import com.example.server.user.Gender;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDateTime;

@SpringBootApplication
public class ServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(UserRepository repository, MongoTemplate mongoTemplate) {

		return args -> {
//			String email = "raf@gmail.com";
//
//			User user = new User(
//					email,"rafio", "123122",
//					Gender.MALE,  LocalDateTime.now(),
//					false);
//
//			repository.findUserByEmail(email).ifPresentOrElse(s -> {
//				System.out.println("Already exist");
//			}, () -> {
//				repository.insert(user);
//			});
		};
	}
}
