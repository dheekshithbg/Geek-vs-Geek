package io.code.geek_vs_geek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GeekVsGeekApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeekVsGeekApplication.class, args);
	}

}
