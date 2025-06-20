package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.repository.ProjectRepository;
import com.repository.TicketRepository;
import com.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

	private final ProjectRepository projectRepo;
    private final TicketRepository ticketRepo;
    private final UserRepository userRepo;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("projects", projectRepo.count());
        stats.put("tickets", ticketRepo.count());
        stats.put("users", userRepo.count());
        return ResponseEntity.ok(stats);
    }

}
