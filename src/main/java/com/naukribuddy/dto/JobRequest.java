package com.naukribuddy.dto;

import lombok.Data;

@Data
public class JobRequest {
    private String title;
    private String company;
    private String location;
    private String description;
    private String salary;
    private String jobType;
}