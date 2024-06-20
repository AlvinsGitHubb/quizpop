/*
 * Controller layer
 * this layer accepts requests from user
 * http://localhost:8080/question/allQuestions - paste this link to browser to see shit (connect to psql question db)
 */
package com.alvin.quizpop.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
public class questionController {

    @Autowired
    questionService questionService; // instantiate questionService object

    /*
     * Old allQuestions
     * 
     * @GetMapping("allQuestions") // retrieves all questions under the questions
     * table
     * public List<Question> getAllQuestions() {
     * return new ResponseEntity<>(questionService.getAllQuestions(),HttpStatus.OK);
     * }
     */

    // new one uses response entity instead of list
    // the point of a response entity is to see the status of the request we make
    // from postman
    // ex. status 200 - good, status 100- bad, status 300- idek
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

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);

    }
}
