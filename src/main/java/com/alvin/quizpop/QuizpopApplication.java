/*
 * To run this:
 * 1. open up all code
 * 2. Connect to psql database
 * 3. type in http://localhost:8080/question/allQuestions on a browser
 * 4. run code
 * 5. output displayed on the local host
 */
package com.alvin.quizpop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizpopApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizpopApplication.class, args);
	}

}
