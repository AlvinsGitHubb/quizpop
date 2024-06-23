package com.alvin.quizpop.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alvin.quizpop.QuestionWrapper;
import com.alvin.quizpop.Response;
import com.alvin.quizpop.Service.QuizService;

@RestController
@RequestMapping("quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    /*
     * ex: http://localhost:8080/quiz/create?category=Java&numQ=5&title=JQuiz
     * creates a quiz under category - java, 5 questions, and title of JQuiz
     * can be found in pgadmin
     */
    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestParam String category, @RequestParam int numQ,
            @RequestParam String title) {
        return quizService.createQuiz(category, numQ, title);
    }

    // ex: http://localhost:8080/quiz/get/32
    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id) {
        return quizService.getQuizQuestions(id);
    }

    /*
     * go into postman body (raw, JSON format)
     * [
     * {
     * "id":18
     * "response":3
     * }
     * {
     * "id":2
     * "response":4
     * }
     * {
     * "id":5
     * "response":1
     * }
     * {
     * "id":6
     * "response":2
     * }
     * ]
     * so put in some body like this into post man and have the link be
     * /quiz/submit/32 or something and
     * it will print a number representing your score
     */
    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id, @RequestBody List<Response> responses) {
        return quizService.calculateResult(id, responses);
    }

}
