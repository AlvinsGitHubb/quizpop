package com.alvin.quizpop.Service;

import java.util.ArrayList;
import java.util.List;

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

}
