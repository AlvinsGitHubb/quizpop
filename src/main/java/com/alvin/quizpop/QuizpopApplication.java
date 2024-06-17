/*
 * To run this:
 * 1. open up all code
 * 2. Connect to psql database
 * 3. type in http://localhost:8080/question/allQuestions on a browser
 * 4. run code
 * 5. output displayed on the local host
 * /allQuestions = display all questions
 * /category/java or /category/python = display question based on language category
 * /add = add question
 * 	add steps:
 * 		1. go into postman
 * 		2. go to body
 * 		3. go to raw
 * 		4. copy and paste question format into body without id (id is auto generated)
 * 		5. adjust question body
 * 		6. make sure you are on the post setting with the link saying http://localhost:8080/question/add
 * 		7. send (displays success if successful)
 * 
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
