package com.dto;

import lombok.Data;

@Data
public class TicketDTO {
	private Long id;
	private String title;
	private String description;
	private String priority;
	private String status;
	private Long projectId;
	private Long assigneeId;

}
