package com.alvin.quizpop.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alvin.quizpop.Question;
import com.alvin.quizpop.QuestionWrapper;
import com.alvin.quizpop.Quiz;
import com.alvin.quizpop.Response;
import com.alvin.quizpop.dao.QuestionDAO;
import com.alvin.quizpop.dao.QuizDao;

import lombok.Data;

@Service
@Data
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDAO questionDao;

    private static final Logger logger = LoggerFactory.getLogger(QuizService.class);

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        // where questions from db is stored
        // List<Question> questions =
        // questionDao.findRandomQuestionsByCategory(category, numQ);
        List<Question> questions = questionDao.findRandomQuestionsByCategoryWithLogging(category, numQ);

        // Log the fetched questions
        logger.info("Fetched Questions: {}", questions);

        Quiz quiz = new Quiz(); // quiz creation
        quiz.setTitle(title);
        quiz.setQuestions(questions);

        // Log the quiz object before saving
        logger.info("Quiz before saving: {}", quiz);

        quizDao.save(quiz);

        return new ResponseEntity<>("Success", HttpStatus.CREATED);

    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> quiz = quizDao.findById(id); // optional is used because the data may or may not come
        List<Question> questionsFromDB = quiz.get().getQuestions();
        List<QuestionWrapper> questionsForUser = new ArrayList<>(); // fill questionForUser with database information
        for (Question q : questionsFromDB) {
            QuestionWrapper qw = new QuestionWrapper(q.getId(), q.getQuestionTitle(), q.getOption1(), q.getOption2(),
                    q.getOption3(), q.getOption4());
            questionsForUser.add(qw);
        }

        return new ResponseEntity<>(questionsForUser, HttpStatus.OK);

    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        Quiz quiz = quizDao.findById(id).get();
        List<Question> questions = quiz.getQuestions();
        int right = 0;
        int i = 0;
        for (Response response : responses) {
            if (response.getResponse().equals(questions.get(i).getRightAnswer()))
                right++;

            i++;
        }
        return new ResponseEntity<>(right, HttpStatus.OK);
    }
}
