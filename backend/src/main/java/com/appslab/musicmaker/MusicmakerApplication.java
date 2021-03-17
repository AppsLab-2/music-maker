package com.appslab.musicmaker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class MusicmakerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicmakerApplication.class, args);
	}
}
