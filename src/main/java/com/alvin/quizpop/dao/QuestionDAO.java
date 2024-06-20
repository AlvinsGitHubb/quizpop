package com.alvin.quizpop.dao;

import java.util.List;

//fetching data is handled by Jpa Repository
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alvin.quizpop.Question;

@Repository
public interface QuestionDAO extends JpaRepository<Question, Integer> {// <Classname, Parameter Key type>
    List<Question> findByCategory(String category);

    @Query(value = "SELECT * FROM question q Where q.category=:category ORDER BY RANDOM() LIMIT :numQ", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(String category, int numQ);
}