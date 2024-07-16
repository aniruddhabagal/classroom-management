package com.test.leucine.controllers;
import com.test.leucine.Models.Assignment;
import com.test.leucine.Models.Submission;
import com.test.leucine.Models.User;
import com.test.leucine.services.AssignmentService;
import com.test.leucine.services.SubmissionService;
import com.test.leucine.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public Submission submitAssignment(@RequestBody Submission submission) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User student = userService.findByUsername(userDetails.getUsername()).orElse(null);
        submission.setStudent(student);
        return submissionService.saveSubmission(submission);
    }

    @GetMapping("/assignment/{assignmentId}")
    public List<Submission> getSubmissionsByAssignment(@PathVariable Long assignmentId) {
        Assignment assignment = assignmentService.findById(assignmentId).orElse(null);
        return submissionService.findByAssignment(assignment);
    }

    @GetMapping("/student")
    public List<Submission> getSubmissionsByStudent() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User student = userService.findByUsername(userDetails.getUsername()).orElse(null);
        return submissionService.findByStudent(student);
    }
}

