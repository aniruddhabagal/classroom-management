package com.test.leucine.Repositories;

import com.test.leucine.Models.Assignment;
import com.test.leucine.Models.Submission;
import com.test.leucine.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignment(Assignment assignment);
    List<Submission> findByStudent(User student);
}
