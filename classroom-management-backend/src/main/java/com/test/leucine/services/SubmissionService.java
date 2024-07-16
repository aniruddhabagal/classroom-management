package com.test.leucine.services;

import com.test.leucine.Models.Assignment;
import com.test.leucine.Models.Submission;
import com.test.leucine.Models.User;
import com.test.leucine.Repositories.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {
    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission saveSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    public List<Submission> findByAssignment(Assignment assignment) {
        return submissionRepository.findByAssignment(assignment);
    }

    public List<Submission> findByStudent(User student) {
        return submissionRepository.findByStudent(student);
    }
}
