package com.alvin.quizpop;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.alvin.quizpop.dao.QuestionDAO;

@Service
public class questionService {
    @Autowired

    QuestionDAO questionDao;

    public List<Question> getAllQuestions() {
        return questionDao.findAll();
    }

    public List<Question> getQuestionByCategory(String category) {
        return questionDao.findByCategory(category);
    }

    public String addQuestion(@RequestBody Question question) {
        questionDao.save(question);
        return "success";
    }

}
