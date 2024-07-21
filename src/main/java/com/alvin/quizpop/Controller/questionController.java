/*
 * Controller layer
 * this layer accepts requests from user
 * http://localhost:8080/question/allQuestions - paste this link to browser to see all questions (connect to psql question db)
 */
package com.alvin.quizpop.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alvin.quizpop.Question;
import com.alvin.quizpop.Service.questionService;

@RestController // waits for a request
/*
 * connect to postgreSQL database "questiondb"
 * once connected, this request mapping line does what the comment says it does
 */

@RequestMapping("question") // map to question table
@CrossOrigin(origins = "http://localhost:3000")
public class questionController {

    @Autowired
    questionService questionService; // instantiate questionService object

    // the point of a response entity is to see the status of the request we make
    // from postman
    // ex. status 200 - good, status 100- bad, status 300- not good,status 500 -
    // means code is bad
    @GetMapping("allQuestions") // retrieves all questions under the questions table
    public ResponseEntity<List<Question>> getAllQuestions() {

        return questionService.getAllQuestions();
    }

    /*
     * PathVariable is used to consider one of the /.../ in the browser as a
     * variable
     * with this, now we can search category/java or category/python
     * ex. http://localhost:8080/question/category/java
     */
    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionByCategory(@PathVariable String category) {
        return questionService.getQuestionByCategory(category);
    }

    /*
     * add question (id will be auto generated)
     * ex. http://localhost:8080/question/add
     * use POST and enter info in body and raw format in postman
     * {
     * "questionTitle": "Max value byte for java?",
     * "option1": "100",
     * "option2": "127",
     * "option3": "48",
     * "option4": "999",
     * "rightAnswer": "127",
     * "difficultyLevel": "Easy",
     * "category": "java"
     * }
     * 
     */
    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);

    }

    /*
     * Updating questions
     * ex. http://localhost:8080/question/1 (this gets question id 1)
     * need to be in postman and put this in body while being in put mode:
     * {
     * "questionTitle": "What is a class in Java?",
     * "option1": "A func", //the changed part
     * "option2": "An object",
     * "option3": "A data structure",
     * "option4": "A loop",
     * "rightAnswer": "An object"
     * }
     */
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Integer id, @RequestBody Question questionDetails) {
        Question updatedQuestion = questionService.updateQuestion(id, questionDetails);
        if (updatedQuestion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedQuestion);

    }

    // Delete a question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id) {
        boolean isDeleted = questionService.deleteQuestion(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

}
