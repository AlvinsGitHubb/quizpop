package com.alvin.quizpop.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alvin.quizpop.Question;
import com.alvin.quizpop.dao.QuestionDAO;

@Service
public class questionService {

    @Autowired
    QuestionDAO questionDao;

    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            return new ResponseEntity<>(questionDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);// if something goes wrong print empty
                                                                               // arrayList
    }

    public ResponseEntity<List<Question>> getQuestionByCategory(String category) {
        try {
            return new ResponseEntity<>(questionDao.findByCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);// if something goes wrong print empty
                                                                               // arrayList
    }

    public ResponseEntity<String> addQuestion(Question question) {
        try {
            questionDao.save(question);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("success", HttpStatus.CREATED); // status 201

    }

    public Optional<Question> getQuestionById(Integer id) {
        return questionDao.findById(id);
    }

    public Question updateQuestion(Integer id, Question questionDetails) {
        Optional<Question> questionOptional = questionDao.findById(id);
        if (!questionOptional.isPresent()) {
            return null; // or throw an exception
        }

        Question question = questionOptional.get();
        question.setQuestionTitle(questionDetails.getQuestionTitle());
        question.setOption1(questionDetails.getOption1());
        question.setOption2(questionDetails.getOption2());
        question.setOption3(questionDetails.getOption3());
        question.setOption4(questionDetails.getOption4());
        question.setRightAnswer(questionDetails.getRightAnswer());

        return questionDao.save(question);
    }

    public boolean deleteQuestion(Integer id) {
        if (!questionDao.existsById(id)) {
            return false;
        }

        questionDao.deleteById(id);
        return true;
    }

}
