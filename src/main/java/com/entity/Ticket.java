package com.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {


	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;

	    @Column(columnDefinition = "TEXT")
	    private String description;

	    private String status;    // TO_DO, IN_PROGRESS, DONE
	    private String priority;  // LOW, MEDIUM, HIGH

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "project_id")
	    private Project project;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "assignee_id")
	    private User assignee;

	    private LocalDateTime createdAt = LocalDateTime.now();

	    // ✅ Prevent LazyInitializationException in logging
	    @Override
	    public String toString() {
	        return "Ticket{" +
	                "id=" + id +
	                ", title='" + title + '\'' +
	                ", status='" + status + '\'' +
	                ", priority='" + priority + '\'' +
	                ", createdAt=" + createdAt +
	                '}';
	    }
	}