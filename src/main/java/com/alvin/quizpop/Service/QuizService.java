package com.alvin.quizpop.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alvin.quizpop.dao.QuizDao;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;
}
