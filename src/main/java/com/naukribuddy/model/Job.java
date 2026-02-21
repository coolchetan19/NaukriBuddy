package com.naukribuddy.model;

import com.naukribuddy.enums.JobStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String location;
    private String description;
    private String salary;
    private String jobType; // FULL_TIME, PART_TIME, INTERNSHIP

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private LocalDateTime postedAt;

    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private User recruiter;
}