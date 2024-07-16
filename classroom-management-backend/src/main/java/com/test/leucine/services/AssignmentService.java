package com.test.leucine.services;
import com.test.leucine.Models.Assignment;
import com.test.leucine.Models.User;
import com.test.leucine.Repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment saveAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> findByCreatedBy(User teacher) {
        return assignmentRepository.findByCreatedBy(teacher);
    }

    public List<Assignment> findByClassName(String className) {
        return assignmentRepository.findByClassName(className);
    }

    public Optional<Assignment> findById(Long id) {
        return assignmentRepository.findById(id);
    }

}
