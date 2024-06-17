package com.alvin.quizpop.dao;

import java.util.List;

//fetching data is handled by Jpa Repository
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alvin.quizpop.Question;

@Repository
// <Classname, Parameter Key type>
public interface QuestionDAO extends JpaRepository<Question, Integer> {
    List<Question> findByCategory(String category);
}