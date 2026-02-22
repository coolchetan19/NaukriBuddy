package com.naukribuddy.controller;

import com.naukribuddy.enums.ApplicationStatus;
import com.naukribuddy.model.Application;
import com.naukribuddy.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<Application> applyForJob(@PathVariable Long jobId, Principal principal) {
        return ResponseEntity.ok(applicationService.applyForJob(jobId, principal.getName()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Application>> getMyApplications(Principal principal) {
        return ResponseEntity.ok(applicationService.getMyApplications(principal.getName()));
    }

    @PutMapping("/status/{applicationId}")
    public ResponseEntity<Application> updateStatus(@PathVariable Long applicationId,
                                                    @RequestParam ApplicationStatus status) {
        return ResponseEntity.ok(applicationService.updateStatus(applicationId, status));
    }
}