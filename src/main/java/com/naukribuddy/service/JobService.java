package com.naukribuddy.service;

import com.naukribuddy.dto.JobRequest;
import com.naukribuddy.enums.JobStatus;
import com.naukribuddy.model.Job;
import com.naukribuddy.model.User;
import com.naukribuddy.repository.JobRepository;
import com.naukribuddy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public Job createJob(JobRequest request, String recruiterEmail) {
        User recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new RuntimeException("Recruiter not found!"));

        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .description(request.getDescription())
                .salary(request.getSalary())
                .jobType(request.getJobType())
                .status(JobStatus.ACTIVE)
                .postedAt(LocalDateTime.now())
                .recruiter(recruiter)
                .build();

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found!"));
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}