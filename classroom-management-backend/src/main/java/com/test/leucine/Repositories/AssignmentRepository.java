package com.test.leucine.Repositories;

import com.test.leucine.Models.Assignment;
import com.test.leucine.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCreatedBy(User teacher);
    List<Assignment> findByClassName(String className);
}
