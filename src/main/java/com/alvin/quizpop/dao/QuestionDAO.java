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

    // retrieve questions from database for quiz
    @Query(value = "SELECT * FROM question WHERE category =:category ORDER BY RANDOM() LIMIT :numQ", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(String category, int numQ);

    // log entries to see what questions are being fetched in the terminal view
    default List<Question> findRandomQuestionsByCategoryWithLogging(String category, int numQ) {
        System.out.println("Executing query with category: " + category + ", numQ: " + numQ);
        List<Question> questions = findRandomQuestionsByCategory(category, numQ);
        System.out.println("Fetched Questions: " + questions);
        return questions;
    }

}