/*
 * Controller layer
 * this layer accepts requests from user
 * http://localhost:8080/question/allQuestions - paste this link to browser to see shit (connect to psql question db)
 */
package com.alvin.quizpop;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // waits for a request
/*
 * connect to postgreSQL database "questiondb"
 * once connected, this request mapping line does what the comment says it does
 */

@RequestMapping("question") // map to question table
public class questionController {

    @Autowired
    questionService questionService; // instantiate questionService object

    @GetMapping("allQuestions") // retrieves all questions under the questions table
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    /*
     * PathVariable is used to consider one of the /.../ in the browser as a
     * variable
     * with this, now we can search category/java or category/python
     * ex. http://localhost:8080/question/category/java
     */
    @GetMapping("category/{category}")
    public List<Question> getQuestionByCategory(@PathVariable String category) {
        return questionService.getQuestionByCategory(category);
    }

    @PostMapping("add")
    public String addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);

    }
}