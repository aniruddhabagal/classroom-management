package com.test.leucine.controllers;

import com.test.leucine.Models.Assignment;
import com.test.leucine.Models.User;
import com.test.leucine.services.AssignmentService;
import com.test.leucine.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
        assignment.setCreatedBy(user);
        return assignmentService.saveAssignment(assignment);
    }

    @GetMapping("/teacher")
    public List<Assignment> getAssignmentsByTeacher() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
        return assignmentService.findByCreatedBy(user);
    }

    @GetMapping("/class/{className}")
    public List<Assignment> getAssignmentsByClass(@PathVariable String className) {
        return assignmentService.findByClassName(className);
    }
}
